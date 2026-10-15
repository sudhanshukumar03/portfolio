# HealthGuard — Hardware Telemetry Pipeline & Biomedical Vitals Dashboard

> *"Bridging physical biomedical sensors to cloud dashboards: analog signal filtering, FreeRTOS task scheduling, JSON telemetry framing, and real-time clinical waveform rendering."*

- **Repository**: [github.com/sudhanshukumar03/healthguard](https://github.com/sudhanshukumar03/healthguard)
- **Role**: Embedded Systems & Full-Stack Engineer
- **Status**: Exploratory hardware prototype & functional telemetry pipeline
- **Stack**: ESP32 Microcontroller (C++ / FreeRTOS), MAX30102 (PPG), AD8232 (ECG), DS18B20 (Temperature), MPU6050 (IMU), Node.js, FastAPI, PostgreSQL, React, WebSockets, HTML5 Canvas

---

## 1. Summary

HealthGuard is an end-to-end biomedical telemetry pipeline that captures physiological signals from physical hardware sensors attached to an ESP32 microcontroller, filters out analog noise and motion artifacts, transmits encrypted telemetry packets to a cloud backend, and renders live biomedical waveforms (ECG rhythm strips, SpO2, heart rate, body temperature, and fall detection alerts) on a responsive React dashboard.

> **Honesty & Clinical Boundary Notice**: HealthGuard is an academic and exploratory engineering prototype designed to study hardware-to-cloud telemetry pipelines, ADC calibration, and real-time data streaming. It is not an FDA/CE-certified diagnostic medical device.

---

## 2. The Problem: The Hard Reality of Biomedical Telemetry

Most consumer health trackers are black boxes: they collect proprietary sensor data, apply opaque smoothing algorithms, and dump high-level averages into closed vendor clouds. Building an open, low-latency biomedical pipeline reveals significant systems engineering hurdles:
1. **Extreme Analog Noise**: Biological electrical signals are minute. An electrocardiogram (ECG) trace produces voltages on the order of 0.5mV to 4mV on human skin. 50Hz/60Hz AC mains interference, baseline wander from breathing, and muscle tremors (electromyographic noise) easily overpower raw readings.
2. **Microcontroller Timing Jitter**: Sampling biomedical sensors requires strict, deterministic time intervals. If an analog-to-digital converter (ADC) or I2C bus suffers timing jitter due to blocking Wi-Fi transmissions, the resulting heart rate variability (HRV) and ECG waveforms become medically meaningless.
3. **Bandwidth vs. Battery Trade-Offs**: Streaming raw 100Hz–250Hz waveform samples over continuous Wi-Fi depletes small wearable batteries in hours, requiring efficient on-chip buffering, edge thresholding, and batched telemetry framing.

---

## 3. Hardware & Telemetry Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Physical Sensor Layer                    │
│   AD8232 (Analog ECG) · MAX30102 (I2C PPG Oximeter)         │
│   DS18B20 (1-Wire Temp) · MPU6050 (I2C 6-Axis Accelerometer)│
└──────────────────────────────┬──────────────────────────────┘
                               │ Analog Voltages / I2C / 1-Wire
┌──────────────────────────────▼──────────────────────────────┐
│            ESP32 Microcontroller (Dual Core Tensilica)       │
│   Core 0: FreeRTOS High-Priority Timer (100Hz Sensor Polling)│
│   Core 1: Moving-Average Filter & Moving-Window Peak Detect  │
│   TCP/IP Wi-Fi Stack · JSON Telemetry Packet Serialization  │
└──────────────────────────────┬──────────────────────────────┘
                               │ Encrypted HTTP / WebSocket Burst
┌──────────────────────────────▼──────────────────────────────┐
│                    Cloud Ingestion Layer                    │
│     FastAPI / Node.js High-Throughput Webhook Ingress       │
│      In-Memory Ring Buffer · PostgreSQL Time-Series Store   │
└──────────────────────────────┬──────────────────────────────┘
                               │ WebSocket Real-Time Stream
┌──────────────────────────────▼──────────────────────────────┐
│                 Clinical React Dashboard                    │
│   HTML5 Canvas 60 FPS Sweep-Bar ECG Waveform Renderer        │
│   Live SpO2 Gauge · Temperature Trends · Fall Alert Modal   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Hardware Sensors & Specifications

| Sensor Module | Physiological Signal | Interface | Sampling Rate | Processing Strategy |
|---|---|---|:---:|---|
| **AD8232** | Single-Lead ECG (Heart Electrical Activity) | Analog ADC (GPIO 36 / VP) | 100 Hz | Hardware high-pass filter + digital moving-window integrator |
| **MAX30102** | Photoplethysmography (SpO2 & Heart Rate) | I2C (SDA/SCL, 400 kHz) | 50 Hz | Red & Infrared LED AC/DC ratio calculation for oxygen saturation |
| **DS18B20** | Peripheral Body Temperature | Dallas 1-Wire (GPIO 4) | 1 Hz | 12-bit digital resolution ($\pm 0.0625^\circ\text{C}$ step size) |
| **MPU6050** | 6-Axis Accelerometer & Gyroscope | I2C (Shared Bus, 0x68) | 25 Hz | Vector magnitude thresholding ($> 2.8g$ followed by zero motion) for fall detection |

---

## 5. Technical Challenges & Resolutions

### Challenge 1: ESP32 ADC Non-Linearity & Noise
- **Issue**: The built-in 12-bit ADC on the ESP32 suffers from well-documented non-linearity below 0.1V and above 2.8V, causing distortion at the peaks of the ECG QRS complex.
- **Resolution**: Implemented multi-point polynomial calibration using the ESP32 `esp_adc_cal` framework with factory eFuse Vref values. Applied a digital software moving-average filter over a 5-sample sliding window to strip out high-frequency thermal noise without blunting the sharp R-peak.

### Challenge 2: I2C Bus Lockups During Wi-Fi Transmission Bursts
- **Issue**: When the ESP32 transmitter ramped up RF power to send Wi-Fi packets, occasional power rail voltage drops caused the MAX30102 sensor to hold the I2C SDA line low indefinitely, freezing the microcontroller.
- **Resolution**: Implemented a FreeRTOS dual-core task partition: Core 0 handles sensor sampling exclusively with a hardware watchdog timer; Core 1 handles network connectivity and JSON packaging. Added an automatic I2C bus recovery routine that toggles SCL 9 times to release stuck slave devices whenever a bus timeout is detected.

### Challenge 3: Rendering 100Hz ECG Waveforms in React Without Dropping Frames
- **Issue**: Updating standard SVG DOM elements at 100 data points per second caused severe React reconciliation thrashing, dropping UI frame rates below 20 FPS.
- **Resolution**: Replaced DOM-based chart components with an optimized HTML5 Canvas render loop using `requestAnimationFrame`. Telemetry data is pushed directly into a circular typed array buffer (`Float32Array(500)`), and the canvas renders a medical-style phosphor sweep bar, maintaining a smooth 60 FPS on any modern browser.

---

## 6. Links & Documentation

- **Live Codebase**: [github.com/sudhanshukumar03/healthguard](https://github.com/sudhanshukumar03/healthguard)
- **Deep-Dive Case Study**: [`case-studies/HEALTHGUARD-CASE-STUDY.md`](../case-studies/HEALTHGUARD-CASE-STUDY.md)
- **Local Preview Image**: `web/public/images/healthguard.jpg`
