import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { RocketLaunchDiagram } from "./RocketLaunchDiagram";
import { content, storySteps } from "../data/content";
import { motionConfig } from "../motion/config";
import { addLaunchState, setLaunchState } from "../motion/rocketLaunch";
import { useMotion } from "../motion/useMotion";

export function StickyStory() {
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const { settings, reducedMotion, setStep } = useMotion();
  const enabled = settings.animations && !reducedMotion;
  const [scrollDriven, setScrollDriven] = useState(
    () =>
      window.matchMedia(
        `(min-width: ${motionConfig.devices.desktopMin}px) and (min-height: ${motionConfig.devices.pinMinHeight}px)`,
      ).matches && enabled,
  );

  useEffect(() => {
    const query = window.matchMedia(
      `(min-width: ${motionConfig.devices.desktopMin}px) and (min-height: ${motionConfig.devices.pinMinHeight}px)`,
    );
    const update = () => setScrollDriven(query.matches && enabled);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [enabled]);

  const activate = (index: number) => {
    activeRef.current = index;
    setActive(index);
    setStep(storySteps[index].title);
  };

  useGSAP(
    () => {
      if (!root.current || scrollDriven) return;
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
    { scope: root, dependencies: [active, enabled, scrollDriven], revertOnUpdate: false },
  );

  useGSAP(
    () => {
      if (!enabled || !root.current) return;

      const media = gsap.matchMedia();
      media.add(
        `(min-width: ${motionConfig.devices.desktopMin}px) and (min-height: ${motionConfig.devices.pinMinHeight}px)`,
        () => {
          setLaunchState(root.current, 0);
          const panels = gsap.utils.toArray<HTMLElement>(".story-stage-panel", root.current);
          gsap.set(panels, { autoAlpha: 0, y: 20 });
          gsap.set(panels[0], { autoAlpha: 1, y: 0 });
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

          addLaunchState(tl, root.current, 1, 0.04, 0.42);
          addLaunchState(tl, root.current, 2, 0.52, 0.46);

          tl.to(panels[0], { autoAlpha: 0, y: -20, duration: 0.07, ease: "power2.in" }, 0.27)
            .to(panels[1], { autoAlpha: 1, y: 0, duration: 0.11, ease: "power3.out" }, 0.31)
            .to(panels[1], { autoAlpha: 0, y: -20, duration: 0.07, ease: "power2.in" }, 0.6)
            .to(panels[2], { autoAlpha: 1, y: 0, duration: 0.11, ease: "power3.out" }, 0.64);
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
              <RocketLaunchDiagram activeIndex={active} scrollDriven={scrollDriven} />
            </div>
            <span className="story-visual-metric">{storySteps[active].metric}</span>
            <span className="story-visual-index" aria-hidden="true">
              0{active + 1} / 03
            </span>
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
                    <span>RESULTADO</span>
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
