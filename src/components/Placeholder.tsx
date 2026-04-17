import { cn } from "@/lib/utils";

interface PlaceholderProps {
  src?: string;
  filename: string;
  alt: string;
  className?: string;
  aspect?: string;
  variant?: "dark" | "light";
}

export const Placeholder = ({ src, filename, alt, className, aspect = "aspect-video", variant = "dark" }: PlaceholderProps) => {
  if (src) {
    return <img src={src} alt={alt} className={cn("w-full h-full object-cover", className)} loading="lazy" />;
  }
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center text-xs font-mono px-3 text-center",
        aspect,
        variant === "dark" ? "bg-white/5 text-white/40 border border-white/10" : "bg-black/5 text-black/40 border border-black/10",
        className,
      )}
    >
      <span>placeholder<br />{filename}</span>
    </div>
  );
};
