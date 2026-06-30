import type { SiteConfig } from "@/types";

/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Edit ONLY this file to re-skin / re-content the entire invitation:
 *  names, dates, address, phone, colors, music, animation, every UI string.
 *
 *  Nothing else in the app hard-codes content. See `docs/CONFIGURATION.md`.
 * ============================================================================
 */

// Used to build both the embedded map and the external "open in Maps" link
// from one place. Replace with your exact place/address (or paste full URLs
// from Google Maps → Share into `maps` below).
const MAP_QUERY = "Km 9 Nguyễn Trãi, Đại Mỗ, Hà Nội";

export const siteConfig: SiteConfig = {
  /* ─────────────────────────── SEO / metadata ────────────────────────── */
  meta: {
    title: "Thư mời tốt nghiệp · Nguyễn Phương Anh",
    description:
      "Trân trọng kính mời bạn đến tham dự lễ tốt nghiệp của Nguyễn Phương Anh.",
    locale: "vi_VN",
    // Set to your real deployed origin (used for OpenGraph / metadataBase).
    siteUrl: "https://thiep-moi-siss.vercel.app/",
  },

  /* ───────────────────────────── Identity ────────────────────────────── */
  identity: {
    invitationTitle: "Thư mời tham dự",
    ceremonyLabel: "Lễ tốt nghiệp của",
    graduateName: "NGUYỄN PHƯƠNG ANH",
    guestPrefix: "Hân hạnh mời",
    defaultGuestName: "Quý khách",
  },

  /* ────────────────────────────── Event ──────────────────────────────── */
  event: {
    dateLabel: "10/07/2026",
    timeLabel: "15:40 - 16:50",
    address: ["Km 9, đường Nguyễn Trãi", "phường Đại Mỗ", "Hà Nội"],
    phone: "0394536855",
    // ISO 8601 WITH timezone. +07:00 = Vietnam. Drives the live countdown.
    countdownTargetISO: "2026-07-10T15:40:00+07:00",
    calendar: { year: 2026, month: 7, highlightDay: 10 },
  },

  /* ────────────────────────────── Maps ───────────────────────────────── */
  maps: {
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
      MAP_QUERY,
    )}&output=embed`,
    externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      MAP_QUERY,
    )}`,
  },

  /* ───────────────────────── Backend (API) ───────────────────────────── */
  api: {
    // Prefer the env override (see .env.example); otherwise paste your URL here.
    appsScriptUrl:
      process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ??
      "https://script.google.com/macros/s/AKfycbwJwi2q9XHGpVtQ1Xq3Hjz0yhx5_9_ZgD4QcSbI0UOSxW1THsTaN7KkXGLfWy55aFCF/exec",
  },

  /* ────────────────────────────── Music ──────────────────────────────── */
  music: {
    // Ships with a silent placeholder so the toggle works with zero 404s.
    // Replace public/music/background.wav with your own track (any browser
    // audio format) and update this path. See public/music/README.md.
    src: "/music/I_Love_You_3000.mp3",
    enabledByDefault: true,
    volume: 0.35,
  },

  /* ────────────────────────────── Theme ──────────────────────────────── */
  // Each color is a space-separated RGB triple ("R G B"). Change `primary`
  // to re-theme buttons, accents and glow across the whole site.
  theme: {
    colors: {
      primary: "37 99 235", // blue-600
      primaryForeground: "255 255 255", // white
      navy: "12 27 56", // deep navy
      sky: "56 189 248", // sky-400
      ink: "15 23 42", // slate-900 (body text)
      subtle: "100 116 139", // slate-500 (muted text)
      surface: "248 251 255", // near-white page background
      surface2: "234 243 255", // light-blue panel
    },
  },

  /* ──────────────────────────── Animation ────────────────────────────── */
  animation: {
    enabled: true,
    introEnabled: true,
    introDurationMs: 2600,
    confettiCount: 90,
    flowerCount: 14,
    particleCount: 26,
    mouseGlow: true,
  },

  /* ─────────────────────────── UI copy (vi) ──────────────────────────── */
  text: {
    hero: {
      openEnvelope: "Mở thư mời",
      scrollHint: "Cuộn xuống để khám phá",
    },
    countdown: {
      title: "Cùng đếm ngược thời gian",
      subtitle: "Đến ngày trọng đại",
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
      finished: "Lễ tốt nghiệp đã bắt đầu 🎓",
      weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      monthLabelPrefix: "Tháng",
    },
    location: {
      title: "Xem dẫn đường",
      subtitle: "Địa điểm tổ chức buổi lễ",
      openMaps: "Mở Google Maps",
      hint: "Chạm vào bản đồ để xem chi tiết",
    },
    rsvp: {
      title: "Xác nhận tham dự",
      subtitle: "Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi",
      nameLabel: "Họ và tên",
      namePlaceholder: "Nhập tên của bạn",
      attendanceLabel: "Bạn sẽ tham dự chứ?",
      attendancePlaceholder: "Chọn câu trả lời",
      attendingYes: "Có, tôi sẽ đến",
      attendingNo: "Rất tiếc, tôi không thể đến",
      messageLabel: "Lời chúc",
      messagePlaceholder: "Gửi lời chúc đến mình nhé...",
      submit: "Gửi lời chúc của bạn",
      submitting: "Đang gửi...",
      successTitle: "Cảm ơn bạn rất nhiều!",
      successBody: "Lời chúc của bạn đã được gửi đi thành công.",
      sendAnother: "Gửi lời chúc khác",
      errorGeneric: "Có lỗi xảy ra. Vui lòng thử lại sau giây lát.",
      validation: {
        nameRequired: "Vui lòng nhập tên của bạn",
        attendanceRequired: "Vui lòng chọn câu trả lời",
      },
    },
    guestbook: {
      title: "Lời chúc của mọi người",
      subtitle: "Những lời nhắn gửi yêu thương",
      empty: "Hãy là người đầu tiên gửi lời chúc!",
      loading: "Đang tải lời chúc...",
      error: "Không tải được lời chúc. Vui lòng thử lại sau.",
      retry: "Thử lại",
    },
    closing: {
      thankYou: "Thank you!",
      quote:
        "Những cố gắng của em hôm nay cũng là nhờ sự đồng hành của mọi người. Mong được gặp thầy cô, bạn bè và gia đình trong ngày trọng đại này!",
      contactLabel: "Liên hệ trực tiếp",
    },
    music: {
      play: "Bật nhạc nền",
      pause: "Tắt nhạc nền",
    },
    backToTop: "Lên đầu trang",
  },

  /* ───────────────────────────── Socials ─────────────────────────────── */
  // Optional. Example: { label: "Facebook", href: "https://...", icon: "facebook" }
  socials: [],
};

export default siteConfig;
