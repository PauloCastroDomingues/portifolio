export const motionConfig = {
  durations: {
    button: 0.22,
    reveal: 1.05,
    card: 0.72,
    panel: 1,
  },
  stagger: 0.09,
  ease: {
    standard: "power3.out",
    reveal: "power4.out",
    scroll: "none",
  },
  scroll: {
    scrub: 0.9,
    storyDistanceDesktop: 2.8,
    panelDistance: 1.35,
  },
  parallax: {
    yPercent: 10,
    scale: 1.12,
  },
  devices: {
    desktopMin: 900,
    pointerMin: 900,
    pinMinHeight: 680,
  },
  lenis: {
    lerp: 0.085,
    wheelMultiplier: 0.88,
  },
} as const;
