import { content, photos } from "../data/content";
import { ParallaxImage } from "./ParallaxImage";

export function PhotoBlocks() {
  const visual = content.visualStory;

  return (
    <section className="photo-blocks section" aria-label="Narrativa visual de performance">
      <div className="wide-photo">
        <ParallaxImage src={photos.wide} alt={visual.wideAlt} intensity={1.25} />
        <div className="wide-photo-caption">
          <p className="section-kicker">{visual.wideEyebrow}</p>
          <h2>{visual.wideTitle}</h2>
          <span className="caption-index" aria-hidden="true">02 / 05</span>
        </div>
      </div>

      <div className="container split-photo">
        <div className="split-photo-copy">
          <p className="section-kicker">{visual.splitEyebrow}</p>
          <h2>{visual.splitTitle}</h2>
          <p className="split-support">
            Visão geral, recorte e evidência convivem sem competir pela atenção.
          </p>
        </div>
        <ParallaxImage
          className="split-photo-large"
          src={photos.splitLarge}
          alt={visual.largeAlt}
          intensity={1.15}
        />
        <ParallaxImage
          className="split-photo-small"
          src={photos.splitSmall}
          alt={visual.smallAlt}
          intensity={0.75}
        />
      </div>
    </section>
  );
}
