import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMotion } from "../motion/useMotion";

const launchStates = [
  {
    x: 0,
    y: 0,
    rotation: 0,
    routeOffset: 475,
    towerOpacity: 1,
    orbitOpacity: 0.12,
    flameScale: 0.7,
    cloudOpacity: 0.72,
  },
  {
    x: 18,
    y: -112,
    rotation: 7,
    routeOffset: 210,
    towerOpacity: 0.26,
    orbitOpacity: 0.42,
    flameScale: 1.45,
    cloudOpacity: 0.28,
  },
  {
    x: 56,
    y: -176,
    rotation: 28,
    routeOffset: 0,
    towerOpacity: 0.1,
    orbitOpacity: 1,
    flameScale: 0.82,
    cloudOpacity: 0.08,
  },
] as const;

export function RocketLaunchDiagram({ activeIndex }: { activeIndex: number }) {
  const root = useRef<HTMLDivElement>(null);
  const { settings, reducedMotion } = useMotion();
  const enabled = settings.animations && !reducedMotion;
  const ambient = settings.loops && !reducedMotion;

  useGSAP(
    () => {
      if (!root.current) return;
      const state = launchStates[activeIndex];
      const duration = enabled ? 0.9 : 0;
      const ease = enabled ? "power3.inOut" : "none";
      const timeline = gsap.timeline({ defaults: { duration, ease, overwrite: "auto" } });

      timeline
        .to(
          ".rocket-assembly",
          {
            x: state.x,
            y: state.y,
            rotation: state.rotation,
            svgOrigin: "260 310",
          },
          0,
        )
        .to(".route-progress", { strokeDashoffset: state.routeOffset }, 0)
        .to(".launch-tower", { autoAlpha: state.towerOpacity }, 0)
        .to(".orbit-system", { autoAlpha: state.orbitOpacity, scale: activeIndex === 2 ? 1 : 0.88, transformOrigin: "350px 145px" }, 0)
        .to(".flame", { scaleY: state.flameScale, transformOrigin: "center top" }, 0)
        .to(".exhaust-clouds", { autoAlpha: state.cloudOpacity, scale: activeIndex === 0 ? 1 : 1.22, transformOrigin: "260px 400px" }, 0)
        .to(".altitude-marker", { y: -activeIndex * 76 }, 0)
        .to(".stage-progress", { scaleX: (activeIndex + 1) / 3, transformOrigin: "left" }, 0)
        .to(".telemetry-bar-1", { scaleY: [0.42, 0.72, 0.9][activeIndex], transformOrigin: "center bottom" }, 0)
        .to(".telemetry-bar-2", { scaleY: [0.28, 0.86, 0.68][activeIndex], transformOrigin: "center bottom" }, 0)
        .to(".telemetry-bar-3", { scaleY: [0.56, 0.62, 1][activeIndex], transformOrigin: "center bottom" }, 0)
        .to(".booster-left", { x: activeIndex === 2 ? -24 : 0, y: activeIndex === 2 ? 46 : 0, rotation: activeIndex === 2 ? -18 : 0, autoAlpha: activeIndex === 2 ? 0.45 : 1 }, 0)
        .to(".booster-right", { x: activeIndex === 2 ? 24 : 0, y: activeIndex === 2 ? 46 : 0, rotation: activeIndex === 2 ? 18 : 0, autoAlpha: activeIndex === 2 ? 0.45 : 1 }, 0)
        .to(".orbit-target", { scale: activeIndex === 2 ? 1.3 : 0.8, transformOrigin: "center", autoAlpha: activeIndex === 2 ? 1 : 0.35 }, 0);

      if (!ambient) return;
      const float = gsap.to(".rocket-assembly", {
        y: `+=${activeIndex === 0 ? 2 : 5}`,
        duration: activeIndex === 0 ? 0.8 : 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      return () => float.kill();
    },
    { scope: root, dependencies: [activeIndex, enabled, ambient], revertOnUpdate: false },
  );

  return (
    <div
      className={`launch-diagram launch-stage-${activeIndex + 1} ${ambient ? "is-ambient" : ""}`}
      ref={root}
    >
      <svg viewBox="0 0 520 520" aria-hidden="true">
        <g className="launch-grid-marks">
          {[92, 164, 236, 308, 380].map((y) => (
            <line x1="42" x2="478" y1={y} y2={y} key={y} />
          ))}
          <line x1="260" x2="260" y1="50" y2="446" />
        </g>

        <g className="launch-stars">
          <circle cx="104" cy="96" r="3" />
          <circle cx="154" cy="142" r="2" />
          <circle cx="405" cy="82" r="3" />
          <circle cx="438" cy="184" r="2" />
          <circle cx="358" cy="64" r="2" />
          <circle cx="82" cy="214" r="2" />
        </g>

        <path className="route-base" d="M260 375 C248 305 258 244 296 202 C320 176 344 164 357 142" />
        <path className="route-progress" d="M260 375 C248 305 258 244 296 202 C320 176 344 164 357 142" />

        <g className="orbit-system">
          <ellipse cx="356" cy="142" rx="94" ry="38" transform="rotate(-18 356 142)" />
          <ellipse cx="356" cy="142" rx="68" ry="26" transform="rotate(22 356 142)" />
          <circle className="orbit-target" cx="430" cy="112" r="8" />
          <circle cx="300" cy="172" r="4" />
          <path className="orbit-arrow" d="M412 164 L428 159 L419 147" />
        </g>

        <g className="launch-tower">
          <path d="M168 372 L168 214 L218 214 L218 372" />
          <path d="M168 246 L218 226 M168 282 L218 260 M168 318 L218 294 M168 354 L218 328" />
          <path d="M218 250 L240 250 M218 308 L240 308" />
          <path d="M144 372 H306" />
          <path d="M156 388 H294" />
        </g>

        <g className="exhaust-clouds">
          <circle cx="221" cy="391" r="24" />
          <circle cx="253" cy="398" r="32" />
          <circle cx="290" cy="391" r="25" />
          <circle cx="318" cy="402" r="17" />
          <circle cx="188" cy="404" r="16" />
        </g>

        <g className="rocket-assembly">
          <g className="flame">
            <path className="flame-outer" d="M245 354 C244 376 252 394 260 408 C269 392 277 376 275 354 Z" />
            <path className="flame-inner" d="M253 354 C253 372 257 383 260 390 C264 381 268 371 267 354 Z" />
          </g>
          <g className="booster-left">
            <path d="M236 314 L225 326 L225 354 L242 354 L244 320 Z" />
          </g>
          <g className="booster-right">
            <path d="M284 314 L295 326 L295 354 L278 354 L276 320 Z" />
          </g>
          <path className="rocket-body" d="M260 238 C242 257 238 292 242 342 L278 342 C282 292 278 257 260 238 Z" />
          <path className="rocket-panel" d="M243 316 H277 L278 342 H242 Z" />
          <circle className="rocket-window" cx="260" cy="284" r="10" />
          <path className="rocket-axis" d="M260 244 V338" />
          <path className="rocket-fin-left" d="M243 314 L222 350 L243 340 Z" />
          <path className="rocket-fin-right" d="M277 314 L298 350 L277 340 Z" />
        </g>

        <g className="altitude-scale">
          <path d="M78 142 V370" />
          <path d="M70 142 H86 M70 218 H86 M70 294 H86 M70 370 H86" />
          <g className="altitude-marker">
            <path d="M64 366 L78 358 L92 366 L78 374 Z" />
          </g>
        </g>

        <g className="telemetry" transform="translate(382 336)">
          <path d="M0 74 H92" />
          <rect className="telemetry-bar-1" x="12" y="20" width="14" height="48" />
          <rect className="telemetry-bar-2" x="39" y="20" width="14" height="48" />
          <rect className="telemetry-bar-3" x="66" y="20" width="14" height="48" />
        </g>

        <g className="stage-meter">
          <path d="M42 454 H478" />
          <path className="stage-progress" d="M42 454 H478" />
        </g>
      </svg>
    </div>
  );
}
