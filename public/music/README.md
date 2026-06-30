# Background music

This folder ships with **`background.wav`** — a short, **silent** placeholder so
the music toggle works immediately with no 404s or console errors.

## Use your own song

1. Add your audio file here, e.g. `background.mp3`.
2. Update the path in **`config/site.config.ts`**:

   ```ts
   music: {
     src: "/music/background.mp3", // ← your file
     enabledByDefault: true,
     volume: 0.35,
   },
   ```

Any browser-supported format works (`.mp3`, `.ogg`, `.m4a`, `.wav`). Keep the
file reasonably small (a few MB) for fast loading, and make sure you have the
rights to use the track.

> Music starts on the first user interaction (opening the envelope), which keeps
> it compliant with browser autoplay policies. Guests can mute/unmute any time
> via the toggle in the top-right corner.
