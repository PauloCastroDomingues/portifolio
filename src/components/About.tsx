import { ArrowDownRight } from "lucide-react";
import { content } from "../data/content";

export function About() {
  return (
    <section className="about-section section" id="sobre">
      <div className="container about-grid">
        <div>
          <p className="section-kicker">Sobre</p>
          <h2>{content.about.title}</h2>
        </div>
        <div className="about-copy">
          <p>{content.about.text}</p>
          <a className="text-link" href={content.contact.primaryHref} target="_blank" rel="noreferrer">
            {content.contact.primaryLabel}
            <ArrowDownRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
