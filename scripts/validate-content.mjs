import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const content = JSON.parse(readFileSync(resolve("src/content/portfolio.json"), "utf8"));
const casesEnabled = content.features?.cases !== false;

const required = [
  ["site.title", content.site?.title],
  ["site.description", content.site?.description],
  ["identity.name", content.identity?.name],
  ["hero.headline", content.hero?.headline],
  ["hero.primaryHref", content.hero?.primaryHref],
  ["hero.auditRows", content.hero?.auditRows?.length],
  ["solutions.items", content.solutions?.items?.length],
  ["about.title", content.about?.title],
  ["about.text", content.about?.text],
  ["about.skills", content.about?.skills?.length],
  ["story.steps", content.story?.steps?.length],
  ...(casesEnabled ? [["cases", content.cases?.length]] : []),
  ["contact.primaryHref", content.contact?.primaryHref],
];

const missing = required.filter(([, value]) => !value).map(([field]) => field);
const invalidStorySteps = (content.story?.steps ?? []).flatMap((step, index) =>
  ["title", "code", "label", "metric", "description", "result"].flatMap((field) =>
    step[field] ? [] : [`story.steps[${index}].${field}`],
  ).concat(step.signals?.length ? [] : [`story.steps[${index}].signals`]),
);
const invalidAuditRows = (content.hero?.auditRows ?? []).flatMap((row, index) =>
  ["signal", "question", "decision"].flatMap((field) =>
    row[field] ? [] : [`hero.auditRows[${index}].${field}`],
  ),
);
const invalidSolutions = (content.solutions?.items ?? []).flatMap((item, index) =>
  ["code", "kicker", "title", "description"].flatMap((field) =>
    item[field] ? [] : [`solutions.items[${index}].${field}`],
  ).concat(item.deliverables?.length ? [] : [`solutions.items[${index}].deliverables`]),
);
const media = [
  content.site?.ogImage,
  content.hero?.media,
  content.about?.media,
  content.visualStory?.wideMedia,
  content.visualStory?.largeMedia,
  content.visualStory?.smallMedia,
  ...(content.capabilities?.items ?? []).map((item) => item.media),
  ...(content.projects ?? []).map((project) => project.media),
].filter(Boolean);

const missingMedia = [...new Set(media)].filter(
  (path) => !existsSync(resolve("public", path)),
);

if (missing.length || missingMedia.length || invalidStorySteps.length || invalidAuditRows.length || invalidSolutions.length) {
  if (missing.length) console.error(`Campos obrigatórios ausentes: ${missing.join(", ")}`);
  if (invalidStorySteps.length) console.error(`Campos dos estágios ausentes: ${invalidStorySteps.join(", ")}`);
  if (invalidAuditRows.length) console.error(`Campos da leitura ausentes: ${invalidAuditRows.join(", ")}`);
  if (invalidSolutions.length) console.error(`Campos das soluções ausentes: ${invalidSolutions.join(", ")}`);
  if (missingMedia.length) console.error(`Arquivos de mídia ausentes: ${missingMedia.join(", ")}`);
  process.exit(1);
}

const casesStatus = casesEnabled
  ? `${content.cases.length} case(s) ativo(s)`
  : "cases inativos";
console.log(`Conteúdo válido: ${casesStatus} e ${new Set(media).size} mídias.`);
