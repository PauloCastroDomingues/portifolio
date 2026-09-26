import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { principles } from "../data/content";
import { motionConfig } from "../motion/config";
import { useMotion } from "../motion/useMotion";

export function MarqueeTestimonials() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(() => {
    if (!settings.animations || reducedMotion || !root.current) return;
    gsap.fromTo(".principles-heading", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: motionConfig.ease.reveal, scrollTrigger: { trigger: root.current, start: "top 78%" } });
    gsap.fromTo(".principle-card", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.14, ease: motionConfig.ease.reveal, scrollTrigger: { trigger: ".principles-grid", start: "top 82%" } });
  }, { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true });

  return (
    <section className="principles-section section" id="principios" aria-labelledby="principles-title" ref={root}>
      <div className="container">
        <div className="principles-heading"><p className="section-kicker">Uma gestão clara</p><h2 id="principles-title">Você entende o plano antes de investir.</h2></div>
        <div className="principles-grid">
          {principles.map((principle, index) => <article className="principle-card" key={principle.label}><div className="principle-card-meta"><span>0{index + 1}</span><span>{principle.label}</span></div><h3>{principle.title}</h3><p>{principle.body}</p></article>)}
        </div>
      </div>
    </section>
  );
}
