"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { BackToTop } from "@/components/effects/BackToTop";
import { EnvelopeIntro } from "@/components/effects/EnvelopeIntro";
import { ScrollProgressBar } from "@/components/effects/ScrollProgressBar";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { GuestbookSection } from "@/components/sections/GuestbookSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ParkingSection } from "@/components/sections/ParkingSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { siteConfig } from "@/config/site.config";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import type { GalleryImage, PlanEntry } from "@/types";

// Heavy, purely-decorative effects — client-only to trim the initial bundle.
const AmbientEffects = dynamic(
  () => import("@/components/effects/AmbientEffects").then((mod) => mod.AmbientEffects),
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

const INTRO_ENABLED = siteConfig.motion.enabled && siteConfig.motion.introEnabled;

interface InvitationAppProps {
  plan: PlanEntry[];
  galleryImages: GalleryImage[];
}

/** Client root: wires the intro, background music, effects and all sections. */
export function InvitationApp({ plan, galleryImages }: InvitationAppProps) {
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
      <AmbientEffects />
      <Particles />
      <MouseGlow />

      <ScrollProgressBar />

      {siteConfig.music.src ? (
        <MusicToggle isPlaying={music.isPlaying} onToggle={music.toggle} />
      ) : null}

      <HeroSection revealed={revealed} plan={plan} />
      <GallerySection images={galleryImages} />
      <CountdownSection />
      <LocationSection />
      <ParkingSection />
      <TimelineSection />
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
