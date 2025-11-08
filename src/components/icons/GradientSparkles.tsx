import React, { useId } from "react";
import { Sparkles } from "lucide-react";

export interface GradientSparklesProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  from?: string;
  via?: string;
  to?: string;
}

// Renders the Lucide Sparkles icon with a gradient stroke by masking a gradient-filled rect.
const GradientSparkles: React.FC<GradientSparklesProps> = ({
  className,
  size = 96,
  strokeWidth = 2,
  from = "#A78BFA", // purple-400
  via = "#60A5FA",  // blue-400
  to = "#F472B6",   // pink-400
}) => {
  const reactId = useId().replace(/[:]/g, "");
  const gradId = `sparkles-grad-${reactId}`;
  const maskId = `sparkles-mask-${reactId}`;

  // Use 100% sizing so Tailwind width/height classes can control dimensions
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="50%" stopColor={via} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {/* Sparkles drawn in solid white so it becomes the visible area of the mask */}
          <Sparkles color="#ffffff" size={24} strokeWidth={strokeWidth} />
        </mask>
      </defs>

      {/* Gradient fill clipped to Sparkles strokes via the mask */}
      <rect x="0" y="0" width="24" height="24" fill={`url(#${gradId})`} mask={`url(#${maskId})`} />
    </svg>
  );
};

export default GradientSparkles;
