import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { content, panelStats } from "../data/content";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function ExpandingPanel() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!settings.animations || reducedMotion || !root.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: () => `+=${window.innerHeight * motionConfig.scroll.panelDistance}`,
          scrub: motionConfig.scroll.scrub,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".metric-panel",
        { clipPath: "inset(0 58% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", ease: "none" },
        0,
      )
        .fromTo(
          ".metric-panel-inner",
          { xPercent: -8 },
          { xPercent: 0, ease: "none" },
          0,
        )
        .to(
          ".metric-number",
          { scale: 0.54, xPercent: -10, transformOrigin: "left center", ease: "none" },
          0,
        )
        .fromTo(
          ".metric-details li",
          { autoAlpha: 0, x: 52 },
          { autoAlpha: 1, x: 0, stagger: 0.08, ease: "power3.out" },
          0.35,
        );
    },
    { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true },
  );

  return (
    <section className="metric-section section" ref={root}>
      <div className="container metric-shell">
        <div className="metric-panel">
          <div className="metric-panel-inner">
            <div className="metric-number-wrap">
              <span className="metric-number">{content.metrics.number}</span>
              <p>{content.metrics.label}</p>
            </div>
            <ul className="metric-details">
              {panelStats.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <span className="metric-corner" aria-hidden="true">PUBLIC / WORK</span>
        </div>
      </div>
    </section>
  );
}
