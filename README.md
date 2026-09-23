# STUDIO 01 · Landing Motion Demo

Landing page demonstrativa criada para o repositorio `portifolio`, com conteudo ficticio em portugues brasileiro e foco em movimento editorial, parallax, narrativa fixa e controles de teste.

## Stack

- React + TypeScript + Vite.
- GSAP com ScrollTrigger e `@gsap/react`.
- Lenis para suavizacao discreta no desktop.
- CSS proprio com variaveis centralizadas de cor e parametros de movimento em `src/motion/config.ts`.

## Rodar localmente

```bash
npm ci
npm run dev
```

URL local padrao:

```text
http://127.0.0.1:5173/portifolio/
```

Modo de teste:

```text
http://127.0.0.1:5173/portifolio/?debug=1
```

## Scripts

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Mapa da demo

- Abertura: titulo que se reorganiza na rolagem, escultura abstrata azul, camadas com profundidade e resposta discreta ao ponteiro.
- Faixa e depoimentos: marquee tipografico pausavel e carrossel manual com transicao.
- Experiencia: secao fixa em desktop com tres etapas, diagrama SVG original e animacao ambiente.
- Fotografias: dois blocos com parallax real por imagem interna em moldura recortada.
- Cards: quatro cards expansivos com autoplay pausavel no desktop e acordeao vertical no mobile.
- Projetos: tres projetos ficticios com detalhe acessivel dentro da pagina.
- Painel 120: fundo azul expansivo que reorganiza numero e informacoes na rolagem.
- Fechamento: painel claro com recuos laterais revelando o rodape azul profundo.

## Publicacao no GitHub Pages

O Vite esta configurado com:

```ts
base: "/portifolio/"
```

Os workflows incluidos fazem:

- `pull-request.yml`: instala pelo lockfile, roda typecheck, lint e build em PRs para `main`.
- `pages.yml`: apos push em `main` ou disparo manual, instala pelo lockfile, roda typecheck, lint, build e publica `dist` com as acoes oficiais do GitHub Pages.

Quando necessario, habilite no GitHub:

```text
Settings > Pages > Source > GitHub Actions
```

Endereco esperado apos merge, workflow concluido e Pages habilitado:

```text
https://paulocastrodomingues.github.io/portifolio/
```

## Creditos e aviso

As fotografias usadas estao documentadas em `CREDITS.md`.

Projetos, depoimentos e numeros sao ficticios e servem apenas para demonstracao de interface.
