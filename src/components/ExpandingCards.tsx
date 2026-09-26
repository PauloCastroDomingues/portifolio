import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { content, serviceCards } from "../data/content";
import { useMotion } from "../motion/useMotion";
import { ParallaxImage } from "./ParallaxImage";

export function ExpandingCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const rafRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const { settings, reducedMotion } = useMotion();
  const count = serviceCards.length;
  const autoPlay = settings.animations && settings.loops && !reducedMotion && visible && !paused && count > 1;

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = (index + count) % count;
    const card = track.children.item(nextIndex) as HTMLElement | null;
    if (!card) return;
    activeRef.current = nextIndex;
    setActiveIndex(nextIndex);
    const trackLeft = track.getBoundingClientRect().left;
    const left = track.scrollLeft + card.getBoundingClientRect().left - trackLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
  }, [count, reducedMotion]);

  useEffect(() => {
    const root = trackRef.current?.parentElement;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => goTo(activeRef.current + 1), 6500);
    return () => window.clearInterval(timer);
  }, [autoPlay, goTo]);

  const syncActive = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;
      Array.from(track.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const delta = Math.abs(card.getBoundingClientRect().left + card.clientWidth / 2 - center);
        if (delta < distance) { closest = index; distance = delta; }
      });
      activeRef.current = closest;
      setActiveIndex(closest);
    });
  };

  return (
    <section className="cards-section section" id="canais" aria-labelledby="channels-title">
      <div className="container">
        <div className="section-heading channels-heading">
          <div><p className="section-kicker">{content.capabilities.eyebrow}</p><h2 id="channels-title">{content.capabilities.title}</h2></div>
          <p className="carousel-hint">Explore os canais e veja onde a estratégia pode chegar.</p>
        </div>
        <div className="channel-carousel" role="region" aria-roledescription="carousel" aria-label="Canais de anúncios">
          <div className="channel-track" ref={trackRef} onScroll={syncActive}>
            {serviceCards.map((card, index) => (
              <article className="channel-card" key={card.title} role="group" aria-roledescription="slide" aria-label={(index + 1) + " de " + count}>
                <ParallaxImage className="channel-card-image" src={card.image} alt="" intensity={0.42} />
                <div className="channel-card-copy">
                  <div className="channel-card-meta"><span>0{index + 1}</span><span>ANÚNCIOS</span></div>
                  <h3>{card.title}</h3><p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="channel-carousel-controls">
            <div className="channel-carousel-buttons">
              <button type="button" className="carousel-arrow" aria-label="Canal anterior" onClick={() => goTo(activeIndex - 1)}><ArrowLeft size={19} aria-hidden="true" /></button>
              <button type="button" className="carousel-arrow" aria-label="Próximo canal" onClick={() => goTo(activeIndex + 1)}><ArrowRight size={19} aria-hidden="true" /></button>
              <button type="button" className="carousel-toggle" aria-label={paused ? "Retomar movimento automático" : "Pausar movimento automatico"} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}<span>{paused ? "Reproduzir" : "Pausar"}</span></button>
            </div>
            <div className="channel-carousel-dots" aria-label="Escolher canal">
              {serviceCards.map((card, index) => <button key={card.title} type="button" aria-label={'Ir para canal ' + (index + 1)} aria-current={activeIndex === index ? "true" : undefined} onClick={() => goTo(index)} />)}
            </div>
            <span className="carousel-count">{String(activeIndex + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
