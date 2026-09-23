import { useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { content, principles } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function MarqueeTestimonials() {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const { settings, reducedMotion } = useMotion();
  const principle = principles[index];
  const marqueePaused = paused || !settings.loops || reducedMotion;

  const go = (direction: number) => {
    setIndex((value) => (value + direction + principles.length) % principles.length);
  };

  return (
    <section className="ticker-section section" id="principios" aria-label="Princípios de trabalho">
      <div className="marquee-shell">
        <div className={`marquee ${marqueePaused ? "is-paused" : ""}`}>
          {[0, 1].map((group) => (
            <div className="marquee-track" key={group} aria-hidden={group === 1}>
              {content.ticker.map((item) => (
                <span key={`${group}-${item}`}>{item}<i aria-hidden="true" /></span>
              ))}
            </div>
          ))}
        </div>
        <button
          className="icon-text-button"
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={marqueePaused ? "Retomar faixa" : "Pausar faixa"}
        >
          {marqueePaused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
          {marqueePaused ? "Retomar" : "Pausar"}
        </button>
      </div>

      <div className="container testimonial-grid">
        <div className="principle-aside">
          <p className="section-kicker">Princípios de trabalho</p>
          <span>Clareza antes de efeito. Contexto antes de conclusão.</span>
        </div>
        <article className="testimonial-card" aria-live="polite">
          <div className="testimonial-slide" key={principle.title}>
            <p className="principle-label">{principle.label}</p>
            <h2>{principle.title}</h2>
            <p className="principle-body">{principle.body}</p>
          </div>
          <div className="testimonial-controls">
            <button type="button" onClick={() => go(-1)} aria-label="Princípio anterior">
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <span>{String(index + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => go(1)} aria-label="Próximo princípio">
              <ChevronRight aria-hidden="true" size={20} />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
