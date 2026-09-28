import { MessageCircle } from "lucide-react";
import { content } from "../data/content";

export function FloatingCta() {
  return (
    <a
      className="floating-cta"
      href={content.contact.primaryHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com Paulo pelo WhatsApp"
    >
      <MessageCircle aria-hidden="true" size={19} />
      <span>Falar com Paulo</span>
    </a>
  );
}
