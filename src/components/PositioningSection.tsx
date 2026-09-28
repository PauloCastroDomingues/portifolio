import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { content } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function PositioningSection() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 45%",
          scrub: 0.7,
        },
      });
      tl.fromTo(".positioning-intro > *", { y: 38, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12 }, 0)
        .fromTo(".formula-input", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 }, 0.16)
        .fromTo(".formula-line", { scaleX: 0 }, { scaleX: 1, stagger: 0.08, transformOrigin: "left center" }, 0.24)
        .fromTo(".formula-output", { scale: 0.86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 }, 0.58);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="section positioning-section" id="visao" ref={root}>
      <div className="container positioning-grid">
        <div className="positioning-intro">
          <p className="eyebrow">{content.positioning.eyebrow}</p>
          <h2>{content.positioning.title}</h2>
          <p className="section-lead">{content.positioning.text}</p>
        </div>

        <div className="performance-formula" aria-label="Quatro perguntas usadas para definir a prioridade da operação">
          <div className="formula-inputs">
            {content.positioning.inputs.map((input, index) => (
              <div className="formula-input" key={input.label}>
                <span className="formula-code">0{index + 1}</span>
                <div>
                  <strong>{input.label}</strong>
                  <p>{input.detail}</p>
                </div>
                <span className="formula-line" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="formula-equals" aria-hidden="true">=</div>
          <div className="formula-output">
            <span>RESULTADO DA LEITURA</span>
            <strong>{content.positioning.output}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
