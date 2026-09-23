import { useEffect, useRef, useState } from "react";
import { navItems } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { useMotion } from "../motion/useMotion";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navItems.map((item) => item.id));
  const { setSection, setStep } = useMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSection(active);
    if (active === "inicio") {
      setStep("abertura");
    } else if (active === "projetos") {
      setStep("projetos");
    } else if (active === "contato") {
      setStep("fechamento");
    }
  }, [active, setSection, setStep]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key !== "Tab" || !focusable?.length) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const nav = (
    <>
      {navItems.map((item) => (
        <a
          aria-current={active === item.id ? "page" : undefined}
          href={`#${item.id}`}
          key={item.id}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="STUDIO 01, ir ao inicio">
          STUDIO 01
        </a>
        <nav className="desktop-nav" aria-label="Navegacao principal">
          {nav}
        </nav>
        <a className="header-cta" href="#experiencia">
          Explorar demo
        </a>
        <button
          ref={buttonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span className="sr-only">Abrir menu</span>
        </button>
      </header>

      <div
        className={`mobile-menu ${open ? "is-open" : ""}`}
        id="mobile-menu"
        ref={panelRef}
        aria-hidden={!open}
      >
        <nav aria-label="Navegacao movel">{nav}</nav>
        <a className="header-cta" href="#experiencia" onClick={() => setOpen(false)}>
          Explorar demo
        </a>
      </div>

      <nav className="side-dots" aria-label="Navegacao por secoes">
        {navItems.map((item) => (
          <a
            className={active === item.id ? "is-active" : ""}
            href={`#${item.id}`}
            key={item.id}
            aria-label={`Ir para ${item.label}`}
          />
        ))}
      </nav>
    </>
  );
}
