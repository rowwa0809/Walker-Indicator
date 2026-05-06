import Link from "next/link";

// Walker + radar lockup, preserved from v0.2.
export default function BrandLockup({ asLink = true, subtitle = "Option Trading · Macro Economic Radar" }) {
  const inner = (
    <>
      <svg className="brand-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.55" />
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
        <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="32" y1="4" x2="32" y2="60" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="4" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
        <path d="M32 32 L32 6 A26 26 0 0 1 56 32 Z" fill="currentColor" fillOpacity="0.18" />
        <path
          d="M30.5 22.5a2 2 0 1 1 0-0.01zM26 46l3.5-11 2.5 3.5 5-1.5v6h-3v8h-3l-1-7-2 2z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M40 28l9-9m0 0h-6m6 0v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="brand-text">
        <strong>Walker Indicator</strong>
        <small>{subtitle}</small>
      </span>
    </>
  );

  if (!asLink) return <div className="brand-lockup">{inner}</div>;
  return (
    <Link href="/" className="brand-lockup" aria-label="Walker Indicator home">
      {inner}
    </Link>
  );
}
