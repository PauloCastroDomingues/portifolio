import { CasesSection } from "./components/CasesSection";
import { content } from "./data/content";
import { About } from "./components/About";
import { DebugPanel } from "./components/DebugPanel";
import { DifferentialSection } from "./components/DifferentialSection";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { FloatingCta } from "./components/FloatingCta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OffersSection } from "./components/OffersSection";
import { PositioningSection } from "./components/PositioningSection";
import { ProblemSection } from "./components/ProblemSection";
import { ProcessSection } from "./components/ProcessSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { useLenis } from "./hooks/useLenis";
import { MotionProvider } from "./motion/MotionContext";
import { useMotion } from "./motion/useMotion";

function Page() {
  const { settings, reducedMotion } = useMotion();
  useLenis(settings.animations && !reducedMotion);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PositioningSection />
        <ProblemSection />
        <SolutionsSection />
        <DifferentialSection />
        <About />
        {content.features.cases && <CasesSection />}
        <ProcessSection />
        <OffersSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCta />
      <DebugPanel />
    </>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <Page />
    </MotionProvider>
  );
}
