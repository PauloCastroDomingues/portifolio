import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { cases, content } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function CasesSection() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 74%", end: "center 45%", scrub: 0.65 },
      })
        .fromTo(".cases-head > *", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 })
        .fromTo(".case-report", { y: 48, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.15)
        .fromTo(".case-stage", { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.06 }, 0.3)
        .fromTo(".case-metric", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05 }, 0.42);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  const currentCase = cases[0];

  return (
    <section className="section cases-section" id="cases" ref={root}>
      <div className="container">
        <div className="cases-head section-head split-head">
          <div>
            <p className="eyebrow">{content.casesSection.eyebrow}</p>
            <h2>{content.casesSection.title}</h2>
          </div>
          <div className="section-head-aside">
            <p>{content.casesSection.intro}</p>
            <span>{content.casesSection.emptyNote}</span>
          </div>
        </div>

        <article className="case-report">
          <header className="case-report-head">
            <div>
              <span>{currentCase.code}</span>
              <h3>{currentCase.title}</h3>
            </div>
            <span className="case-status"><i aria-hidden="true" /> Aguardando dados reais</span>
          </header>

          <div className="case-analysis-grid">
            <div className="case-stage"><span>01</span><small>CONTEXTO</small><p>{currentCase.context}</p></div>
            <div className="case-stage"><span>02</span><small>PROBLEMA</small><p>{currentCase.problem}</p></div>
            <div className="case-stage"><span>03</span><small>ANÁLISE</small><p>{currentCase.analysis}</p></div>
            <div className="case-stage"><span>04</span><small>AÇÃO</small><p>{currentCase.action}</p></div>
          </div>

          <div className="case-results">
            <div className="case-results-label">
              <span>05 / RESULTADO</span>
              <p>Números grandes entram aqui somente depois da validação dos dados.</p>
            </div>
            <div className="case-metrics">
              {currentCase.results.map((result) => (
                <div className="case-metric" key={`${result.value}-${result.label}`}>
                  <strong>{result.value}</strong>
                  <span>{result.label}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
