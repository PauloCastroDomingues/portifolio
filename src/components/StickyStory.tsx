import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CampaignJourneyDiagram } from "./CampaignJourneyDiagram";
import { content, storySteps } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function StickyStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { settings, reducedMotion, setStep } = useMotion();
  const enabled = settings.animations && !reducedMotion;
  const activate = (index: number) => {
    setActive(index);
    setStep(storySteps[index].title);
  };

  useGSAP(
    () => {
      if (!root.current) return;
      const panels = gsap.utils.toArray<HTMLElement>(".story-stage-panel", root.current);
      const current = panels[active];
      const duration = enabled ? 0.62 : 0;

      gsap.to(panels.filter((panel) => panel !== current), {
        autoAlpha: 0,
        y: -18,
        duration: enabled ? 0.24 : 0,
        ease: "power2.in",
        overwrite: true,
      });
      gsap.fromTo(
        current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration, ease: "power3.out", overwrite: true },
      );
    },
    { scope: root, dependencies: [active, enabled], revertOnUpdate: false },
  );



  return (
    <section className="story section dark-section" id="experiencia" ref={root}>
      <div className="story-pin">
        <div className="container story-grid">
          <div className="story-copy">
            <p className="section-kicker">{content.story.eyebrow}</p>
            <h2>{content.story.title}</h2>
          </div>

          <div className="story-visual" aria-label="Fluxo de gest?o de campanhas">
            <div className="story-visual-inner">
              <CampaignJourneyDiagram activeIndex={active} />
            </div>
          </div>

          <div className="story-narrative">
            <div className="story-stage-tabs" role="tablist" aria-label="Estágios do lançamento">
              {storySteps.map((step, index) => (
                <button
                  type="button"
                  role="tab"
                  id={`story-tab-${step.id}`}
                  aria-controls={`story-panel-${step.id}`}
                  aria-selected={active === index}
                  className={active === index ? "is-active" : ""}
                  onClick={() => activate(index)}
                  key={step.id}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                </button>
              ))}
            </div>

            <div className="story-stage-viewport" aria-live="polite">
              {storySteps.map((step, index) => (
                <article
                  className={`story-stage-panel story-stage-panel-${index}`}
                  id={`story-panel-${step.id}`}
                  role="tabpanel"
                  aria-labelledby={`story-tab-${step.id}`}
                  aria-hidden={active !== index}
                  data-stage={index}
                  key={step.id}
                >
                  <div className="story-stage-status">
                    <i aria-hidden="true" />
                    <span>{step.code}</span>
                    <small>ETAPA {String(index + 1).padStart(2, "0")}</small>
                  </div>
                  <p className="story-stage-label">{step.label}</p>
                  <h3>{step.title}</h3>
                  <p className="story-stage-description">{step.description}</p>
                  <ul className="story-stage-signals" aria-label="Sinais desta etapa">
                    {step.signals.map((signal) => <li key={signal}>{signal}</li>)}
                  </ul>
                  <div className="story-stage-result">
                    <span>AO FINAL</span>
                    <strong>{step.result}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="story-stage-progress" aria-hidden="true">
              <i style={{ transform: `scaleX(${(active + 1) / storySteps.length})` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
