import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { AmbientDiagram } from "./AmbientDiagram";
import { content, storySteps } from "../data/content";
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
      if (!enabled || !root.current) return;

      const media = gsap.matchMedia();
      media.add(
        `(min-width: ${motionConfig.devices.desktopMin}px) and (min-height: ${motionConfig.devices.pinMinHeight}px)`,
        () => {
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
                const next = Math.min(storySteps.length - 1, Math.floor(self.progress * storySteps.length));
                if (next !== activeRef.current) {
                  activeRef.current = next;
                  setActive(next);
                  setStep(storySteps[next].title);
                }
              },
              onLeave: () => setStep("saída"),
              onEnterBack: () => setStep(storySteps[activeRef.current].title),
            },
          });

          tl.to(".story-visual-inner", { scale: 1.13, xPercent: -5, yPercent: -3 }, 0)
            .to(".diagram", { rotate: -4 }, 0)
            .to(".story-scanline", { yPercent: 380, ease: "none" }, 0)
            .to(".story-visual-inner", { scale: 0.94, xPercent: 6, yPercent: 3 }, 0.34)
            .to(".diagram", { rotate: 5 }, 0.34)
            .to(".story-visual-inner", { scale: 1.2, xPercent: -7, yPercent: 5 }, 0.67)
            .to(".diagram", { rotate: 0 }, 0.67);
        },
      );

      return () => media.revert();
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="story section dark-section" id="experiencia" ref={root}>
      <div className="story-pin">
        <div className="container story-grid">
          <div className="story-copy">
            <p className="section-kicker">{content.story.eyebrow}</p>
            <h2>{content.story.title}</h2>
            <ol>
              {storySteps.map((step, index) => (
                <li className={active === index ? "is-active" : ""} key={step.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                  <i aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
          <div className="story-visual" aria-label="Diagrama abstrato sobre leitura, conexão e decisão">
            <span className="story-visual-label">SYSTEM / DECISION</span>
            <span className="story-scanline" aria-hidden="true" />
            <div className="story-visual-inner">
              <AmbientDiagram activeIndex={active} />
            </div>
            <span className="story-visual-index" aria-hidden="true">
              0{active + 1} / 03
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
