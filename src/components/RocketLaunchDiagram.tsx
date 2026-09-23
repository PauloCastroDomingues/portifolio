import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { addLaunchState } from "../motion/rocketLaunch";
import { useMotion } from "../motion/useMotion";

type RocketLaunchDiagramProps = {
  activeIndex: number;
  scrollDriven?: boolean;
};

export function RocketLaunchDiagram({ activeIndex, scrollDriven = false }: RocketLaunchDiagramProps) {
  const root = useRef<HTMLDivElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;
  const ambient = settings.loops && !reducedMotion && !scrollDriven;

  useGSAP(
    () => {
      if (!root.current || scrollDriven) return;
      const timeline = gsap.timeline();
      addLaunchState(timeline, root.current, activeIndex, 0, enabled ? 1.05 : 0, enabled ? "power3.inOut" : "none");

      if (!ambient) return;
      const float = gsap.to(gsap.utils.selector(root.current)(".rocket-assembly"), {
        y: `+=${activeIndex === 0 ? 2 : 5}`,
        duration: activeIndex === 0 ? 0.8 : 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      return () => float.kill();
    },
    { scope: root, dependencies: [activeIndex, enabled, ambient, scrollDriven], revertOnUpdate: false },
  );

  return (
    <div className={`launch-diagram launch-stage-${activeIndex + 1} ${ambient ? "is-ambient" : ""}`} ref={root}>
      <svg viewBox="0 0 520 520" aria-hidden="true">
        <g className="blueprint-frame">
          <path d="M42 52 H478 M42 454 H478 M42 52 V454 M478 52 V454" />
          <path d="M42 70 H56 M42 88 H50 M42 106 H56 M42 124 H50 M42 142 H56 M42 160 H50 M42 178 H56 M42 196 H50 M42 214 H56 M42 232 H50 M42 250 H56 M42 268 H50 M42 286 H56 M42 304 H50 M42 322 H56 M42 340 H50 M42 358 H56 M42 376 H50 M42 394 H56 M42 412 H50 M42 430 H56" />
          <path d="M74 454 V440 M110 454 V446 M146 454 V440 M182 454 V446 M218 454 V440 M254 454 V446 M290 454 V440 M326 454 V446 M362 454 V440 M398 454 V446 M434 454 V440" />
        </g>

        <g className="launch-grid-marks">
          {[92, 164, 236, 308, 380].map((y) => <line x1="42" x2="478" y1={y} y2={y} key={y} />)}
          <line x1="260" x2="260" y1="50" y2="446" />
          <circle cx="260" cy="238" r="92" />
          <path d="M156 238 H364 M260 134 V342" />
        </g>

        <g className="blueprint-copy">
          <text x="58" y="68">FLIGHT PLAN / P-03</text>
          <text x="397" y="68">SCALE 1:120</text>
          <text x="62" y="445">ALT 000 KM</text>
          <text x="399" y="445">T+ 00:00</text>
        </g>

        <g className="launch-stars">
          <circle cx="104" cy="96" r="2" /><circle cx="154" cy="142" r="1.5" />
          <circle cx="405" cy="82" r="2" /><circle cx="438" cy="184" r="1.5" />
          <circle cx="358" cy="64" r="1.5" /><circle cx="82" cy="214" r="1.5" />
        </g>

        <path className="route-base" d="M260 375 C248 305 258 244 296 202 C320 176 344 164 357 142" />
        <path className="route-flow" d="M260 375 C248 305 258 244 296 202 C320 176 344 164 357 142" />
        <path className="route-progress" d="M260 375 C248 305 258 244 296 202 C320 176 344 164 357 142" />

        <g className="orbit-system">
          <ellipse cx="356" cy="142" rx="94" ry="38" transform="rotate(-18 356 142)" />
          <ellipse cx="356" cy="142" rx="68" ry="26" transform="rotate(22 356 142)" />
          <circle className="orbit-target" cx="430" cy="112" r="8" />
          <circle cx="300" cy="172" r="4" />
          <path className="orbit-arrow" d="M412 164 L428 159 L419 147" />
          <path className="data-link" d="M358 142 L430 112" />
        </g>

        <g className="technical-callouts">
          <path d="M427 111 H466 V92" /><text x="390" y="86">TARGET ORBIT</text>
          <path d="M287 277 H346 L362 291" /><text x="365" y="295">DATA LINK</text>
          <path d="M253 371 H154 L139 357" /><text x="76" y="351">THRUST VECTOR</text>
        </g>

        <g className="launch-tower">
          <path d="M168 372 L168 214 L218 214 L218 372" />
          <path d="M168 246 L218 226 M168 282 L218 260 M168 318 L218 294 M168 354 L218 328" />
          <path d="M218 250 L240 250 M218 308 L240 308 M144 372 H306 M156 388 H294" />
          <path className="dimension-line" d="M145 214 H132 V372 H145 M126 214 H138 M126 372 H138" />
        </g>

        <g className="exhaust-clouds">
          <circle cx="221" cy="391" r="24" /><circle cx="253" cy="398" r="32" />
          <circle cx="290" cy="391" r="25" /><circle cx="318" cy="402" r="17" /><circle cx="188" cy="404" r="16" />
        </g>

        <g className="rocket-assembly">
          <g className="thrust-vector"><path d="M260 354 V424" /><path d="M251 414 L260 425 L269 414" /></g>
          <g className="flame">
            <path className="flame-outer" d="M245 354 C244 376 252 394 260 408 C269 392 277 376 275 354 Z" />
            <path className="flame-inner" d="M253 354 C253 372 257 383 260 390 C264 381 268 371 267 354 Z" />
          </g>
          <g className="booster-left"><path d="M236 314 L225 326 L225 354 L242 354 L244 320 Z" /></g>
          <g className="booster-right"><path d="M284 314 L295 326 L295 354 L278 354 L276 320 Z" /></g>
          <circle className="rocket-halo" cx="260" cy="284" r="24" />
          <path className="rocket-body" d="M260 238 C242 257 238 292 242 342 L278 342 C282 292 278 257 260 238 Z" />
          <path className="rocket-panel" d="M243 316 H277 L278 342 H242 Z" />
          <circle className="rocket-window" cx="260" cy="284" r="10" />
          <path className="rocket-axis" d="M260 244 V338" />
          <path className="rocket-fin-left" d="M243 314 L222 350 L243 340 Z" />
          <path className="rocket-fin-right" d="M277 314 L298 350 L277 340 Z" />
        </g>

        <g className="altitude-scale">
          <path d="M78 142 V370 M70 142 H86 M70 218 H86 M70 294 H86 M70 370 H86" />
          <g className="altitude-marker"><path d="M64 366 L78 358 L92 366 L78 374 Z" /></g>
        </g>

        <g className="telemetry" transform="translate(382 336)">
          <path className="telemetry-wave" d="M0 8 L12 8 L20 1 L28 17 L38 8 L50 8 L58 3 L66 13 L76 8 L92 8" />
          <path d="M0 74 H92" />
          <rect className="telemetry-bar-1" x="12" y="20" width="14" height="48" />
          <rect className="telemetry-bar-2" x="39" y="20" width="14" height="48" />
          <rect className="telemetry-bar-3" x="66" y="20" width="14" height="48" />
        </g>

        <g className="stage-meter"><path d="M42 474 H478" /><path className="stage-progress" d="M42 474 H478" /></g>
      </svg>
    </div>
  );
}
