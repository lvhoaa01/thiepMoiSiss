/**
 * Shared type definitions.
 *
 *   1. Data-model types exchanged with the Google Apps Script backend.
 *   2. The invitation-plan (CSV) domain types.
 *   3. The `SiteConfig` shape that `config/site.config.ts` must satisfy.
 *
 * Fonts are configured separately in `config/fonts.ts` (next/font requires
 * static imports); everything else visual lives in `site.config.ts`.
 */

/* ───────────────────────────── Data model ───────────────────────────── */

export type Attendance = "yes" | "no";

export interface RsvpInput {
  name: string;
  attending: Attendance;
  message: string;
}

export interface Wish {
  name: string;
  message: string;
  /** ISO 8601 timestamp. */
  timestamp: string;
}

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type RsvpResult =
  | { status: "success" }
  | { status: "error"; message: string };

export type FetchStatus = "idle" | "loading" | "success" | "error";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

/* ─────────────────────── Invitation plan (CSV) ──────────────────────── */

export type InvitationType = "offline" | "online";

/** One parsed row from `graPlan.csv`. */
export interface PlanEntry {
  name: string;
  type: InvitationType;
  /** Session/arrival time (offline only); `null` when unspecified. */
  time: string | null;
}

/** The invitation resolved for the current `?guest=` visitor. */
export interface ResolvedGuest {
  displayName: string;
  type: InvitationType | null;
  time: string | null;
  /** True when the guest was found in the plan. */
  matched: boolean;
}

/** A gallery image with intrinsic dimensions (read at build time). */
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

/* ──────────────────────────── Config shape ──────────────────────────── */

export interface SeoConfig {
  title: string;
  description: string;
  locale: string;
  siteUrl: string;
}

export interface IdentityConfig {
  invitationTitle: string;
  ceremonyLabel: string;
  graduateName: string;
  degreeLabel: string;
  schoolLabel: string;
  guestPrefix: string;
  defaultGuestName: string;
  /** Portrait photo for the hero medallion (path under /public). */
  avatar?: string;
  /** Optional full-bleed hero background image (path under /public). */
  heroImage?: string;
}

export interface CalendarConfig {
  year: number;
  /** 1-indexed month. */
  month: number;
  highlightDay: number;
}

export interface EventConfig {
  dateLabel: string;
  timeLabel: string;
  weekdayLabel: string;
  address: string[];
  venueName: string;
  phone: string;
  countdownTargetISO: string;
  calendar: CalendarConfig;
}

export interface MapsConfig {
  /** Search query used to build both URLs. */
  query: string;
  /** Embed zoom level (higher = closer). */
  zoom: number;
  embedUrl: string;
  externalUrl: string;
}

export interface ApiConfig {
  appsScriptUrl: string;
}

export interface MusicConfig {
  src: string;
  enabledByDefault: boolean;
  volume: number;
}

/** Palette. Each value is a space-separated RGB triple, e.g. "43 39 34". */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  accentSoft: string;
  background: string;
  surface: string;
  ink: string;
  subtle: string;
  border: string;
  onDark: string;
}

export interface ThemeRadius {
  card: string;
  media: string;
  control: string;
}

export interface ThemeShadow {
  soft: string;
  card: string;
  lift: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  /** CSS gradient used for accent/gradient text. */
  gradient: string;
  radius: ThemeRadius;
  shadow: ThemeShadow;
}

export interface MotionConfig {
  enabled: boolean;
  introEnabled: boolean;
  introDurationMs: number;
  /** Global speed multiplier (1 = as authored, >1 = faster). */
  speed: number;
  /** Base durations in seconds. */
  durations: { fast: number; base: number; slow: number };
  /** Stagger delay between items, seconds. */
  delayStep: number;
  confettiCount: number;
  particleCount: number;
  mouseGlow: boolean;
}

export type SocialIcon = "facebook" | "instagram" | "mail" | "phone" | "link";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface GalleryConfig {
  scriptLabel: string;
  title: string;
  subtitle: string;
}

export type TimelineIcon = "sign" | "cap" | "camera" | "clock";

export interface TimelineItem {
  time: string;
  title: string;
  icon: TimelineIcon;
  notes?: string[];
}

export interface TimelineConfig {
  scriptLabel: string;
  title: string;
  subtitle: string;
  items: TimelineItem[];
}

export interface ParkingRoute {
  label: string;
  steps: string[];
}

export interface ParkingConfig {
  scriptLabel: string;
  title: string;
  subtitle: string;
  mapImage: string;
  noteLabel: string;
  car: {
    title: string;
    notes: string[];
    routeIn: ParkingRoute;
    routeOut: ParkingRoute;
  };
  motorbike: {
    title: string;
    locations: string[];
  };
}

export interface TextConfig {
  hero: {
    openEnvelope: string;
    scrollHint: string;
    attendOffline: string;
    attendOnline: string;
    timeLabel: string;
  };
  countdown: {
    scriptLabel: string;
    title: string;
    subtitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    finished: string;
    weekdays: string[];
    monthLabelPrefix: string;
  };
  location: {
    scriptLabel: string;
    title: string;
    subtitle: string;
    openMaps: string;
    hint: string;
  };
  rsvp: {
    scriptLabel: string;
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
    validation: { nameRequired: string; attendanceRequired: string };
  };
  guestbook: {
    scriptLabel: string;
    title: string;
    subtitle: string;
    empty: string;
    loading: string;
    error: string;
    retry: string;
  };
  closing: {
    scriptLabel: string;
    thankYou: string;
    quote: string;
    contactLabel: string;
  };
  music: { play: string; pause: string };
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
  motion: MotionConfig;
  gallery: GalleryConfig;
  parking: ParkingConfig;
  timeline: TimelineConfig;
  text: TextConfig;
  socials: SocialLink[];
}
