import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDownRight } from "lucide-react";
import { useMotion } from "../motion/useMotion";
import { content, photos } from "../data/content";

export function About() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(() => {
    if (!settings.animations || reducedMotion || !root.current) return;
    gsap.fromTo(".about-grid > div:first-child", { x: -36, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 76%" } });
    gsap.fromTo(".about-portrait", { clipPath: "inset(12% 12% 12% 12%)", scale: 0.94 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 76%" } });
    gsap.fromTo(".about-copy", { x: 44, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.85, delay: 0.12, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 72%" } });
    gsap.fromTo(".about-portrait img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  }, { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true });

  return (
    <section className="about-section section" id="sobre" ref={root}>
      <div className="container about-grid">
        <div>
          <p className="section-kicker">Sobre</p>
          <h2>{content.about.title}</h2>
        </div>
        <figure className="about-portrait">
          <img src={photos.about} alt={content.about.mediaAlt} loading="lazy" />
          <figcaption>{content.identity.name}</figcaption>
        </figure>
        <div className="about-copy">
          <p>{content.about.text}</p>
          <a className="text-link" href={content.contact.primaryHref} target="_blank" rel="noreferrer">
            {content.contact.primaryLabel}
            <ArrowDownRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
