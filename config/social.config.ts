/**
 * Social platforms catalog — keys that admin can edit URLs for.
 * Auto-propagates to footer, contact page, and share buttons.
 */

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "x"
  | "linkedin"
  | "whatsapp"
  | "website";

export interface SocialPlatformEntry {
  id: SocialPlatform;
  label: string;
  icon: string;
  color: string;
  urlPrefix?: string;
}

export const socialPlatforms: Record<SocialPlatform, SocialPlatformEntry> = {
  instagram: {
    id: "instagram",
    label: "Instagram",
    icon: "Instagram",
    color: "#E4405F",
    urlPrefix: "https://instagram.com/",
  },
  facebook: {
    id: "facebook",
    label: "Facebook",
    icon: "Facebook",
    color: "#1877F2",
    urlPrefix: "https://facebook.com/",
  },
  tiktok: {
    id: "tiktok",
    label: "TikTok",
    icon: "Music2",
    color: "#000000",
    urlPrefix: "https://tiktok.com/@",
  },
  youtube: {
    id: "youtube",
    label: "YouTube",
    icon: "Youtube",
    color: "#FF0000",
    urlPrefix: "https://youtube.com/@",
  },
  x: {
    id: "x",
    label: "X (Twitter)",
    icon: "Twitter",
    color: "#000000",
    urlPrefix: "https://x.com/",
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    icon: "Linkedin",
    color: "#0A66C2",
    urlPrefix: "https://linkedin.com/company/",
  },
  whatsapp: {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "MessageCircle",
    color: "#25D366",
    urlPrefix: "https://wa.me/",
  },
  website: {
    id: "website",
    label: "Website",
    icon: "Globe",
    color: "#6B7280",
  },
};

export const SOCIAL_PLATFORM_IDS = Object.keys(socialPlatforms) as SocialPlatform[];
