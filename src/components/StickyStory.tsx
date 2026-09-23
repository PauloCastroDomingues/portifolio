import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { RocketLaunchDiagram } from "./RocketLaunchDiagram";
import { content, storySteps } from "../data/content";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function StickyStory() {
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const { settings, reducedMotion, setStep } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  const activate = (index: number) => {
    activeRef.current = index;
    setActive(index);
    setStep(storySteps[index].title);
  };

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
                if (next !== activeRef.current) activate(next);
              },
              onLeave: () => setStep("órbita concluída"),
              onEnterBack: () => setStep(storySteps[activeRef.current].title),
            },
          });

          tl.to(".story-visual-inner", { scale: 1.025, xPercent: -1.5, yPercent: -1 }, 0)
            .to(".story-scanline", { yPercent: 190, ease: "none" }, 0)
            .to(".story-visual-inner", { scale: 1, xPercent: 1, yPercent: 0 }, 0.34)
            .to(".story-scanline", { yPercent: 360, ease: "none" }, 0.34)
            .to(".story-visual-inner", { scale: 1.035, xPercent: -1, yPercent: 1 }, 0.67)
            .to(".story-scanline", { yPercent: 560, ease: "none" }, 0.67);
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
          </div>

          <div className="story-visual" aria-label="Foguete avançando por três estágios de performance">
            <span className="story-visual-label">{storySteps[active].code}</span>
            <span className="story-scanline" aria-hidden="true" />
            <div className="story-visual-inner">
              <RocketLaunchDiagram activeIndex={active} />
            </div>
            <span className="story-visual-metric">{storySteps[active].metric}</span>
            <span className="story-visual-index" aria-hidden="true">
              0{active + 1} / 03
            </span>
          </div>

          <ol className="story-steps" aria-label="Estágios do lançamento">
            {storySteps.map((step, index) => (
              <li className={active === index ? "is-active" : ""} key={step.id}>
                <button
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => activate(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
