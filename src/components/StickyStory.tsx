import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { AmbientDiagram } from "./AmbientDiagram";
import { storySteps } from "../data/content";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function StickyStory() {
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const { settings, reducedMotion, setStep } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) {
        return;
      }

      const canPin =
        window.innerWidth >= motionConfig.devices.desktopMin &&
        window.innerHeight >= motionConfig.devices.pinMinHeight;
      if (!canPin) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * motionConfig.scroll.storyDistanceDesktop}`,
          scrub: motionConfig.scroll.scrub,
          pin: ".story-pin",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(2, Math.floor(self.progress * 3));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
              setStep(storySteps[next].title);
            }
          },
          onLeave: () => setStep("saida"),
          onEnterBack: () => setStep(storySteps[activeRef.current].title),
        },
      });

      tl.to(".story-visual-inner", { scale: 1.12, xPercent: -4, yPercent: -2 }, 0)
        .to(".diagram", { rotate: -5 }, 0)
        .to(".story-visual-inner", { scale: 0.92, xPercent: 7, yPercent: 4 }, 0.34)
        .to(".diagram", { rotate: 6 }, 0.34)
        .to(".story-visual-inner", { scale: 1.22, xPercent: -8, yPercent: 6 }, 0.67)
        .to(".diagram", { rotate: 0 }, 0.67);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="story section dark-section" id="experiencia" ref={root}>
      <div className="story-pin">
        <div className="container story-grid">
          <div className="story-copy">
            <p className="section-kicker">Experiencia guiada</p>
            <h2>Uma narrativa em tres movimentos.</h2>
            <ol>
              {storySteps.map((step, index) => (
                <li className={active === index ? "is-active" : ""} key={step.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="story-visual" aria-label="Diagrama abstrato em etapas">
            <div className="story-visual-inner">
              <AmbientDiagram activeIndex={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
