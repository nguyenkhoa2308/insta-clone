type Props = { size?: number; className?: string; filled?: boolean };

export default function UserIcon({ size = 24, className = "", filled = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {filled ? (
        <>
          <path d="M19 20c0-3.314-3.134-6-7-6s-7 2.686-7 6v1h14v-1Z" fill="currentColor" stroke="none" />
          <circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" />
        </>
      ) : (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
        </>
      )}
    </svg>
  );
}
