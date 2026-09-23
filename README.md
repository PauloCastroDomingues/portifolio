# Portfólio · Paulo Castro Domingues

Portfólio profissional voltado a performance, dados e produto. A experiência
combina narrativa editorial, projetos reais, parallax, seções guiadas por
rolagem e uma estrutura de conteúdo simples de atualizar.

## Conteúdo e imagens

Os textos, links, projetos e metadados do `<head>` ficam centralizados em:

```text
src/content/portfolio.json
```

As fotografias ficam em:

```text
public/media/
```

Para trocar uma imagem, substitua o arquivo mantendo o nome. Para adicionar um
projeto ou alterar nomes de arquivos, consulte [`CONTENT.md`](CONTENT.md).

## Desenvolvimento

```bash
npm ci
npm run dev
```

URL local:

```text
http://127.0.0.1:5173/portifolio/
```

Modo de diagnóstico:

```text
http://127.0.0.1:5173/portifolio/?debug=1
```

## Verificação

```bash
npm run content:check
npm run typecheck
npm run lint
npm run build
```

O `content:check` valida os campos essenciais e confirma que todas as mídias
referenciadas existem antes do build.

## Stack

- React, TypeScript e Vite.
- GSAP, ScrollTrigger e `@gsap/react`.
- Lenis para suavização de rolagem no desktop.
- Lucide para ícones de interface.
- CSS próprio com comportamento responsivo e suporte a movimento reduzido.

## Movimento

- Hero com entrada por máscara, fotografia sobreposta e reorganização do título.
- Marquee pausável e princípios navegáveis manualmente.
- Lançamento de performance em três estágios, guiado por rolagem no desktop e
  por toque/teclado em tablets e celulares.
- Visual técnico em blueprint com trajetória contínua, telemetria, vetores e
  estágios sincronizados ao progresso da narrativa.
- Fotografias com cortina, escala e parallax interno independentes.
- Cards expansivos pausáveis e layout vertical no mobile.
- Cases com revelação progressiva e parallax individual.
- Painel de métricas aberto por `clip-path`, sem animar largura do layout.
- Fechamento revelado conforme a rolagem.

Os parâmetros estão documentados em [`MOTION.md`](MOTION.md).

## GitHub Pages

O Vite usa `base: "/portifolio/"`. Os workflows em `.github/workflows/` validam
pull requests e publicam a `main` pelo GitHub Pages.

No repositório, habilite uma vez:

```text
Settings > Pages > Source > GitHub Actions
```

Endereço de publicação:

```text
https://paulocastrodomingues.github.io/portifolio/
```

As fotografias e respectivas licenças estão em [`CREDITS.md`](CREDITS.md).
