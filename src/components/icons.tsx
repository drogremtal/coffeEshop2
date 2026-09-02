interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const base = (className?: string) => className ?? "w-5 h-5";

export function BeanIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <g transform="rotate(28 12 12)">
        <ellipse cx="12" cy="12" rx="6.5" ry="8.8" />
        <path d="M12 3.2c-2.4 2.7-2.4 5.9 0 8.8s2.4 6.1 0 8.8" />
      </g>
    </svg>
  );
}

export function CupIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M7 14h15v4.5A7.5 7.5 0 0 1 14.5 26 7.5 7.5 0 0 1 7 18.5V14Z" />
      <path d="M22 15.5h1.8a3.2 3.2 0 0 1 0 6.4h-2.4" />
      <path d="M5 29h19" />
      <path className="steam s1" d="M11.5 10.5c0-2 1.8-2 1.8-4" />
      <path className="steam s2" d="M15.5 10.5c0-2 1.8-2 1.8-4" />
      <path className="steam s3" d="M19 10.5c0-1.4 1.2-1.6 1.4-3" />
    </svg>
  );
}

export function FlameIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M12 3c.8 3.2 5.2 5.2 5.2 9.4a5.2 5.2 0 0 1-10.4 0c0-1.9.9-3.4 2-5 .5 1.6 1.4 2.3 2.4 2.4C10.6 7.4 10.9 5 12 3Z" />
      <path d="M12 20.5a2.6 2.6 0 0 1-2.6-2.6c0-1.5 1.1-2.4 2.6-4 1.5 1.6 2.6 2.5 2.6 4A2.6 2.6 0 0 1 12 20.5Z" />
    </svg>
  );
}

export function LeafIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M20 4C10.5 4 5 9 5 19c10 0 15-5.5 15-15Z" />
      <path d="M5 19c4-6 9-11 15-15" />
    </svg>
  );
}

export function MountainIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="m2.5 19 6.5-11 3 4.6L16 6.5 21.5 19" />
      <path d="M2.5 19h19" />
      <circle cx="6" cy="5.5" r="1.6" />
    </svg>
  );
}

export function DropIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M12 3.5s6 6.4 6 10.7a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5Z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  );
}

export function SearchIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.4-3.4" />
    </svg>
  );
}

export function BagIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M6 8h12l1.1 12H4.9L6 8Z" />
      <path d="M9 10.5V6a3 3 0 0 1 6 0v4.5" />
    </svg>
  );
}

export function PlusIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)} aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

export function XIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ArrowIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M4 12h16m-6.5-6.5L20 12l-6.5 6.5" />
    </svg>
  );
}

export function TruckIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M2.5 7.5h11v8.5h-11z" />
      <path d="M13.5 10h3.8l3.2 3.2v2.8h-7" />
      <circle cx="6.6" cy="17.6" r="1.9" />
      <circle cx="16.6" cy="17.6" r="1.9" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-hidden="true">
      <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.2 6L12 16.8 6.5 19.6l1.2-6L3.2 9.4l6.1-.8L12 3Z" />
    </svg>
  );
}

export function TimerIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.6 2.6M9.5 2.5h5" />
    </svg>
  );
}

export function ThermoIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M10 4a2 2 0 0 1 4 0v9.3a4.2 4.2 0 1 1-4 0V4Z" />
      <path d="M12 10v7" />
    </svg>
  );
}

export function ScaleIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M12 3.5V6M5 6h14" />
      <path d="m7 6-2.6 6.2a3 3 0 0 0 5.2 0L7 6ZM17 6l-2.6 6.2a3 3 0 0 0 5.2 0L17 6Z" />
      <path d="M9 21h6M12 6v15" />
    </svg>
  );
}

export function GrindIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M5 4h14l-1.5 8a5.5 5.5 0 0 1-11 0L5 4Z" />
      <path d="M12 12v4.5M9 21h6M12 16.5V21" />
      <circle cx="10" cy="7" r="0.4" fill="currentColor" />
      <circle cx="13.5" cy="8.5" r="0.4" fill="currentColor" />
      <circle cx="12" cy="6" r="0.4" fill="currentColor" />
    </svg>
  );
}

export function RoastDots({ level, className = "" }: { level: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`Roast level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-[7px] h-[7px] rounded-full transition-colors ${
            i <= level ? "bg-caramel-400" : "bg-bark-500"
          }`}
        />
      ))}
    </span>
  );
}
