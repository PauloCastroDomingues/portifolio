import portfolioContent from "../content/portfolio.json";

const mediaUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const mapMedia = <T extends { media: string }>(item: T) => ({
  ...item,
  image: mediaUrl(item.media),
});

export const content = portfolioContent;
export const navItems = portfolioContent.navigation;
export const principles = portfolioContent.principles;
export const storySteps = portfolioContent.story.steps;
export const serviceCards = portfolioContent.capabilities.items.map(mapMedia);
export const projects = portfolioContent.projects.map(mapMedia);
export const panelStats = portfolioContent.metrics.items;

export const photos = {
  hero: mediaUrl(portfolioContent.hero.media),
  wide: mediaUrl(portfolioContent.visualStory.wideMedia),
  splitLarge: mediaUrl(portfolioContent.visualStory.largeMedia),
  splitSmall: mediaUrl(portfolioContent.visualStory.smallMedia),
};
