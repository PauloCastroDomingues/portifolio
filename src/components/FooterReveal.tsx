import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUp, ArrowUpRight, GitBranch } from "lucide-react";
import { gsap } from "gsap";
import { content } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function FooterReveal() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!settings.animations || reducedMotion) return;
      gsap.fromTo(
        ".closing-panel",
        { clipPath: "inset(0 0 0 0)" },
        {
          clipPath: "inset(0 clamp(18px, 5vw, 92px) 0 clamp(18px, 5vw, 92px))",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            end: "bottom bottom",
            scrub: 0.8,
          },
        },
      );
      gsap.fromTo(
        ".closing-grid > *",
        { y: 52, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".closing-grid", start: "top 78%" },
        },
      );
    },
    { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true },
  );

  return (
    <footer className="footer-reveal" id="contato" ref={root}>
      <div className="closing-panel">
        <div className="container closing-grid">
          <div>
            <p className="section-kicker">{content.contact.eyebrow}</p>
            <h2>{content.contact.title}</h2>
          </div>
          <div className="closing-actions">
            <a className="button button-dark" href={content.contact.primaryHref} target="_blank" rel="noreferrer">
              <GitBranch aria-hidden="true" size={19} />
              {content.contact.primaryLabel}
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <a className="text-link" href={content.contact.secondaryHref}>
              <ArrowUp aria-hidden="true" size={17} />
              {content.contact.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <div className="container footer-grid">
          <p>{content.footer.signature}</p>
          <p>{content.footer.note}</p>
          <a href={content.footer.sourceHref} target="_blank" rel="noreferrer">
            {content.footer.sourceLabel}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
