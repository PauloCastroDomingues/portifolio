import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const lineOne = useRef<HTMLSpanElement>(null);
  const lineTwo = useRef<HTMLSpanElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) {
        return;
      }

      const masks = gsap.utils.toArray<HTMLElement>(".hero-mask > span");
      gsap.fromTo(
        masks,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: motionConfig.durations.reveal,
          stagger: motionConfig.stagger,
          ease: motionConfig.ease.standard,
        },
      );

      const titleShift = () => {
        const first = lineOne.current?.getBoundingClientRect();
        const second = lineTwo.current?.getBoundingClientRect();
        if (!first || !second || window.innerWidth < 1080) {
          return { x: 0, y: 0 };
        }
        const gap = Math.max(18, window.innerWidth * 0.012);
        const horizontal = first.right + gap - second.left;
        const vertical = first.top - second.top;
        return { x: horizontal, y: vertical };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=82%",
          scrub: motionConfig.scroll.scrub,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        lineTwo.current,
        {
          x: () => titleShift().x,
          y: () => titleShift().y,
          ease: motionConfig.ease.scroll,
        },
        0,
      )
        .to(".hero-copy", { opacity: 0, y: -28, ease: "none" }, 0)
        .to(".hero-shape-inner", { rotate: 28, xPercent: 16, yPercent: -8 }, 0)
        .to(".hero-depth-back", { yPercent: 9 }, 0)
        .to(".hero-depth-mid", { yPercent: -6 }, 0);

      const move = (event: PointerEvent) => {
        if (window.innerWidth < motionConfig.devices.pointerMin) {
          return;
        }
        const x = (event.clientX / window.innerWidth - 0.5) * 16;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;
        gsap.to(".hero-pointer-layer", {
          x,
          y,
          duration: 0.5,
          overwrite: "auto",
          ease: "power2.out",
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
      <div className="hero-depth-back" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio demonstrativo</p>
          <p>Um espaco para experimentar forma, imagem e interacao.</p>
          <a className="button button-dark" href="#experiencia">
            Explorar a experiencia
          </a>
        </div>
        <h1 className="hero-title" aria-label="Ideias em movimento.">
          <span className="hero-mask">
            <span ref={lineOne}>Ideias</span>
          </span>
          <span className="hero-mask hero-mask-offset">
            <span ref={lineTwo}>em movimento.</span>
          </span>
        </h1>
        <div className="hero-depth-mid hero-pointer-layer" aria-hidden="true">
          <div className="hero-shape">
            <div className="hero-shape-inner">
              <svg viewBox="0 0 420 320" role="img" aria-label="">
                <path
                  d="M64 193 C120 34 235 30 272 86 C316 153 194 176 220 236 C241 284 346 258 369 189"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="44"
                  strokeLinecap="round"
                />
                <path
                  d="M89 194 C154 89 229 76 250 111 C276 154 170 182 236 229"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.32"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
