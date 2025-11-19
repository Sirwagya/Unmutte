import * as React from "react";

export interface CustomBotIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string; // stroke/fill color override
  secondaryColor?: string; // accent color
  rounded?: boolean; // toggle rounded body corners
}

// A fresh bot icon: friendly square head with antenna, eyes, subtle mouth.
// Uses currentColor by default so parent text-* classes control color.
// secondaryColor fills accents; defaults to a slight tinted gradient fallback.
export const CustomBotIcon: React.FC<CustomBotIconProps> = ({
  size = 32,
  color = "currentColor",
  secondaryColor = "#9CA3AF",
  rounded = true,
  className,
  ...props
}) => {
  const radius = rounded ? 6 : 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Chat Bot"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="botAccent" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.9} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.4} />
        </linearGradient>
      </defs>
      {/* Antenna */}
      <circle cx={16} cy={5} r={2.5} fill={color} />
      <rect x={15} y={7} width={2} height={4} rx={1} fill={color} />
      {/* Head */}
      <rect x={6} y={11} width={20} height={14} rx={radius} stroke={color} strokeWidth={2} fill="url(#botAccent)" />
      {/* Eyes */}
      <circle cx={13} cy={18} r={2.2} fill={color} />
      <circle cx={19} cy={18} r={2.2} fill={color} />
      {/* Mouth */}
      <path d="M12 22c1.2 1.3 2.8 2 4 2s2.8-.7 4-2" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default CustomBotIcon;
