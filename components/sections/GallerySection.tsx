"use client";

import { AnimatePresence, motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { GalleryImage } from "@/types";

interface GallerySectionProps {
  images: GalleryImage[];
}

const SWIPE_THRESHOLD = 45;
const SCROLL_SPEED = 0.028; // px per millisecond

function Tile({
  image,
  index,
  onOpen,
  hidden,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
  hidden?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Xem ảnh ${index + 1}`}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-media shadow-soft tap-transparent sm:mb-4"
    >
      <Image
        src={image.src}
        alt={`Khoảnh khắc ${index + 1}`}
        width={image.width}
        height={image.height}
        sizes="(min-width: 672px) 320px, 45vw"
        className="h-auto w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"
      />
    </button>
  );
}

export function GallerySection({ images }: GallerySectionProps) {
  const copy = siteConfig.gallery;
  const prefersReduced = usePrefersReducedMotion();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const paused = useRef(false);

  const open = useCallback((index: number) => {
    paused.current = true;
    setOpenIndex(index);
  }, []);
  const close = useCallback(() => {
    setOpenIndex(null);
    paused.current = false;
  }, []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  const isOpen = openIndex !== null;

  // ── Auto-scrolling frame (credits reel) ──────────────────────────────────
  const y = useMotionValue(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyHeight = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (copyRef.current) copyHeight.current = copyRef.current.offsetHeight;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [images]);

  useAnimationFrame((_, delta) => {
    if (prefersReduced || paused.current || copyHeight.current === 0) return;
    let next = y.get() - SCROLL_SPEED * delta;
    if (next <= -copyHeight.current) next += copyHeight.current;
    y.set(next);
  });

  // Keyboard navigation + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") showNext();
      else if (event.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, showNext, showPrev]);

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD) showPrev();
    else if (deltaX < -SWIPE_THRESHOLD) showNext();
    touchStartX.current = null;
  };

  if (images.length === 0) return null;

  const active = openIndex === null ? null : images[openIndex];

  return (
    <section id="gallery" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          scriptLabel={copy.scriptLabel}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <Reveal className="mt-10">
          <div className="rounded-card border border-hairline/70 bg-surface/40 p-3 shadow-card sm:p-4">
            {prefersReduced ? (
              // Reduced motion: a plain scrollable frame.
              <div className="no-scrollbar mask-fade-y h-[68vh] max-h-[640px] overflow-y-auto">
                <div className="columns-2 gap-3 sm:gap-4">
                  {images.map((image, index) => (
                    <Tile key={image.src} image={image} index={index} onOpen={open} />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="mask-fade-y relative h-[68vh] max-h-[640px] overflow-hidden"
                onMouseEnter={() => (paused.current = true)}
                onMouseLeave={() => {
                  if (!isOpen) paused.current = false;
                }}
                onFocusCapture={() => (paused.current = true)}
                onBlurCapture={() => {
                  if (!isOpen) paused.current = false;
                }}
              >
                <motion.div style={{ y }} className="absolute inset-x-0 top-0">
                  <div ref={copyRef} className="columns-2 gap-3 sm:gap-4">
                    {images.map((image, index) => (
                      <Tile key={`a-${image.src}`} image={image} index={index} onOpen={open} />
                    ))}
                  </div>
                  <div className="columns-2 gap-3 sm:gap-4">
                    {images.map((image, index) => (
                      <Tile
                        key={`b-${image.src}`}
                        image={image}
                        index={index}
                        onOpen={open}
                        hidden
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Đóng"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-on-dark backdrop-blur tap-transparent hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-on-dark backdrop-blur tap-transparent hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Ảnh tiếp theo"
              className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-on-dark backdrop-blur tap-transparent hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>

            <motion.div
              key={openIndex}
              className="relative flex max-h-[82vh] w-full max-w-4xl items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={active.src}
                alt={`Khoảnh khắc ${openIndex! + 1}`}
                width={active.width}
                height={active.height}
                sizes="100vw"
                className="h-auto max-h-[82vh] w-auto rounded-media object-contain"
                priority
              />
            </motion.div>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-button text-sm text-on-dark/80">
              {openIndex! + 1} / {images.length}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
