import { cn } from "@/lib/utils";

const PALETTES = [
  "from-slate-600 to-slate-700",
  "from-teal-600 to-teal-700",
  "from-blue-600 to-blue-700",
  "from-indigo-600 to-indigo-700",
  "from-emerald-600 to-emerald-700",
  "from-cyan-600 to-cyan-700",
];

function paletteForName(name: string) {
  const code = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return PALETTES[code % PALETTES.length];
}

type MemberAvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const SIZES = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
};

export function MemberAvatar({ name, size = "md", className }: MemberAvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
        paletteForName(name),
        SIZES[size],
        className,
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
