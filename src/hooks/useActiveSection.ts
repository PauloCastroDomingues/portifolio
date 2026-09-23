import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      let next = ids[0] ?? "";
      for (const id of ids) {
        const node = document.getElementById(id);
        if (node && node.offsetTop <= marker) {
          next = id;
        }
      }
      setActive(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}
