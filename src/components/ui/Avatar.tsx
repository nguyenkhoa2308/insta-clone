import Image from "next/image";
import { cn } from "~/lib/utils";

type Props = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

export default function Avatar({ src, alt, size = 36, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-black/5 dark:bg-white/10 shrink-0",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
}

