import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { content } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      gsap.fromTo(
        ".final-cta-inner > *",
        { y: 34, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 72%", end: "center 58%", scrub: 0.6 },
        },
      );
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="section final-cta" id="contato" ref={root}>
      <div className="container final-cta-inner">
        <p className="eyebrow">{content.contact.eyebrow}</p>
        <h2>{content.contact.title}</h2>
        <p>{content.contact.subtitle}</p>
        <a className="button button-accent button-large" href={content.contact.primaryHref} target="_blank" rel="noreferrer">
          {content.contact.primaryLabel}
          <ArrowUpRight aria-hidden="true" size={19} />
        </a>
        <div className="final-cta-system" aria-hidden="true">
          <span>DADOS</span><i>→</i><span>ANÁLISE</span><i>→</i><span>ESTRATÉGIA</span><i>→</i><span>AÇÃO</span>
        </div>
      </div>
    </section>
  );
}
