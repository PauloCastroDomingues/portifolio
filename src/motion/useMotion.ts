import { useContext } from "react";
import { MotionContext } from "./motionState";

export function useMotion() {
  const value = useContext(MotionContext);
  if (!value) {
    throw new Error("useMotion must be used inside MotionProvider");
  }
  return value;
}
