type Props = { size?: number; className?: string; filled?: boolean };

export default function PlusIcon({ size = 24, className = "", filled = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      {filled ? (
        // Rounded square with a plus, similar to solid style
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" />
          <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
