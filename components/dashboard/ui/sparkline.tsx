import { cn } from "@/lib/utils";

type SparklineProps = {
  data: number[];
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  fill?: boolean;
};

export function Sparkline({
  data,
  className,
  width = 120,
  height = 32,
  strokeWidth = 1.5,
  color,
  fill = false,
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((value - min) / range) * (height - padding * 2);
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const lastPoint = points[points.length - 1];
  const trend = data[data.length - 1] - data[0];
  const strokeColor =
    color ?? (trend >= 0 ? "var(--color-positive)" : "var(--color-negative)");

  const fillPath = fill
    ? `M ${points[0].x},${height} ` +
      points.map((p) => `L ${p.x},${p.y}`).join(" ") +
      ` L ${lastPoint.x},${height} Z`
    : null;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      width={width}
      height={height}
      aria-hidden
    >
      {fillPath && (
        <path
          d={fillPath}
          fill={strokeColor}
          fillOpacity={0.15}
        />
      )}
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={polylinePoints}
      />
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r={3}
        fill={strokeColor}
        stroke="white"
        strokeWidth={1.5}
        strokeOpacity={0.4}
      />
    </svg>
  );
}
