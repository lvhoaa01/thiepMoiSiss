"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { BackToTop } from "@/components/effects/BackToTop";
import { EnvelopeIntro } from "@/components/effects/EnvelopeIntro";
import { ScrollProgressBar } from "@/components/effects/ScrollProgressBar";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { GuestbookSection } from "@/components/sections/GuestbookSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { siteConfig } from "@/config/site.config";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

// Heavy, purely-decorative effects: load on the client only to trim the
// initial bundle. Each self-gates on reduced-motion / config internally.
const FloatingFlowers = dynamic(
  () => import("@/components/effects/FloatingFlowers").then((mod) => mod.FloatingFlowers),
  { ssr: false },
);
const Particles = dynamic(
  () => import("@/components/effects/Particles").then((mod) => mod.Particles),
  { ssr: false },
);
const MouseGlow = dynamic(
  () => import("@/components/effects/MouseGlow").then((mod) => mod.MouseGlow),
  { ssr: false },
);

const INTRO_ENABLED = siteConfig.animation.enabled && siteConfig.animation.introEnabled;

/** Client root: wires the intro, background music, effects and all sections. */
export function InvitationApp() {
  const [showIntro, setShowIntro] = useState(INTRO_ENABLED);
  const [revealed, setRevealed] = useState(!INTRO_ENABLED);
  const [reloadGuestbook, setReloadGuestbook] = useState(0);

  const music = useBackgroundMusic(siteConfig.music.src, siteConfig.music.volume);

  const handleIntroOpen = useCallback(() => {
    if (siteConfig.music.enabledByDefault) music.play();
  }, [music]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setRevealed(true);
  }, []);

  const handleRsvpSubmitted = useCallback(() => {
    setReloadGuestbook((value) => value + 1);
  }, []);

  return (
    <>
      <AnimatedBackground />
      <FloatingFlowers />
      <Particles />
      <MouseGlow />

      <ScrollProgressBar />

      {siteConfig.music.src ? (
        <MusicToggle isPlaying={music.isPlaying} onToggle={music.toggle} />
      ) : null}

      <HeroSection revealed={revealed} />
      <CountdownSection />
      <LocationSection />
      <RsvpSection onSubmitted={handleRsvpSubmitted} />
      <GuestbookSection reloadSignal={reloadGuestbook} />
      <ClosingSection />

      <BackToTop />

      {showIntro ? (
        <EnvelopeIntro onOpen={handleIntroOpen} onComplete={handleIntroComplete} />
      ) : null}
    </>
  );
}
