import glassCornell from "../assets/images/glass-cornell.jpg";
import concreteAkron from "../assets/images/concrete-akron.jpg";
import facadeRio from "../assets/images/facade-rio.jpg";
import tunnelAmsterdam from "../assets/images/concrete-tunnel-amsterdam.jpg";
import nordelecSkylight from "../assets/images/nordelec-skylight.jpg";

export const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "experiencia", label: "Experiencia" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;

export const photos = {
  glassCornell,
  concreteAkron,
  facadeRio,
  tunnelAmsterdam,
  nordelecSkylight,
};

export const testimonials = [
  {
    quote:
      "A demo mostra como narrativa e interface podem se mover sem perder clareza.",
    author: "Cliente demonstrativo A",
    role: "Direcao de marca ficticia",
  },
  {
    quote:
      "Os estados de rolagem ajudam a apresentar conceitos abstratos com ritmo.",
    author: "Cliente demonstrativo B",
    role: "Produto experimental ficticio",
  },
  {
    quote:
      "O movimento vira parte da leitura, nao apenas uma camada decorativa.",
    author: "Cliente demonstrativo C",
    role: "Conteudo e experiencia ficticios",
  },
];

export const storySteps = [
  {
    id: "explorar",
    title: "Explorar",
    description: "Observe as possibilidades.",
  },
  {
    id: "conectar",
    title: "Conectar",
    description: "Encontre relacoes entre as partes.",
  },
  {
    id: "evoluir",
    title: "Evoluir",
    description: "De forma ao proximo movimento.",
  },
];

export const serviceCards = [
  {
    title: "Direcao",
    kicker: "01",
    image: photos.facadeRio,
    description:
      "Construimos uma linha visual para que cada decisao pareca intencional.",
  },
  {
    title: "Interface",
    kicker: "02",
    image: photos.glassCornell,
    description:
      "Transformamos conteudo em superficies claras, escaneaveis e responsivas.",
  },
  {
    title: "Movimento",
    kicker: "03",
    image: photos.concreteAkron,
    description:
      "Criamos transicoes que explicam mudancas de estado e profundidade.",
  },
  {
    title: "Experiencia",
    kicker: "04",
    image: photos.nordelecSkylight,
    description:
      "Conectamos ritmo, leitura e acao em uma jornada coerente.",
  },
];

export const projects = [
  {
    title: "Atlas Linear",
    category: "Sistema editorial",
    image: photos.concreteAkron,
    alt: "Estrutura arquitetonica abstrata em concreto e ceu azul.",
    detail:
      "Projeto demonstrativo para explorar hierarquia, ritmo de rolagem e modulos editoriais.",
  },
  {
    title: "Campo Vidro",
    category: "Interface imersiva",
    image: photos.glassCornell,
    alt: "Fachada de vidro com reflexos e linhas verticais.",
    detail:
      "Estudo ficticio de paineis com camadas, transparencia e estados progressivos.",
  },
  {
    title: "Nucleo Frio",
    category: "Narrativa visual",
    image: photos.tunnelAmsterdam,
    alt: "Tunel urbano em concreto com perspectiva profunda.",
    detail:
      "Ensaio demonstrativo sobre profundidade, contraste e revelacao por mascara.",
  },
];

export const panelStats = [
  "36 prototipos visuais simulados",
  "14 variacoes de fluxo ficticias",
  "5 camadas de interacao revisadas",
];
