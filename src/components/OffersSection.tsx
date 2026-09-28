import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import { gsap } from "gsap";
import { content } from "../data/content";
import { useMotion } from "../motion/useMotion";

function OfferCard({ type }: { type: "diagnostic" | "management" }) {
  const offer = content.offers[type];
  return (
    <article className={`offer-card ${type === "diagnostic" ? "offer-primary" : "offer-secondary"}`}>
      <div className="offer-card-head">
        <span className="offer-badge">{offer.badge}</span>
        <span className="offer-index">{type === "diagnostic" ? "01" : "02"}</span>
      </div>
      <div className="offer-copy">
        <h3>{offer.title}</h3>
        <p>{offer.description}</p>
      </div>
      <div className="offer-price">
        <small>{offer.pricePrefix}</small>
        <strong>{offer.price}</strong>
      </div>
      <ul className="offer-list">
        {offer.items.map((item) => (
          <li key={item}><Check aria-hidden="true" size={15} /><span>{item}</span></li>
        ))}
      </ul>
      <a className={type === "diagnostic" ? "button button-accent" : "button button-ghost"} href={offer.href} target="_blank" rel="noreferrer">
        {offer.cta}
        <ArrowUpRight aria-hidden="true" size={17} />
      </a>
    </article>
  );
}

export function OffersSection() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;

  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 72%", end: "center 42%", scrub: 0.65 },
      })
        .fromTo(".offers-head > *", { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 })
        .fromTo(".offer-flow span", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 }, 0.1)
        .fromTo(".offer-card", { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12 }, 0.22);
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <section className="section offers-section" id="oferta" ref={root}>
      <div className="container">
        <div className="offers-head section-head split-head">
          <div>
            <p className="eyebrow">{content.offers.eyebrow}</p>
            <h2>{content.offers.title}</h2>
          </div>
          <div className="offer-flow" aria-label="Entender, decidir, executar e otimizar">
            {content.offers.flow.map((item, index) => (
              <span key={item}>{item}{index < content.offers.flow.length - 1 ? <i aria-hidden="true">→</i> : null}</span>
            ))}
          </div>
        </div>
        <div className="offers-grid">
          <OfferCard type="diagnostic" />
          <OfferCard type="management" />
        </div>
      </div>
    </section>
  );
}
