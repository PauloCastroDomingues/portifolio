import { photos } from "../data/content";
import { ParallaxImage } from "./ParallaxImage";

export function PhotoBlocks() {
  return (
    <section className="photo-blocks section" aria-label="Composicoes fotograficas">
      <div className="wide-photo">
        <ParallaxImage
          src={photos.facadeRio}
          alt="Fachada geometrica modernista em concreto no Rio de Janeiro."
        />
        <div className="wide-photo-caption">
          <p className="section-kicker">Materia e ritmo</p>
          <h2>Imagens em camadas, texto em outra velocidade.</h2>
        </div>
      </div>
      <div className="container split-photo">
        <div>
          <p className="section-kicker">Parallax real</p>
          <h2>O conteudo rola; a fotografia respira dentro da moldura.</h2>
        </div>
        <ParallaxImage
          className="split-photo-large"
          src={photos.tunnelAmsterdam}
          alt="Tunel de concreto com linhas profundas em Amsterdam."
        />
        <ParallaxImage
          className="split-photo-small"
          src={photos.nordelecSkylight}
          alt="Corredor com claraboia, sombras e linhas geometricas."
        />
      </div>
    </section>
  );
}
