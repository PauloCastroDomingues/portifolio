import { MessageCircle } from "lucide-react";
import { content } from "../data/content";

export function FloatingCta() {
  return (
    <a
      className="floating-cta"
      href={content.contact.primaryHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Pedir diagnóstico gratuito pelo WhatsApp"
    >
      <MessageCircle aria-hidden="true" size={20} />
      <span>Pedir diagnóstico</span>
    </a>
  );
}
