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
};

export function ParallaxImage({ src, alt, className = "", priority }: ParallaxImageProps) {
  const root = useRef<HTMLDivElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && settings.parallax && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) {
        return;
      }
      gsap.fromTo(
        ".parallax-img",
        { yPercent: -motionConfig.parallax.yPercent },
        {
          yPercent: motionConfig.parallax.yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: motionConfig.scroll.scrub,
          },
        },
      );
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <div className={`parallax-frame ${className}`} ref={root}>
      <img
        className="parallax-img"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
