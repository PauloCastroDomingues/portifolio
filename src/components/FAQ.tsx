import { useState } from "react";
import { Plus } from "lucide-react";
import { content, faqItems } from "../data/content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq-section">
      <div className="container faq-layout">
        <div className="faq-head">
          <p className="eyebrow">{content.faq.eyebrow}</p>
          <h2>{content.faq.title}</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const expanded = open === index;
            const panelId = `faq-panel-${index}`;
            return (
              <article className={`faq-item ${expanded ? "is-open" : ""}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <span><small>0{index + 1}</small>{item.question}</span>
                    <Plus aria-hidden="true" size={20} />
                  </button>
                </h3>
                <div className="faq-answer" id={panelId} aria-hidden={!expanded}>
                  <div><p>{item.answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
