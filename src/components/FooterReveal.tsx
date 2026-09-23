import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMotion } from "../motion/useMotion";

export function FooterReveal() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!settings.animations || reducedMotion) {
        return;
      }
      gsap.fromTo(
        ".closing-panel",
        { marginInline: 0, borderRadius: 0 },
        {
          marginInline: "clamp(18px, 5vw, 92px)",
          borderRadius: 28,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            end: "bottom bottom",
            scrub: 0.7,
          },
        },
      );
    },
    { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true },
  );

  return (
    <footer className="footer-reveal" id="contato" ref={root}>
      <div className="closing-panel">
        <div className="container closing-grid">
          <div>
            <p className="section-kicker">Fechamento</p>
            <h2>O proximo movimento comeca aqui.</h2>
          </div>
          <a className="button button-dark" href="#inicio">
            Voltar ao inicio
          </a>
        </div>
      </div>
      <div className="footer-base">
        <div className="container footer-grid">
          <p>STUDIO 01 · projeto demonstrativo.</p>
          <p>Projetos, depoimentos e numeros sao ficticios.</p>
          <a href="https://github.com/PauloCastroDomingues/portifolio">
            Repositorio no GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
