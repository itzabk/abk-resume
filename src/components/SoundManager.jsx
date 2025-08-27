import React, { useEffect, useRef } from "react";
import { Howl } from "howler";

export default function SoundManager() {
  const inited = useRef(false);
  useEffect(() => {
    function init() {
      if (inited.current) return;
      inited.current = true;
      // preload simple sounds (public/ maps to / at runtime)
      try {
        window.sndWhoosh = new Howl({
          src: ["/sounds/whoosh.mp3"],
          volume: 0.3,
        });
        window.sndGlitch = new Howl({
          src: ["/sounds/glitch.mp3"],
          volume: 0.2,
        });
        window.sndSwoosh = new Howl({
          src: ["/sounds/swoosh.mp3"],
          volume: 0.15,
        });
        window.sndChime = new Howl({
          src: ["/sounds/chime.mp3"],
          volume: 0.25,
        });
      } catch (e) {
        // swallow initialization errors; console for debug
        console.warn("Sound init failed", e);
      }
    }

    // expose manual initializer in case a handler wants to ensure sounds exist
    window.initSounds = init;

    // use pointerdown in capture phase so init runs before React's bubble-phase handlers
    const opts = { once: true, capture: true };
    window.addEventListener("pointerdown", init, opts);
    window.addEventListener("touchstart", init, opts);
    window.addEventListener("scroll", init, opts);

    return () => {
      window.removeEventListener("pointerdown", init, opts);
      window.removeEventListener("touchstart", init, opts);
      window.removeEventListener("scroll", init, opts);
      delete window.initSounds;
    };
  }, []);
  return null;
}
