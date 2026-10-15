import { AmbientAura } from "@/components/ui/AmbientAura";
import { PageShell } from "@/components/layout/PageShell";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Single-page composition — flow: Hero → tech bus → Work → Skills → About →
// Contact. Hero is full-bleed; the tech-stack marquee is a full-bleed band that
// runs directly under it, then other sections are held to the capped content
// width via PageShell. Section boundaries are marked by the copper trace.
export default function Home() {
  return (
    <>
      <AmbientAura />
      <ScrollProgress />
      <PageTransition />
      <Nav />
      <main>
        <Hero />
        {/* Core stack, in motion — a full-bleed bus of real brand marks that
            drifts left→right and accelerates with downward scroll. */}
        <TechMarquee />
        <PageShell rail>
          <Work />
          <Skills />
          <About />
          <Contact />
        </PageShell>
      </main>
      <PageShell>
        <Footer />
      </PageShell>
    </>
  );
}
