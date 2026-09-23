import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig } from "../motion/config";

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled || window.innerWidth < motionConfig.devices.desktopMin) {
      return;
    }

    const lenis = new Lenis({
      lerp: motionConfig.lenis.lerp,
      wheelMultiplier: motionConfig.lenis.wheelMultiplier,
      anchors: true,
    });

    const onScroll = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [enabled]);
}
