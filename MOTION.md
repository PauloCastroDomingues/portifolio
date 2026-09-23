# Movimento

Os parâmetros globais ficam em `src/motion/config.ts`.

## Valores principais

- `durations.reveal`: entrada por máscara e cortina, `1.05s`.
- `durations.card`: redistribuição dos cards, `0.72s`.
- `stagger`: intervalo entre itens, `0.09s`.
- `scroll.scrub`: suavização das timelines ligadas à rolagem, `0.9`.
- `scroll.storyDistanceDesktop`: percurso da narrativa fixa, `2.8` viewports.
- `scroll.panelDistance`: abertura do painel azul, `1.35` viewports.
- `parallax.yPercent`: deslocamento-base interno das imagens, `10`.
- `parallax.scale`: escala-base das fotografias, `1.12`.
- `lenis.lerp`: interpolação da rolagem no desktop, `0.085`.

Cada `ParallaxImage` aceita `intensity`, multiplicando o deslocamento-base sem
alterar o componente.

## Regras

- `prefers-reduced-motion: reduce` desativa suavização, pins longos, parallax e loops.
- `?debug=1` mostra controles para animações, parallax e loops.
- O Lenis usa o ticker do GSAP como controlador único de `requestAnimationFrame`.
- ScrollTrigger anima filhos dos elementos fixados e usa `matchMedia` para não
  criar pin em telas pequenas ou baixas.
- Imagens revelam por cortina e escala antes de iniciar o deslocamento de parallax.
- O painel de métricas usa `clip-path`; nenhuma largura do layout é recalculada.
