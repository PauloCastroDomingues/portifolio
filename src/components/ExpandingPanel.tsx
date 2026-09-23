import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { panelStats } from "../data/content";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function ExpandingPanel() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!settings.animations || reducedMotion || !root.current) {
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 68%",
          end: () => `+=${window.innerHeight * motionConfig.scroll.panelDistance}`,
          scrub: motionConfig.scroll.scrub,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        ".metric-panel",
        { width: "42%" },
        { width: "100%", ease: "none" },
        0,
      )
        .to(".metric-number", { scale: 0.46, xPercent: -14, transformOrigin: "left center" }, 0)
        .fromTo(
          ".metric-details li",
          { autoAlpha: 0, x: 42 },
          { autoAlpha: 1, x: 0, stagger: 0.08 },
          0.34,
        );
    },
    { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true },
  );

  return (
    <section className="metric-section section" ref={root}>
      <div className="container">
        <div className="metric-panel">
          <div className="metric-number-wrap">
            <span className="metric-number">120</span>
            <p>Experimentos visuais · numero demonstrativo</p>
          </div>
          <ul className="metric-details">
            {panelStats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
