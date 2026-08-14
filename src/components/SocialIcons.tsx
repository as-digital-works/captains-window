type IconProps = { size?: number; className?: string };

export function FacebookIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.5 3 14.3 3c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4v3.2h2.7V21h3.4z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.6 7.5s-.2-1.5-.85-2.15c-.8-.85-1.7-.85-2.1-.9C15.9 4.25 12 4.25 12 4.25h-.01s-3.9 0-6.65.2c-.4.05-1.3.05-2.1.9C2.6 6 2.4 7.5 2.4 7.5S2.2 9.25 2.2 11v1.9c0 1.75.2 3.5.2 3.5s.2 1.5.85 2.15c.8.85 1.85.82 2.32.91C7.3 19.6 12 19.65 12 19.65s3.9 0 6.65-.2c.4-.05 1.3-.05 2.1-.9.65-.65.85-2.15.85-2.15s.2-1.75.2-3.5V11c0-1.75-.2-3.5-.2-3.5zM9.95 14.6V8.9l5.6 2.85-5.6 2.85z" />
    </svg>
  );
}
