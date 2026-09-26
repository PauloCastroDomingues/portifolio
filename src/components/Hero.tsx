import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowDownRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, photos } from "../data/content";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;

      const entrance = gsap.timeline({ defaults: { ease: motionConfig.ease.reveal } });
      entrance
        .fromTo(
          ".hero-mask > span",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.05, stagger: 0.1 },
        )
        .fromTo(
          ".hero-media",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.15 },
          0.18,
        )
        .fromTo(
          ".hero-media img",
          { scale: 1.22 },
          { scale: 1.08, duration: 1.45 },
          0.18,
        )
        .fromTo(
          ".hero-reveal",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
          0.42,
        );

      const scroll = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=95%",
          scrub: motionConfig.scroll.scrub,
          invalidateOnRefresh: true,
        },
      });

      scroll
        .to(".hero-title", { yPercent: -12, ease: "none" }, 0)
        .to(".hero-copy", { y: -54, autoAlpha: 0.15, ease: "none" }, 0)
        .to(".hero-media", { yPercent: 10, ease: "none" }, 0)
        .to(".hero-media img", { yPercent: 8, scale: 1.16, ease: "none" }, 0);

      const move = (event: PointerEvent) => {
        if (window.innerWidth < motionConfig.devices.pointerMin) return;
        const x = (event.clientX / window.innerWidth - 0.5) * 18;
        const y = (event.clientY / window.innerHeight - 0.5) * 14;
        gsap.to(".hero-media", {
          x,
          y,
          duration: 0.8,
          overwrite: "auto",
          ease: "power3.out",
        });
      };

      window.addEventListener("pointermove", move, { passive: true });
      ScrollTrigger.refresh();
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="hero section" id="inicio" ref={root}>
      <div className="hero-grid container">
        <div className="hero-copy hero-reveal">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <p>{content.hero.intro}</p>
          <p className="hero-availability"><span aria-hidden="true" />{content.identity.availability}</p>
          <div className="hero-actions">
            <a className="button button-dark" href={content.hero.primaryHref} target="_blank" rel="noreferrer">
              {content.hero.primaryCta}
              <ArrowDownRight aria-hidden="true" size={18} />
            </a>
            <a className="text-link" href="#experiencia">
              {content.hero.secondaryCta}
            </a>
          </div>
        </div>

        <h1
          className="hero-title"
          aria-label={content.hero.headline}
        >
          {content.hero.titleLines.map((line, index) => (
            <span className={`hero-mask ${index === content.hero.titleLines.length - 1 ? "hero-mask-offset" : ""}`} key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <figure className="hero-media">
          <img src={photos.hero} alt={content.hero.mediaAlt} fetchPriority="high" />
          <figcaption>
            <span>{content.identity.location}</span>
            <span>{content.identity.company}</span>
          </figcaption>
        </figure>

        <a className="hero-scroll hero-reveal" href="#principios" aria-label="Rolar para o conteúdo">
          <ArrowDown aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  );
}
