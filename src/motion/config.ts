export const motionConfig = {
  durations: {
    button: 0.22,
    reveal: 0.84,
    card: 0.66,
    panel: 1,
  },
  stagger: 0.08,
  ease: {
    standard: "power3.out",
    scroll: "none",
  },
  scroll: {
    scrub: 0.65,
    storyDistanceDesktop: 2.65,
    panelDistance: 1.25,
  },
  parallax: {
    yPercent: 8,
    scale: 1.16,
  },
  devices: {
    desktopMin: 900,
    pointerMin: 900,
    pinMinHeight: 680,
  },
  lenis: {
    lerp: 0.075,
    wheelMultiplier: 0.9,
  },
} as const;
