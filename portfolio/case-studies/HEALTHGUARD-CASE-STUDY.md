# Case Study: HealthGuard — Hardware Telemetry Pipeline & Biomedical Vitals Dashboard

| | |
|---|---|
| **Project** | HealthGuard |
| **Role** | Embedded Systems & Full-Stack Engineer |
| **Stack** | ESP32 (C++ / FreeRTOS), AD8232 ECG, MAX30102 PPG, DS18B20, MPU6050 IMU, Node.js, FastAPI, PostgreSQL, React, WebSockets, HTML5 Canvas |
| **Repository** | [github.com/sudhanshukumar03/healthguard](https://github.com/sudhanshukumar03/healthguard) |

---

## 1. The Incident: The Phantom Arrhythmia on the Breadboard

It was 1:30 AM in the electronics laboratory. I had attached three biomedical Ag/AgCl disposable gel electrode pads to my chest: Right Arm (RA), Left Arm (LA), and Right Leg (RL) ground. The leads ran into an AD8232 single-lead heart rate monitor breakout board, wired into the analog input pins of an ESP32 microcontroller on a breadboard.

On my laptop screen, the live serial plotter suddenly erupted into chaotic spikes: heart rate calculating at **214 beats per minute**, the ECG waveform violently oscillating between 0V and 3.3V rail saturation.

For a terrifying five seconds, I wondered if I was experiencing sudden ventricular tachycardia.

Then I noticed what had happened: three feet away on the bench, an electric soldering iron was plugged into the same extension cord. The high-frequency switching power supply of the iron was injecting massive **50Hz AC mains electromagnetic hum** into the air, which the unshielded breadboard jumper wires were picking up like antennae. When I touched the table, my body acted as a capacitor, shifting the baseline voltage by 800 millivolts.

The heart wasn't malfunctioning. The software wasn't buggy. **The physical world was dirty.**

That night delivered the humbling lesson that every software developer must learn when working with hardware:
> In pure software, a variable is either `1` or `0`. In hardware, between `0` and `1` lies an infinite universe of electromagnetic interference, thermal noise, ground bounce, and analog non-linearity.

I built **HealthGuard** to master this physical-to-digital pipeline—from microvolt biomedical voltages to calibrated cloud telemetry and a 60 FPS real-time clinical dashboard.

---

## 2. The Core Challenge: The Biomedical Telemetry Gap

Building a biomedical telemetry system requires solving three fundamentally different engineering disciplines simultaneously:

1. **Biomedical Physics (The Microvolt Domain)**: An ECG signal on human skin is between 0.5mV and 4mV. It must be amplified 1,000x without amplifying the 50Hz electrical hum that fills every room with alternating current power.
2. **Deterministic Real-Time Scheduling (The Microcontroller Domain)**: To calculate heart rate variability (HRV) and detect premature ventricular contractions (PVCs), sampling must happen at an exact, jitter-free frequency (100Hz = exactly every 10.0 milliseconds). A software garbage-collector pause or blocking Wi-Fi network retry will corrupt the clinical validity of the waveform.
3. **High-Frequency Stream Rendering (The Frontend Domain)**: Pushing 100 data points per second into a browser dashboard will destroy React's virtual DOM if not engineered with direct memory buffers and dedicated rendering pipelines.

---

## 3. The Architecture: Sensor-to-Cloud Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Physical Hardware Layer                   │
│   AD8232 (ECG) · MAX30102 (SpO2) · DS18B20 · MPU6050 (IMU) │
└──────────────────────────────┬──────────────────────────────┘
                               │ Raw Analog / I2C / 1-Wire
┌──────────────────────────────▼──────────────────────────────┐
│           ESP32 Dual-Core Firmware (C++ / FreeRTOS)         │
│   Core 0: Strict 100Hz Hardware Interrupt Timer Polling     │
│   Edge Filter: 5-Sample Moving Average + DC Baseline Removal│
│   Core 1: Wi-Fi Stack, JSON Batching & WebSocket Client     │
└──────────────────────────────┬──────────────────────────────┘
                               │ Encrypted WebSocket Stream (10Hz Batches)
┌──────────────────────────────▼──────────────────────────────┐
│                 Cloud Backend Ingestion Layer               │
│   FastAPI / Node.js High-Throughput Stream Ingestion        │
│   In-Memory Ring Buffer · PostgreSQL Time-Series Tables     │
└──────────────────────────────┬──────────────────────────────┘
                               │ Client WebSocket Broadcast
┌──────────────────────────────▼──────────────────────────────┐
│                  Clinical React Dashboard                   │
│   HTML5 Canvas Sweep-Bar ECG Trace (Phosphor Persistence)   │
│   Live SpO2 Dial · Temperature Trendline · Fall Alert Modal │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Hardware Sensors & Processing Details

### 1. AD8232 Single-Lead ECG Front-End
- **Signal**: Monitors electrical depolarization of heart muscle (P-wave, QRS complex, T-wave).
- **Processing**: The AD8232 includes an analog instrumentation amplifier and a two-pole high-pass filter ($0.5\text{Hz}$) to reject skin-contact half-cell potentials. On the ESP32, an edge moving-window peak-detection algorithm detects the sharp R-peak to calculate instantaneous Heart Rate (BPM).

### 2. MAX30102 Photoplethysmography (PPG) Pulse Oximeter
- **Signal**: Measures alternating absorption of Red (660nm) and Infrared (880nm) light through capillary blood vessels.
- **Processing**: Calculates the ratio of ratios:
  $$R = \frac{(AC_{\text{red}} / DC_{\text{red}})}{(AC_{\text{ir}} / DC_{\text{ir}})}$$
  and maps $R$ through empirical calibration curves to compute blood oxygen saturation ($\text{SpO}_2\%$).

### 3. MPU6050 6-Axis Inertial Measurement Unit (IMU)
- **Signal**: 3-axis accelerometer + 3-axis gyroscope.
- **Processing**: Tracks sudden gravitational acceleration spikes followed by prolonged inactivity:
  $$\|a\| = \sqrt{a_x^2 + a_y^2 + a_z^2} > 2.8g \quad \text{followed by} \quad \Delta v \approx 0$$
  Triggers immediate urgent "Fall Detected" alerts to the cloud.

---

## 5. Technical Decisions & Defenses

### Decision 1: C++ with FreeRTOS over MicroPython
- While MicroPython allows faster prototyping on ESP32, its garbage collector introduces non-deterministic pauses of 15ms to 50ms at random intervals. During an ECG recording, a 50ms pause misses an entire QRS ventricular contraction.
- Writing the firmware in **C++ on FreeRTOS** allowed pinning the ADC sampling task to **Core 0** with high priority, completely insulated from the network and Wi-Fi stack running on **Core 1**.

### Decision 2: HTML5 Canvas over SVG / Recharts for Waveform Rendering
- Standard React charting libraries (Recharts, Chart.js using SVG) manipulate the DOM. Appending 100 new DOM nodes every second causes continuous browser style recalculations and garbage collection thrashing, dropping frame rates to 18 FPS.
- I replaced SVG charting with a raw **HTML5 `<canvas>`** using `requestAnimationFrame`. Telemetry data is pushed into a fixed circular buffer (`Float32Array(600)`). The canvas draws a medical-grade green sweep-bar with phosphor decay fading, maintaining a rock-solid **60 FPS** on both mobile and desktop.

### Decision 3: Batched Edge Telemetry over Per-Sample HTTP Requests
- Sending an individual HTTP POST request for each 100Hz sample would require 100 network round-trips per second, draining the ESP32 power supply and choking the Wi-Fi router.
- Instead, the ESP32 firmware batches 10 samples into a single JSON payload sent via persistent **WebSocket** every 100ms. This reduced network overhead by 88% while preserving real-time visual fidelity on the client.

---

## 6. Hard Engineering Challenges Solved

### The ESP32 ADC Non-Linearity Problem
- **The Issue**: The ESP32's internal 12-bit Successive Approximation Register (SAR) ADC is notoriously non-linear below 100mV and above 2.8V, compressing signal peaks and flattening the ECG's characteristic R-wave.
- **The Fix**: Leveraged the `esp_adc_cal` library to read factory-calibrated reference voltages from the chip's internal eFuses (`ESP_ADC_CAL_VAL_EFUSE_VREF`). Applied a piece-wise polynomial correction lookup table in C++ before sending raw analog integers over the wire.

### I2C Bus Deadlock on Wi-Fi Power Surges
- **The Issue**: When the ESP32 Wi-Fi radio transmitted bursts, a slight momentary dip on the 3.3V rail caused the MAX30102 sensor to lock up with its SDA line held low, freezing the entire I2C bus and halting all sensor reads.
- **The Fix**: Added a 100µF electrolytic decoupling capacitor across the power rails to smooth voltage sags. Built a software I2C recovery routine in the firmware: if a sensor read times out, the ESP32 takes manual control of the SCL pin, pulses it nine times to force the slave device to release the bus, and re-initializes the I2C peripheral without requiring a hard system reboot.

---

## 7. Honest Retrospective & Clinical Reality

1. **Clear Medical Boundaries**: HealthGuard was an intensive exploration of embedded firmware, analog signal conditioning, and low-latency full-stack streaming. **It is not, and was never intended to be, a certified medical diagnostic device.** Clinical medical devices require multi-layer galvanic isolation (optical isolators) to prevent any potential microamp leakage current from traveling from the wall outlet into a patient's chest.
2. **Breadboards vs. PCBs**: Jumper wires act as inductors and antennas. True biomedical precision requires a custom multi-layer Printed Circuit Board (PCB) with solid ground planes, differential trace routing, and RF shielding cans.
3. **What I Learned**: Building HealthGuard taught me more about operating systems, memory management, and signal physics than any pure software project. When you debug code that fails because of a cold solder joint or a bypass capacitor, your intuition for distributed systems and race conditions becomes fundamentally sharper.

---

## 8. Current Status & What's Next

- **Status**: Functional hardware test bench with live telemetry pipeline streaming to the React dashboard.
- **Next Iteration**: Designing a custom 2-layer PCB in KiCAD to eliminate breadboard jumper wires, and migrating the wireless transport from Wi-Fi to **Bluetooth Low Energy (BLE 5.0)** to extend battery runtime from 6 hours to 5 days on a coin-cell battery.
