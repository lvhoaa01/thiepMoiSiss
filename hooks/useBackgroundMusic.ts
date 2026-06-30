"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface BackgroundMusic {
  isPlaying: boolean;
  /** Toggle play/pause. */
  toggle: () => void;
  /** Start playback — call from a user gesture to satisfy autoplay policies. */
  play: () => void;
}

/**
 * Owns a single looping <audio> element created imperatively (so it never
 * appears in the DOM tree / SSR output). Playback failures — autoplay blocked,
 * or the asset not yet added — are swallowed so the UI never crashes.
 */
export function useBackgroundMusic(src: string, volume: number): BackgroundMusic {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = Math.min(1, Math.max(0, volume));
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audioRef.current = null;
    };
  }, [src, volume]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      /* autoplay blocked or asset unavailable — handled silently */
    });
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  return { isPlaying, toggle, play };
}
