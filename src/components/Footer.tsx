import { content } from "../data/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>{content.footer.signature}</strong>
          <p>{content.footer.note}</p>
        </div>
        <nav aria-label="Links do rodapé">
          {content.features.cases && <a href="#cases">Cases</a>}
          <a href="#sobre">Sobre</a>
          <a href="#solucoes">Soluções</a>
          <a href="#processo">Processo</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="footer-contact">
          <a href={content.footer.sourceHref} target="_blank" rel="noreferrer">{content.footer.sourceLabel}</a>
          <span>© {new Date().getFullYear()} Paulo Castro</span>
        </div>
      </div>
    </footer>
  );
}
