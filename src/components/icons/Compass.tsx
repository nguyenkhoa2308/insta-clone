type Props = { size?: number; className?: string; filled?: boolean };

export default function CompassIcon({ size = 24, className = "", filled = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      {/* Outer circle remains stroked for clarity */}
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      {filled ? (
        <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" fill="currentColor" />
      ) : (
        <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
