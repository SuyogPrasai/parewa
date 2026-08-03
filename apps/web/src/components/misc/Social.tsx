import Link from "next/link";
import { Icon } from '@iconify/react'

export function Social({ label, icon, url }: { label: string, icon: string, url: string }) {
  if (!label) return null;

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <Icon icon={icon} className="w-6 h-6 text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200" />
      </Link>
    </div>
  );
}