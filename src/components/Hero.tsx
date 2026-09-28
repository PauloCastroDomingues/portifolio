import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { content } from "../data/content";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;

      const intro = gsap.timeline({ defaults: { ease: motionConfig.ease.reveal } });
      intro
        .fromTo(".hero-kicker", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 })
        .fromTo(".hero-title-line > span", { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.09 }, 0.08)
        .fromTo(".hero-lead, .hero-actions, .hero-meta", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08 }, 0.34)
        .fromTo(".performance-console", { clipPath: "inset(0 0 100% 0)", autoAlpha: 0.5 }, { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, duration: 1 }, 0.18)
        .fromTo(".audit-row, .audit-note", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07 }, 0.55);

      const scroll = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=90%",
          scrub: motionConfig.scroll.scrub,
          invalidateOnRefresh: true,
        },
      });
      scroll
        .to(".hero-copy", { yPercent: -8, autoAlpha: 0.55, ease: "none" }, 0)
        .to(".performance-console", { yPercent: 8, scale: 0.97, ease: "none" }, 0);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="hero section" id="inicio" ref={root}>
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container hero-shell">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">{content.hero.eyebrow}</p>
          <h1 className="hero-title" aria-label={content.hero.headline}>
            {content.hero.titleLines.map((line, index) => (
              <span className={`hero-title-line ${index === 2 ? "is-accent" : ""}`} key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-lead">{content.hero.intro}</p>
          <div className="hero-actions">
            <a className="button button-accent" href={content.hero.primaryHref} target="_blank" rel="noreferrer">
              {content.hero.primaryCta}
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            {content.features.cases && (
              <a className="button button-ghost" href="#cases">{content.hero.secondaryCta}</a>
            )}
          </div>
          <div className="hero-meta">
            <span>Marketplace</span>
            <span>Performance</span>
            <span>Dados</span>
            <span>Estratégia comercial</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Exemplo das perguntas e decisões de um diagnóstico de marketplace">
          <div className="performance-console">
            <div className="console-topbar">
              <div>
                <span className="status-dot" aria-hidden="true" />
                <span>EXEMPLO DE LEITURA</span>
              </div>
              <span>DIAGNÓSTICO</span>
            </div>

            <div className="audit-table">
              <div className="audit-table-head" aria-hidden="true">
                <span>FRENTE</span>
                <span>PERGUNTA</span>
                <span>DECISÃO</span>
              </div>
              {content.hero.auditRows.map((row, index) => (
                <div className="audit-row" key={row.signal}>
                  <div className="audit-signal"><small>0{index + 1}</small><strong>{row.signal}</strong></div>
                  <p>{row.question}</p>
                  <span>{row.decision}</span>
                </div>
              ))}
            </div>

            <div className="audit-note">
              <span>SEM MÉTRICA ISOLADA</span>
              <p>O próximo passo depende do contexto da operação, não de um número sozinho.</p>
            </div>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#visao" aria-label="Avançar para a visão de performance">
        <span>SCROLL / NARRATIVE</span>
        <ArrowDown aria-hidden="true" size={16} />
      </a>
    </section>
  );
}
