import { createContext } from "react";

export type MotionSettings = {
  animations: boolean;
  parallax: boolean;
  loops: boolean;
};

export type MotionContextValue = {
  debugEnabled: boolean;
  reducedMotion: boolean;
  settings: MotionSettings;
  section: string;
  step: string;
  setSettings: React.Dispatch<React.SetStateAction<MotionSettings>>;
  setSection: (section: string) => void;
  setStep: (step: string) => void;
};

export const MotionContext = createContext<MotionContextValue | null>(null);
