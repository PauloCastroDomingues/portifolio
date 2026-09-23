import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Pause, Play } from "lucide-react";
import { content, serviceCards } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function ExpandingCards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  const userPaused = useRef(false);
  const { settings, reducedMotion } = useMotion();
  const desktop = typeof window === "undefined" ? true : window.innerWidth >= 760;
  const shouldRun = desktop && visible && settings.loops && !reducedMotion && !paused;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.35 },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldRun) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % serviceCards.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [shouldRun]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setPaused(true);
      else if (!userPaused.current) setPaused(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const togglePause = () => {
    userPaused.current = !paused;
    setPaused((value) => !value);
  };

  return (
    <section
      className="cards-section section"
      ref={root}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => {
        if (!userPaused.current) setPaused(false);
      }}
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{content.capabilities.eyebrow}</p>
            <h2>{content.capabilities.title}</h2>
          </div>
          <button className="icon-text-button" type="button" onClick={togglePause}>
            {paused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
            {paused ? "Retomar" : "Pausar"}
          </button>
        </div>
        <div className="expanding-cards" role="list">
          {serviceCards.map((card, index) => (
            <article
              className={`expanding-card ${active === index ? "is-active" : ""}`}
              key={card.title}
              role="listitem"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-expanded={active === index}
              >
                <span>{card.kicker}</span>
                <strong>{card.title}</strong>
                <ArrowDownRight aria-hidden="true" size={20} />
              </button>
              <div className="card-reveal" aria-hidden={active !== index}>
                <div className="card-image">
                  <img src={card.image} alt="" loading="lazy" />
                </div>
                <p>{card.description}</p>
                {active === index && shouldRun ? (
                  <span className="card-progress" key={index} aria-hidden="true" />
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
