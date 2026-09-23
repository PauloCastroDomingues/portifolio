import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { projects } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const { settings, reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!settings.animations || reducedMotion) {
        return;
      }
      gsap.fromTo(
        ".project-card",
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
          },
        },
      );
      gsap.fromTo(
        ".project-card img",
        { scale: 1.16, clipPath: "inset(18% 0 0 0)" },
        {
          scale: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
          },
        },
      );
    },
    { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true },
  );

  return (
    <section className="projects section" id="projetos" ref={root}>
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Projetos demonstrativos</p>
          <h2>Composicoes ficticias para testar comportamento visual.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <img src={project.image} alt={project.alt} loading="lazy" />
              </div>
              <div className="project-body">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <button
                  type="button"
                  aria-expanded={open === index}
                  aria-controls={`project-detail-${index}`}
                  onClick={() => setOpen((value) => (value === index ? null : index))}
                >
                  Ver detalhe <span aria-hidden="true">→</span>
                </button>
                <div
                  className="project-detail"
                  id={`project-detail-${index}`}
                  hidden={open !== index}
                >
                  {project.detail}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
