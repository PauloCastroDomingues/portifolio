import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { content, projects } from "../data/content";
import { useMotion } from "../motion/useMotion";
import { ParallaxImage } from "./ParallaxImage";

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const { settings, reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!settings.animations || reducedMotion) return;

      gsap.fromTo(
        ".project-card",
        { y: 96, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.14,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        },
      );
    },
    { scope: root, dependencies: [settings.animations, reducedMotion], revertOnUpdate: true },
  );

  return (
    <section className="projects section" id="projetos" ref={root}>
      <div className="container">
        <div className="section-heading projects-heading">
          <div>
            <p className="section-kicker">{content.projectsSection.eyebrow}</p>
            <h2>{content.projectsSection.title}</h2>
          </div>
          <span>{String(projects.length).padStart(2, "0")} CASES</span>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.cta}: ${project.title}`}>
                <ParallaxImage
                  className="project-image"
                  src={project.image}
                  alt={project.alt}
                  intensity={index % 2 === 0 ? 0.75 : 1}
                />
              </a>
              <div className="project-body">
                <div className="project-meta">
                  <p>{project.category}</p>
                  <span>0{index + 1}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <ul className="project-tags" aria-label="Tecnologias e temas">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
                  {project.cta}
                  <ArrowUpRight aria-hidden="true" size={19} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
