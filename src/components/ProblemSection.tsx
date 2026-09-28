import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { content } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function ProblemSection() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".problem-fragment");
      gsap.set(cards, {
        x: (index) => [52, -34, 68, -56, 28, -42][index] ?? 0,
        y: (index) => [-24, 42, -48, 34, -18, 52][index] ?? 0,
        rotate: (index) => [2.2, -1.7, 1.1, -2.4, 1.8, -1.1][index] ?? 0,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 68%",
          end: "center 38%",
          scrub: 0.85,
        },
      })
        .fromTo(".problem-copy > *", { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 }, 0)
        .to(cards, { x: 0, y: 0, rotate: 0, autoAlpha: 1, stagger: 0.05, ease: "power2.out" }, 0.08)
        .fromTo(".problem-scan", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center" }, 0.35);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="section problem-section" ref={root}>
      <div className="container problem-layout">
        <div className="problem-copy">
          <p className="eyebrow">{content.problem.eyebrow}</p>
          <h2>{content.problem.title}</h2>
          <p className="section-lead">{content.problem.text}</p>
        </div>

        <div className="problem-board" aria-label="Gargalos que precisam ser conectados durante a análise">
          <div className="problem-board-top">
            <span>SINAIS DA OPERAÇÃO</span>
            <span>ANTES DA PRIORIZAÇÃO</span>
          </div>
          <div className="problem-fragments">
            {content.problem.items.map((item, index) => (
              <article className="problem-fragment" key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
                <small>{index % 2 === 0 ? "SINAL" : "RISCO"}</small>
              </article>
            ))}
          </div>
          <div className="problem-board-bottom">
            <span className="problem-scan" aria-hidden="true" />
            <span>LER CONTEXTO → DEFINIR PRIORIDADE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
