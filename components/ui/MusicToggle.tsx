"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

/** Fixed, always-available background-music control (top-right). */
export function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  const prefersReduced = usePrefersReducedMotion();
  const label = isPlaying ? siteConfig.text.music.pause : siteConfig.text.music.play;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isPlaying}
      title={label}
      className="glass-strong fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-navy tap-transparent"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5" aria-hidden />
      ) : (
        <VolumeX className="h-5 w-5" aria-hidden />
      )}
      {isPlaying && !prefersReduced ? (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-primary/40"
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      ) : null}
    </motion.button>
  );
}
