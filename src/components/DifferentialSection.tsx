import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { content } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function DifferentialSection() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "center 40%", scrub: 0.75 },
      });
      tl.fromTo(".differential-copy > *", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 })
        .fromTo(".operation-core", { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 }, 0.18)
        .fromTo(".operation-node", { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.05 }, 0.25)
        .fromTo(".operation-spoke", { strokeDashoffset: 1, autoAlpha: 0 }, { strokeDashoffset: 0, autoAlpha: 1, stagger: 0.04 }, 0.26);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="section differential-section" ref={root}>
      <div className="container differential-layout">
        <div className="differential-copy">
          <p className="eyebrow">{content.differential.eyebrow}</p>
          <h2>{content.differential.title}</h2>
          <p className="section-lead">{content.differential.text}</p>
          <div className="credential-note">
            <span>EXPERIÊNCIA / OPERAÇÃO + DADOS</span>
            <p>{content.differential.credential}</p>
          </div>
        </div>

        <div className="operation-map" aria-label="Mapa sistêmico da operação de marketplace">
          <svg className="operation-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="50" y2="9" />
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="86" y2="22" />
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="89" y2="50" />
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="81" y2="83" />
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="50" y2="92" />
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="16" y2="83" />
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="11" y2="50" />
            <line className="operation-spoke" pathLength="1" x1="50" y1="50" x2="15" y2="22" />
          </svg>
          <div className="operation-core">
            <small>CORE</small>
            <strong>{content.differential.center}</strong>
          </div>
          {content.differential.nodes.map((node, index) => (
            <div className={`operation-node operation-node-${index + 1}`} key={node}>
              <small>0{index + 1}</small>
              <strong>{node}</strong>
            </div>
          ))}
          <div className="operation-ring ring-one" aria-hidden="true" />
          <div className="operation-ring ring-two" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
