import { useMemo, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { MotionContext } from "./motionState";
import type { MotionSettings } from "./motionState";

const isDebugUrl = () =>
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("debug") === "1";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const debugEnabled = isDebugUrl();
  const [settings, setSettings] = useState<MotionSettings>({
    animations: true,
    parallax: true,
    loops: true,
  });
  const [section, setSection] = useState("inicio");
  const [step, setStep] = useState("abertura");

  const value = useMemo(
    () => ({
      debugEnabled,
      reducedMotion,
      settings,
      section,
      step,
      setSettings,
      setSection,
      setStep,
    }),
    [debugEnabled, reducedMotion, section, settings, step],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}
