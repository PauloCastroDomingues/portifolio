import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  intensity?: number;
};

export function ParallaxImage({
  src,
  alt,
  className = "",
  priority,
  intensity = 1,
}: ParallaxImageProps) {
  const root = useRef<HTMLDivElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;
  const parallaxEnabled = enabled && settings.parallax;

  useGSAP(
    () => {
      if (!root.current || !enabled) return;

      gsap.fromTo(
        ".parallax-curtain",
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1.05,
          ease: motionConfig.ease.reveal,
          scrollTrigger: { trigger: root.current, start: "top 84%" },
        },
      );

      gsap.fromTo(
        ".parallax-img",
        { scale: motionConfig.parallax.scale + 0.08 },
        {
          scale: motionConfig.parallax.scale,
          duration: 1.3,
          ease: motionConfig.ease.reveal,
          scrollTrigger: { trigger: root.current, start: "top 84%" },
        },
      );

      if (!parallaxEnabled) return;
      const travel = motionConfig.parallax.yPercent * intensity;
      gsap.fromTo(
        ".parallax-img",
        { yPercent: -travel },
        {
          yPercent: travel,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: motionConfig.scroll.scrub,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: root, dependencies: [enabled, parallaxEnabled, intensity], revertOnUpdate: true },
  );

  return (
    <div className={`parallax-frame ${className}`} ref={root}>
      <img
        className="parallax-img"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      <span className="parallax-curtain" aria-hidden="true" />
    </div>
  );
}
