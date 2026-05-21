import Link from "next/link";
import {
  Instagram,
  Facebook,
  Music2,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import type { SocialLink } from "@/services/social-links.service";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  Music2,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Globe,
};

export function SocialIcons({ links }: { links: SocialLink[] }) {
  if (links.length === 0) {
    return (
      <p className="text-xs text-on-surface-variant">
        Configure social links in Admin → Social Links.
      </p>
    );
  }
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {links.map((l) => {
        const Icon = ICONS[l.icon] ?? LinkIcon;
        return (
          <li key={l.platform}>
            <Link
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-on-surface-variant transition-colors hover:text-foreground hover:bg-surface-high"
              aria-label={l.label}
            >
              <Icon className="h-4 w-4" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
