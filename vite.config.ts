import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

const portfolio = JSON.parse(
  readFileSync(new URL("./src/content/portfolio.json", import.meta.url), "utf8"),
) as {
  site: {
    title: string;
    description: string;
    url: string;
    themeColor: string;
    ogImage: string;
  };
};

const absoluteImage = new URL(portfolio.site.ogImage, portfolio.site.url).toString();

export default defineConfig({
  base: "/portifolio/",
  plugins: [
    react(),
    {
      name: "portfolio-head",
      transformIndexHtml(html) {
        return html
          .replaceAll("{{SITE_TITLE}}", portfolio.site.title)
          .replaceAll("{{SITE_DESCRIPTION}}", portfolio.site.description)
          .replaceAll("{{SITE_URL}}", portfolio.site.url)
          .replaceAll("{{THEME_COLOR}}", portfolio.site.themeColor)
          .replaceAll("{{OG_IMAGE}}", absoluteImage);
      },
    },
  ],
});
