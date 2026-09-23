import { gsap } from "gsap";

export const launchStates = [
  { x: 0, y: 0, rotation: 0, routeOffset: 475, towerOpacity: 1, orbitOpacity: 0.1, flameScale: 0.68, cloudOpacity: 0.7, vectorOpacity: 0.18 },
  { x: 18, y: -112, rotation: 7, routeOffset: 205, towerOpacity: 0.24, orbitOpacity: 0.42, flameScale: 1.5, cloudOpacity: 0.25, vectorOpacity: 0.7 },
  { x: 56, y: -176, rotation: 28, routeOffset: 0, towerOpacity: 0.08, orbitOpacity: 1, flameScale: 0.82, cloudOpacity: 0.05, vectorOpacity: 1 },
] as const;

type LaunchScope = Element | null;

function addStateTweens(
  timeline: gsap.core.Timeline,
  scope: LaunchScope,
  index: number,
  position: number | string,
  duration: number,
  ease: string,
) {
  if (!scope) return timeline;
  const select = gsap.utils.selector(scope);
  const state = launchStates[index];
  const shared = { duration, ease, overwrite: "auto" as const };

  timeline
    .to(select(".rocket-assembly"), { ...shared, x: state.x, y: state.y, rotation: state.rotation, svgOrigin: "260 310" }, position)
    .to(select(".route-progress"), { ...shared, strokeDashoffset: state.routeOffset }, position)
    .to(select(".launch-tower"), { ...shared, autoAlpha: state.towerOpacity }, position)
    .to(select(".orbit-system"), { ...shared, autoAlpha: state.orbitOpacity, scale: index === 2 ? 1 : 0.88, transformOrigin: "350px 145px" }, position)
    .to(select(".flame"), { ...shared, scaleY: state.flameScale, transformOrigin: "center top" }, position)
    .to(select(".exhaust-clouds"), { ...shared, autoAlpha: state.cloudOpacity, scale: index === 0 ? 1 : 1.22, transformOrigin: "260px 400px" }, position)
    .to(select(".altitude-marker"), { ...shared, y: -index * 76 }, position)
    .to(select(".stage-progress"), { ...shared, scaleX: (index + 1) / 3, transformOrigin: "left" }, position)
    .to(select(".telemetry-bar-1"), { ...shared, scaleY: [0.42, 0.72, 0.9][index], transformOrigin: "center bottom" }, position)
    .to(select(".telemetry-bar-2"), { ...shared, scaleY: [0.28, 0.86, 0.68][index], transformOrigin: "center bottom" }, position)
    .to(select(".telemetry-bar-3"), { ...shared, scaleY: [0.56, 0.62, 1][index], transformOrigin: "center bottom" }, position)
    .to(select(".booster-left"), { ...shared, x: index === 2 ? -24 : 0, y: index === 2 ? 46 : 0, rotation: index === 2 ? -18 : 0, autoAlpha: index === 2 ? 0.35 : 1 }, position)
    .to(select(".booster-right"), { ...shared, x: index === 2 ? 24 : 0, y: index === 2 ? 46 : 0, rotation: index === 2 ? 18 : 0, autoAlpha: index === 2 ? 0.35 : 1 }, position)
    .to(select(".orbit-target"), { ...shared, scale: index === 2 ? 1.3 : 0.8, transformOrigin: "center", autoAlpha: index === 2 ? 1 : 0.32 }, position)
    .to(select(".thrust-vector"), { ...shared, autoAlpha: state.vectorOpacity, scaleY: index === 1 ? 1.18 : 1, transformOrigin: "center top" }, position)
    .to(select(".rocket-halo"), { ...shared, autoAlpha: index === 0 ? 0.12 : 0.7, scale: index === 2 ? 1.2 : 0.88, transformOrigin: "center" }, position)
    .to(select(".data-link"), { ...shared, autoAlpha: index === 2 ? 1 : 0.2 }, position);

  return timeline;
}

export function addLaunchState(
  timeline: gsap.core.Timeline,
  scope: LaunchScope,
  index: number,
  position: number | string,
  duration = 0.45,
  ease = "power2.inOut",
) {
  return addStateTweens(timeline, scope, index, position, duration, ease);
}

export function setLaunchState(scope: LaunchScope, index: number) {
  const timeline = gsap.timeline();
  addStateTweens(timeline, scope, index, 0, 0, "none");
  timeline.progress(1);
  return timeline;
}
