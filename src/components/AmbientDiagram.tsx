import { storySteps } from "../data/content";
import { useMotion } from "../motion/useMotion";

export function AmbientDiagram({ activeIndex }: { activeIndex: number }) {
  const { settings, reducedMotion } = useMotion();
  const animate = settings.loops && !reducedMotion;

  return (
    <div className={`diagram diagram-${storySteps[activeIndex].id} ${animate ? "is-ambient" : ""}`}>
      <svg viewBox="0 0 520 520" aria-hidden="true">
        <g className="cube-lines">
          <path d="M116 156 L236 92 L378 150 L380 308 L238 386 L112 314 Z" />
          <path d="M116 156 L238 224 L378 150" />
          <path d="M238 224 L238 386" />
          <path d="M238 224 L112 314" />
        </g>
        <g className="network">
          <circle cx="260" cy="250" r="124" />
          <circle cx="260" cy="250" r="72" />
          <path d="M160 178 C238 122 334 128 386 205" />
          <path d="M150 294 C238 374 352 348 394 258" />
          <path d="M260 126 L332 310 L155 214 L365 214 L188 310 Z" />
        </g>
        <g className="planes">
          <path d="M118 314 L238 180 L408 208 L292 360 Z" />
          <path d="M88 250 L210 136 L382 162 L260 300 Z" />
          <path d="M162 382 L278 248 L430 276 L316 414 Z" />
          <path d="M210 136 L292 360" />
          <path d="M382 162 L162 382" />
        </g>
        {[116, 238, 378, 260, 332, 188, 408, 292].map((value, index) => (
          <circle
            className="diagram-dot"
            cx={index % 2 === 0 ? value : value + 22}
            cy={index % 2 === 0 ? 170 + index * 18 : 110 + index * 28}
            r="5"
            key={`${value}-${index}`}
          />
        ))}
        <circle className="travel-dot" cx="116" cy="156" r="7" />
      </svg>
    </div>
  );
}
