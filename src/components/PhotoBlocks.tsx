import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMotion } from "../motion/useMotion";
import { content, photos } from "../data/content";
import { ParallaxImage } from "./ParallaxImage";

export function PhotoBlocks() {
  const visual = content.visualStory;
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(() => {
    if (!settings.animations || reducedMotion || !root.current) return;
    gsap.fromTo(".wide-photo-caption", { y: 54, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: ".wide-photo", start: "top 64%" } });
    gsap.fromTo(".split-photo-copy", { x: -46, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: ".split-photo", start: "top 72%" } });
    gsap.fromTo(".performance-note", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.16, ease: "power3.out", scrollTrigger: { trigger: ".split-photo", start: "top 68%" } });
  }, { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true });

  return (
    <section className="photo-blocks section" ref={root} aria-label="Narrativa visual de performance">
      <div className="wide-photo">
        <ParallaxImage src={photos.wide} alt={visual.wideAlt} intensity={1.25} />
        <div className="wide-photo-caption">
          <p className="section-kicker">{visual.wideEyebrow}</p>
          <h2>{visual.wideTitle}</h2>
          <span className="caption-index" aria-hidden="true">02 / 05</span>
        </div>
      </div>

      <div className="container split-photo">
        <div className="split-photo-copy">
          <p className="section-kicker">{visual.splitEyebrow}</p>
          <h2>{visual.splitTitle}</h2>
          <p className="split-support">
            {visual.splitSupport}
          </p>
          <p className="performance-note">{visual.performanceNote}</p>
        </div>
        <ParallaxImage
          className="split-photo-large"
          src={photos.splitLarge}
          alt={visual.largeAlt}
          intensity={1.15}
        />
        <ParallaxImage
          className="split-photo-small"
          src={photos.splitSmall}
          alt={visual.smallAlt}
          intensity={0.75}
        />
      </div>
    </section>
  );
}

