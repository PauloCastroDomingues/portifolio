# Guia de conteúdo

Todo o conteúdo editorial e de SEO fica em um único arquivo:

```text
src/content/portfolio.json
```

Edite esse arquivo para trocar nome, posicionamento, textos, navegação, projetos,
links, métricas e informações que aparecem no `<head>` da página. O build valida
os campos essenciais e interrompe a publicação se alguma imagem referenciada não
existir.

## Fotografias

As imagens ficam em `public/media/`. Para trocar uma foto sem tocar no código,
substitua o arquivo mantendo o mesmo nome. Formatos recomendados:

| Arquivo | Uso | Proporção recomendada |
| --- | --- | --- |
| `hero.jpg` | abertura e compartilhamento social | 16:10, mínimo 1800 px |
| `performance-wide.jpg` | faixa fotográfica ampla | 16:9, mínimo 2000 px |
| `project-launch.jpg` | projeto e composição vertical | 4:5, mínimo 1400 px |
| `project-commerce.jpg` | projeto comercial | 4:5, mínimo 1400 px |
| `project-discovery.jpg` | projeto e detalhe vertical | 4:5, mínimo 1400 px |

Também é possível adicionar novos arquivos e alterar o campo `media` do projeto
no JSON. Use caminhos no formato `media/nome-do-arquivo.jpg`.

## Novo projeto

Duplique um item dentro de `projects` e edite `title`, `category`, `media`, `alt`,
`summary`, `tags`, `href` e `cta`. Não remova as chaves do objeto.

## Validação

```bash
npm run content:check
npm run build
```

Depois do commit na `main`, o workflow do GitHub Pages publica a nova versão.
