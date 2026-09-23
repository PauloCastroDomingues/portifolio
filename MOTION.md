# MOTION

Os parametros editaveis ficam em `src/motion/config.ts`.

Valores principais:

- `durations.button`: respostas curtas de botoes, atualmente `0.22s`.
- `durations.reveal`: revelacoes de entrada, atualmente `0.84s`.
- `durations.card`: transicao dos cards expansivos, atualmente `0.66s`.
- `stagger`: intervalo entre itens revelados, atualmente `0.08s`.
- `scroll.scrub`: suavizacao moderada para timelines de rolagem, atualmente `0.65`.
- `scroll.storyDistanceDesktop`: percurso adicional da narrativa fixa, atualmente `2.65` alturas de viewport.
- `parallax.yPercent`: deslocamento interno das imagens, atualmente `8`.
- `parallax.scale`: escala visual das imagens em moldura, atualmente `1.16`.
- `lenis.lerp`: suavizacao discreta no desktop, atualmente `0.075`.

Regras de controle:

- `prefers-reduced-motion: reduce` desativa suavizacao, pins longos, parallax intenso e loops decorativos.
- `?debug=1` mostra o painel de teste com alternancia de animacoes, parallax e loops.
- O Lenis usa o ticker do GSAP como unico controlador de `raf`.
- ScrollTrigger anima filhos dos elementos fixados, preservando as medidas do pin.
