/**
 * Shared type definitions.
 *
 * Two groups live here:
 *   1. Data-model types exchanged with the Google Apps Script backend.
 *   2. The `SiteConfig` shape that `config/site.config.ts` must satisfy.
 *
 * Keeping the config *shape* here lets `config/site.config.ts` stay focused on
 * values only — the one file an editor needs to touch to re-skin the site.
 */

/* ───────────────────────────── Data model ───────────────────────────── */

export type Attendance = "yes" | "no";

/** Payload sent to the backend when a guest submits the RSVP form. */
export interface RsvpInput {
  name: string;
  attending: Attendance;
  message: string;
}

/** A single guestbook entry returned by the backend. */
export interface Wish {
  name: string;
  message: string;
  /** ISO 8601 timestamp. */
  timestamp: string;
}

/** Discriminated union for every backend response. */
export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** Result of the client-side RSVP submission flow. */
export type RsvpResult =
  | { status: "success" }
  | { status: "error"; message: string };

/** Lifecycle of an async data fetch (used by the guestbook). */
export type FetchStatus = "idle" | "loading" | "success" | "error";

/** Remaining time, already split into units. */
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target moment has passed. */
  isComplete: boolean;
}

/* ──────────────────────────── Config shape ──────────────────────────── */

export interface SeoConfig {
  title: string;
  description: string;
  /** OpenGraph locale, e.g. "vi_VN". */
  locale: string;
  /** Absolute origin of the deployed site, used for metadataBase / OG. */
  siteUrl: string;
}

export interface IdentityConfig {
  invitationTitle: string;
  ceremonyLabel: string;
  graduateName: string;
  guestPrefix: string;
  /** Shown when the URL has no `?guest=` parameter. */
  defaultGuestName: string;
}

export interface CalendarConfig {
  year: number;
  /** 1-indexed month (1 = January, 7 = July). */
  month: number;
  /** Day-of-month to highlight as the event day. */
  highlightDay: number;
}

export interface EventConfig {
  dateLabel: string;
  timeLabel: string;
  /** Address rendered line-by-line. */
  address: string[];
  phone: string;
  /** ISO 8601 with timezone — drives the live countdown. */
  countdownTargetISO: string;
  calendar: CalendarConfig;
}

export interface MapsConfig {
  /** `src` for the embedded <iframe>. */
  embedUrl: string;
  /** External link opened by the "Open Google Maps" button. */
  externalUrl: string;
}

export interface ApiConfig {
  /** Deployed Google Apps Script Web App URL (…/exec). */
  appsScriptUrl: string;
}

export interface MusicConfig {
  /** Path under /public, e.g. "/music/background.mp3". */
  src: string;
  enabledByDefault: boolean;
  /** 0–1. */
  volume: number;
}

/**
 * Palette. Each value is a space-separated RGB triple (e.g. "37 99 235")
 * so Tailwind's `rgb(var(--x) / <alpha-value>)` can apply opacity.
 */
export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  navy: string;
  sky: string;
  ink: string;
  subtle: string;
  surface: string;
  surface2: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
}

export interface AnimationConfig {
  /** Master switch for all non-essential motion. */
  enabled: boolean;
  introEnabled: boolean;
  introDurationMs: number;
  confettiCount: number;
  flowerCount: number;
  particleCount: number;
  /** Desktop-only pointer glow. */
  mouseGlow: boolean;
}

export type SocialIcon =
  | "facebook"
  | "instagram"
  | "mail"
  | "phone"
  | "link";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface TextConfig {
  hero: {
    openEnvelope: string;
    scrollHint: string;
  };
  countdown: {
    title: string;
    subtitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    finished: string;
    /** Monday-first weekday headers, length 7. */
    weekdays: string[];
    monthLabelPrefix: string;
  };
  location: {
    title: string;
    subtitle: string;
    openMaps: string;
    hint: string;
  };
  rsvp: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    attendanceLabel: string;
    attendancePlaceholder: string;
    attendingYes: string;
    attendingNo: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    errorGeneric: string;
    validation: {
      nameRequired: string;
      attendanceRequired: string;
    };
  };
  guestbook: {
    title: string;
    subtitle: string;
    empty: string;
    loading: string;
    error: string;
    retry: string;
  };
  closing: {
    thankYou: string;
    quote: string;
    contactLabel: string;
  };
  music: {
    play: string;
    pause: string;
  };
  backToTop: string;
}

export interface SiteConfig {
  meta: SeoConfig;
  identity: IdentityConfig;
  event: EventConfig;
  maps: MapsConfig;
  api: ApiConfig;
  music: MusicConfig;
  theme: ThemeConfig;
  animation: AnimationConfig;
  text: TextConfig;
  socials: SocialLink[];
}
