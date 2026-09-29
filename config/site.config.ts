import type { SiteConfig } from "@/types";

/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH  (visual + content)
 * ============================================================================
 *  Edit ONLY this file to re-skin / re-content the invitation:
 *  names, date, address, phone, map, THEME (colors · gradient · radius ·
 *  shadow · motion), and every UI string.
 *
 *  Fonts are configured in `config/fonts.ts` (next/font needs static imports).
 *  See `docs/CONFIGURATION.md`.
 * ============================================================================
 */

// Venue used to build both the embedded map and the external link.
const MAP_QUERY =
  "Học viện Cán bộ Thành phố Hồ Chí Minh, 324 Chu Văn An, phường Bình Thạnh, TP.HCM";
const MAP_ZOOM = 16;

export const siteConfig: SiteConfig = {
  /* ─────────────────────────── SEO / metadata ────────────────────────── */
  meta: {
    title: "Thư mời tốt nghiệp · Đoàn Nguyễn Thúy Quyên",
    description:
      "Trân trọng kính mời bạn đến chung vui trong lễ tốt nghiệp của Đoàn Nguyễn Thúy Quyên.",
    locale: "vi_VN",
    siteUrl: "https://graduation-invitation.vercel.app",
  },

  /* ───────────────────────────── Identity ────────────────────────────── */
  identity: {
    invitationTitle: "Thư mời tốt nghiệp",
    ceremonyLabel: "Lễ tốt nghiệp của",
    graduateName: "Đoàn Nguyễn Thúy Quyên",
    degreeLabel: "Tân Cử nhân",
    schoolLabel: "Học viện Cán bộ Thành phố Hồ Chí Minh",
    guestPrefix: "Trân trọng kính mời",
    defaultGuestName: "Quý vị",
    // Portrait photo shown in the hero medallion (place file in /public).
    avatar: "/avatar1.png",
    // Optional: set to a path under /public for a full-bleed hero photo.
    heroImage: undefined,
  },

  /* ────────────────────────────── Event ──────────────────────────────── */
  event: {
    dateLabel: "10.10.2026",
    timeLabel: "09:00 - 12:00",
    weekdayLabel: "Thứ Bảy",
    address: ["324 Chu Văn An", "phường Bình Thạnh", "TP.HCM"],
    venueName: "Sảnh A, Cổng số 2 · Học viện Cán bộ Thành phố Hồ Chí Minh",
    phone: "0374849637",
    countdownTargetISO: "2026-10-10T15:40:00+07:00",
    calendar: { year: 2026, month: 10, highlightDay: 10 },
  },

  /* ────────────────────────────── Maps ───────────────────────────────── */
  maps: {
    query: MAP_QUERY,
    zoom: MAP_ZOOM,
    embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(
      MAP_QUERY,
    )}&z=${MAP_ZOOM}&t=m&output=embed`,
    externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      MAP_QUERY,
    )}`,
  },

  /* ───────────────────────── Backend (API) ───────────────────────────── */
  api: {
    appsScriptUrl:
      process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ??
      "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec",
  },

  /* ────────────────────────────── Music ──────────────────────────────── */
  music: {
    src: "/music/No_Hoa.MP3",
    enabledByDefault: true,
    volume: 0.35,
  },

  /* ────────────────────────────── Theme ──────────────────────────────── */
  // Pastel-pink palette. Each color is a
  // space-separated RGB triple ("R G B") so Tailwind can apply opacity.
  theme: {
    colors: {
      primary: "88 52 66", // deep dusty rose
      secondary: "151 109 126", // muted mauve
      accent: "201 112 145", // rose pink
      accentSoft: "241 180 201", // pastel pink
      background: "255 246 249", // blush white
      surface: "255 252 253", // soft white card
      ink: "77 54 64", // body text
      subtle: "143 112 125", // muted rose gray
      border: "240 207 220", // pink hairline
      onDark: "255 247 250", // blush white on dark
    },
    gradient: "linear-gradient(100deg, #C66B8E, #F1B6CD 48%, #D984A4)",
    radius: { card: "1.75rem", media: "1.25rem", control: "0.85rem" },
    shadow: {
      soft: "0 1px 2px rgb(88 52 66 / 0.04), 0 8px 24px rgb(201 112 145 / 0.10)",
      card: "0 2px 6px rgb(88 52 66 / 0.05), 0 24px 60px -28px rgb(201 112 145 / 0.30)",
      lift: "0 34px 80px -34px rgb(151 109 126 / 0.46)",
    },
  },

  /* ──────────────────────────── Motion ───────────────────────────────── */
  motion: {
    enabled: true,
    introEnabled: true,
    introDurationMs: 2800,
    speed: 1,
    durations: { fast: 0.35, base: 0.7, slow: 1.1 },
    delayStep: 0.09,
    confettiCount: 70,
    particleCount: 22,
    mouseGlow: true,
  },

  /* ────────────────────────────── Gallery ────────────────────────────── */
  gallery: {
    scriptLabel: "Our Memories",
    title: "Khoảnh khắc đáng nhớ",
    subtitle: "Những kỷ niệm trên chặng đường đã qua",
  },

  /* ────────────────────────────── Parking ────────────────────────────── */
  parking: {
    scriptLabel: "Parking",
    title: "Hướng dẫn gửi xe",
    subtitle: "Một vài lưu ý để việc di chuyển thuận tiện hơn",
    mapImage: "/mapXeNew.jpg",
    noteLabel: "Lưu ý",
    car: {
      title: "Gửi xe ô tô",
      notes: [
        "Đến cổng trường sẽ có bác bảo vệ hướng dẫn vị trí đỗ xe.",
        "Do kế hoạch thi công tuyến đường từ đường Nguyễn Trãi vào Trường Đại học Hà Nội nên đường đi dành cho ô tô được điều chỉnh.",
      ],
      routeIn: {
        label: "Chiều vào trường",
        steps: ["Phùng Khoang", "Số 63 Phùng Khoang", "Rẽ phải", "Đi thẳng", "Cổng trong"],
      },
      routeOut: {
        label: "Chiều ra",
        steps: [
          "Cổng trong",
          "Sau nhà C",
          "Nhà thờ Phùng Khoang",
          "Đường Trung Văn",
          "Đường Tố Hữu",
          "Khuất Duy Tiến",
        ],
      },
    },
    motorbike: {
      title: "Gửi xe máy",
      locations: [
        "Các nhà xe phía sau A1",
        "Bên cạnh Hacha Coffee",
        "Bên cạnh khu Giáo dục Thể chất",
      ],
    },
  },

  /* ────────────────────────────── Timeline ───────────────────────────── */
  timeline: {
    scriptLabel: "Timeline",
    title: "Lịch trình buổi lễ",
    subtitle: "Các mốc thời gian trong ngày trọng đại",
    items: [
      {
        time: "10:00 - 11:45",
        title: "Ký vỏ văn bằng, nhận áo, mũ",
        icon: "sign",
        notes: [
          "Vui lòng đến đúng giờ đã được ghi trên thiệp.",
          "Trang phục ưu tiên: trắng, be hoặc đen.",
          "Lễ chính thức diễn ra từ 12:10.",
          "Nếu muốn xem trực tiếp toàn bộ buổi lễ, hãy liên hệ trực tiếp với Quyên.",
        ],
      },
      {
        time: "11:45 - 15:40",
        title: "Diễn ra lễ tốt nghiệp",
        icon: "cap",
      },
      {
        time: "15:40 - 16:50",
        title: "Chụp ảnh kỷ niệm cùng gia đình và bạn bè",
        icon: "camera",
      },
    ],
  },

  /* ─────────────────────────── UI copy (vi) ──────────────────────────── */
  text: {
    hero: {
      openEnvelope: "Mở thư mời",
      scrollHint: "Cuộn để khám phá",
      attendOffline: "Tham dự trực tiếp",
      attendOnline: "Tham dự trực tuyến",
      timeLabel: "Thời gian",
    },
    countdown: {
      scriptLabel: "Save the Date",
      title: "Đếm ngược ngày trọng đại",
      subtitle: "Từng khoảnh khắc đến ngày đặc biệt",
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
      finished: "Lễ tốt nghiệp đã bắt đầu",
      weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      monthLabelPrefix: "Tháng",
    },
    location: {
      scriptLabel: "Location",
      title: "Địa điểm tổ chức",
      subtitle: "Nơi diễn ra buổi lễ tốt nghiệp",
      openMaps: "Mở Google Maps",
      hint: "Chạm vào bản đồ để xem chi tiết",
    },
    rsvp: {
      scriptLabel: "R.S.V.P",
      title: "Xác nhận tham dự",
      subtitle: "Sự có mặt của bạn là món quà tốt nghiệp tuyệt vời nhất!",
      nameLabel: "Họ và tên",
      namePlaceholder: "Nhập tên của bạn",
      attendanceLabel: "Bạn sẽ tham dự chứ?",
      attendancePlaceholder: "Chọn câu trả lời",
      attendingYes: "Có, tôi sẽ đến",
      attendingNo: "Rất tiếc, tôi không thể đến",
      messageLabel: "Lời chúc",
      messagePlaceholder: "Gửi lời chúc đến Thúy Quyên...",
      submit: "Gửi lời chúc",
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
      scriptLabel: "Wishes",
      title: "Sổ lưu bút",
      subtitle: "Những lời chúc yêu thương gửi đến Thúy Quyên",
      empty: "Hãy là người đầu tiên gửi lời chúc!",
      loading: "Đang tải lời chúc...",
      error: "Không tải được lời chúc. Vui lòng thử lại sau.",
      retry: "Thử lại",
    },
    closing: {
      scriptLabel: "Thank You",
      thankYou: "Trân trọng cảm ơn",
      quote:
        "Hành trình ở cánh cổng đại học đã khép lại, hơn 4 năm học tập và làm việc. Con/em biết rằng mình đã rất may mắn khi luôn có sự đồng hành của gia đình, bạn bè và người thân. Hơn ai hết, con muốn bày tỏ lòng biết ơn chân thành nhất đối với Ba, Mẹ và Chị. Con cảm ơn gia đình mình đã là điểm tựa tinh thần, hỗ trợ cho con trong suốt chặng hành trình đầy thử thách vừa qua. Con cũng xin được cảm ơn Ông, Bà đã luôn động viên và cổ vũ con trên giảng đường đại học. Cảm ơn gia đình nội ngoại hai bên đã luôn quan tâm, giúp đỡ con. Bên cạnh gia đình, người thân thì em/mình cũng rất hạnh phúc khi luôn có sự hỗ trợ, chia sẻ và sát cánh từ các Anh, Chị, Em, Bạn bè. Lúc vui, lúc buồn luôn là những người đồng hành đáng tin cậy nhất của Thúy Quyên. Tất cả tình cảm của mọi người có lẽ là món quà tuyệt vời nhất mà Quyên nhận được, là sức mạnh tinh thần, động lực phấn đấu trong cả một đoạn đường vừa qua. Cuối lời, Quyên xin gửi tới những người thương mến của mình một lời chúc bình an, hạnh phúc. Mong rằng chúng ta sẽ mãi có thể đồng hành với nhau💗",
      contactLabel: "Liên hệ trực tiếp",
    },
    music: { play: "Bật nhạc nền", pause: "Tắt nhạc nền" },
    backToTop: "Lên đầu trang",
  },

  /* ───────────────────────────── Socials ─────────────────────────────── */
  socials: [],
};

export default siteConfig;
