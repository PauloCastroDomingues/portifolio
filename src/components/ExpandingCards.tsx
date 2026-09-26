import { content, serviceCards } from "../data/content";

export function ExpandingCards() {
  return (
    <section className="cards-section section" id="canais" aria-labelledby="channels-title">
      <div className="container">
        <div className="section-heading channels-heading">
          <div>
            <p className="section-kicker">{content.capabilities.eyebrow}</p>
            <h2 id="channels-title">{content.capabilities.title}</h2>
          </div>
        </div>
        <div className="channel-grid">
          {serviceCards.map((card, index) => (
            <article className="channel-card" key={card.title}>
              <div className="card-image">
                <img src={card.image} alt="" loading="lazy" />
              </div>
              <div className="channel-card-copy">
                <div className="channel-card-meta"><span>0{index + 1}</span><span>ANÚNCIOS</span></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
