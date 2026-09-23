import { DebugPanel } from "./components/DebugPanel";
import { ExpandingCards } from "./components/ExpandingCards";
import { ExpandingPanel } from "./components/ExpandingPanel";
import { FooterReveal } from "./components/FooterReveal";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MarqueeTestimonials } from "./components/MarqueeTestimonials";
import { PhotoBlocks } from "./components/PhotoBlocks";
import { Projects } from "./components/Projects";
import { StickyStory } from "./components/StickyStory";
import { MotionProvider } from "./motion/MotionContext";
import { useMotion } from "./motion/useMotion";
import { useLenis } from "./hooks/useLenis";

function Page() {
  const { settings, reducedMotion } = useMotion();
  useLenis(settings.animations && !reducedMotion);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarqueeTestimonials />
        <StickyStory />
        <PhotoBlocks />
        <ExpandingCards />
        <Projects />
        <ExpandingPanel />
      </main>
      <FooterReveal />
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
