import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const content = JSON.parse(readFileSync(resolve("src/content/portfolio.json"), "utf8"));

const required = [
  ["site.title", content.site?.title],
  ["site.description", content.site?.description],
  ["identity.name", content.identity?.name],
  ["hero.titleLineOne", content.hero?.titleLineOne],
  ["hero.titleLineTwo", content.hero?.titleLineTwo],
  ["story.steps", content.story?.steps?.length],
  ["projects", content.projects?.length],
  ["contact.primaryHref", content.contact?.primaryHref],
];

const missing = required.filter(([, value]) => !value).map(([field]) => field);
const invalidStorySteps = (content.story?.steps ?? []).flatMap((step, index) =>
  ["title", "code", "label", "metric", "description", "result"].flatMap((field) =>
    step[field] ? [] : [`story.steps[${index}].${field}`],
  ).concat(step.signals?.length ? [] : [`story.steps[${index}].signals`]),
);
const media = [
  content.site?.ogImage,
  content.hero?.media,
  content.visualStory?.wideMedia,
  content.visualStory?.largeMedia,
  content.visualStory?.smallMedia,
  ...(content.capabilities?.items ?? []).map((item) => item.media),
  ...(content.projects ?? []).map((project) => project.media),
].filter(Boolean);

const missingMedia = [...new Set(media)].filter(
  (path) => !existsSync(resolve("public", path)),
);

if (missing.length || missingMedia.length || invalidStorySteps.length) {
  if (missing.length) console.error(`Campos obrigatórios ausentes: ${missing.join(", ")}`);
  if (invalidStorySteps.length) console.error(`Campos dos estágios ausentes: ${invalidStorySteps.join(", ")}`);
  if (missingMedia.length) console.error(`Arquivos de mídia ausentes: ${missingMedia.join(", ")}`);
  process.exit(1);
}

console.log(`Conteúdo válido: ${content.projects.length} projetos e ${new Set(media).size} mídias.`);
