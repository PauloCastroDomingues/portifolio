import { useEffect, useRef, useState } from "react";
import { serviceCards } from "../data/content";
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
    if (root.current) {
      observer.observe(root.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldRun) {
      return;
    }
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % serviceCards.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [shouldRun]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        setPaused(true);
      } else if (!userPaused.current) {
        setPaused(false);
      }
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
        if (!userPaused.current) {
          setPaused(false);
        }
      }}
    >
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Competencias ficticias</p>
          <h2>Quatro cards redistribuem espaco conforme a escolha.</h2>
          <button className="text-button" type="button" onClick={togglePause}>
            {paused ? "Retomar alternancia" : "Pausar alternancia"}
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
              </button>
              <div className="card-reveal" aria-hidden={active !== index}>
                <img src={card.image} alt="" loading="lazy" />
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
