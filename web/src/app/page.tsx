import { AmbientAura } from "@/components/ui/AmbientAura";
import { PageShell } from "@/components/layout/PageShell";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Single-page composition — flow: Hero → Work → About → Contact.
// Direct landing from hero positioning into selected work, followed by engineering stance and direct contact.
export default function Home() {
  return (
    <>
      <AmbientAura />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <PageShell rail>
          <Work />
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
