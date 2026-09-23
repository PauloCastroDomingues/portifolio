import { useState } from "react";
import { testimonials } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function MarqueeTestimonials() {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const { settings, reducedMotion } = useMotion();
  const testimonial = testimonials[index];
  const marqueePaused = paused || !settings.loops || reducedMotion;

  const go = (direction: number) => {
    setIndex((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="ticker-section section" aria-label="Faixa e depoimentos">
      <div className="marquee-shell">
        <div className={`marquee ${marqueePaused ? "is-paused" : ""}`}>
          {[0, 1].map((group) => (
            <div className="marquee-track" key={group} aria-hidden={group === 1}>
              <span>FORMA</span>
              <span>CAMPO</span>
              <span>FLUXO</span>
              <span>NUCLEO</span>
            </div>
          ))}
        </div>
        <button
          className="text-button"
          type="button"
          onClick={() => setPaused((value) => !value)}
        >
          {marqueePaused ? "Retomar faixa" : "Pausar faixa"}
        </button>
      </div>

      <div className="container testimonial-grid">
        <p className="section-kicker">Vozes simuladas</p>
        <article className="testimonial-card" aria-live="polite">
          <div className="testimonial-slide" key={testimonial.author}>
            <blockquote>{testimonial.quote}</blockquote>
            <p>
              {testimonial.author}
              <span>{testimonial.role}</span>
            </p>
          </div>
          <div className="testimonial-controls">
            <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior">
              <span aria-hidden="true">‹</span>
            </button>
            <span>
              {index + 1} / {testimonials.length}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Proximo depoimento">
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
