"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site.config";

/** Floating "scroll to top" button that fades in after scrolling down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 640);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={siteConfig.text.backToTop}
          title={siteConfig.text.backToTop}
          className="glass-strong fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-navy tap-transparent"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
