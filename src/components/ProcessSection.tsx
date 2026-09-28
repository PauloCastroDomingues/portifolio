import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { content, processSteps } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 58%",
          scrub: 0.75,
        },
      })
        .fromTo(".process-copy > *", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 })
        .fromTo(".process-track-progress", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center" }, 0.18)
        .fromTo(".process-step", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12 }, 0.12);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="section process-section" id="processo" ref={root}>
      <div className="container">
        <div className="process-copy section-head">
          <p className="eyebrow">{content.process.eyebrow}</p>
          <h2>{content.process.title}</h2>
        </div>

        <div className="process-track">
          <span className="process-track-base" aria-hidden="true" />
          <span className="process-track-progress" aria-hidden="true" />
          {processSteps.map((step, index) => (
            <article className="process-step" key={step.code}>
              <div className="process-node"><span>{step.code}</span></div>
              <div className="process-step-copy">
                <small>{index === processSteps.length - 1 ? "LOOP" : `STAGE 0${index + 1}`}</small>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
