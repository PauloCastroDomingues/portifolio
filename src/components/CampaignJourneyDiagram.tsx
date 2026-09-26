import { storySteps } from "../data/content";

type CampaignJourneyDiagramProps = { activeIndex: number };

export function CampaignJourneyDiagram({ activeIndex }: CampaignJourneyDiagramProps) {
  return (
    <div className="campaign-journey-visual" aria-hidden="true">
      <p className="campaign-journey-kicker">Fluxo de gestão</p>
      <ol className="campaign-journey-list">
        {storySteps.map((step, index) => (
          <li className={index === activeIndex ? "is-current" : index < activeIndex ? "is-complete" : ""} key={step.id}>
            <span className="campaign-journey-number">{step.code}</span>
            <span className="campaign-journey-node" />
            <span className="campaign-journey-step">
              <strong>{step.title}</strong>
              <small>{step.label}</small>
            </span>
          </li>
        ))}
      </ol>
      <div className="campaign-journey-foot">
        <span className="campaign-journey-dot" />
        <span>Etapa ativa</span>
        <strong>{storySteps[activeIndex].title}</strong>
      </div>
    </div>
  );
}
