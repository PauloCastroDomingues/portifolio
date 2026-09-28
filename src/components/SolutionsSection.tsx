import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Check } from "lucide-react";
import { solutionCards, content } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function SolutionsSection() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 72%", end: "center 48%", scrub: 0.65 },
      })
        .fromTo(".solutions-head > *", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.09 })
        .fromTo(".solution-card", { y: 46, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 }, 0.12);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="section solutions-section" id="solucoes" ref={root}>
      <div className="container">
        <div className="solutions-head section-head">
          <p className="eyebrow">{content.solutions.eyebrow}</p>
          <h2>{content.solutions.title}</h2>
        </div>

        <div className="solutions-grid">
          {solutionCards.map((item) => (
            <article className="solution-card" key={item.code}>
              <div className="solution-card-top">
                <span>{item.code}</span>
                <small>{item.kicker}</small>
              </div>
              <div className="solution-card-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <ul className="solution-deliverables">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable}>
                    <Check aria-hidden="true" size={15} />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
