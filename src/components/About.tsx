import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useMotion } from "../motion/useMotion";
import { content, photos } from "../data/content";

export function About() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;

      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 72%", end: "center 46%", scrub: 0.7 },
      })
        .fromTo(".about-head > *", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 })
        .fromTo(".about-portrait", { clipPath: "inset(8% 8% 8% 8%)", scale: 0.96, autoAlpha: 0 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, autoAlpha: 1 }, 0.12)
        .fromTo(".about-skills-head, .about-skill, .about-cta", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.07 }, 0.2);

      gsap.fromTo(
        ".about-portrait img",
        { yPercent: -3 },
        { yPercent: 3, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 } },
      );
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="about-section section" id="sobre" ref={root}>
      <div className="container">
        <div className="about-head split-head section-head">
          <div>
            <p className="eyebrow">{content.about.eyebrow}</p>
          <h2>{content.about.title}</h2>
          </div>
          <p className="section-lead">{content.about.text}</p>
        </div>

        <div className="about-layout">
          <figure className="about-portrait">
            <img src={photos.about} alt={content.about.mediaAlt} loading="lazy" />
            <figcaption>
              <strong>{content.identity.name}</strong>
              <span>{content.identity.location}</span>
            </figcaption>
          </figure>

          <div className="about-skills">
            <div className="about-skills-head">
              <span>EXPERIÊNCIA APLICADA</span>
              <p>{content.about.skillsTitle}</p>
            </div>
            <div className="about-skills-list">
              {content.about.skills.map((skill) => (
                <article className="about-skill" key={skill.code}>
                  <span>{skill.code}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
            <a className="button button-ghost about-cta" href={content.contact.primaryHref} target="_blank" rel="noreferrer">
              {content.contact.primaryLabel}
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
