import { principles } from "../data/content";

export function MarqueeTestimonials() {
  return (
    <section className="principles-section section" id="principios" aria-labelledby="principles-title">
      <div className="container">
        <div className="principles-heading">
          <p className="section-kicker">Uma gestão clara</p>
          <h2 id="principles-title">Você entende o plano antes de investir.</h2>
        </div>
        <div className="principles-grid">
          {principles.map((principle, index) => (
            <article className="principle-card" key={principle.label}>
              <div className="principle-card-meta">
                <span>0{index + 1}</span>
                <span>{principle.label}</span>
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
