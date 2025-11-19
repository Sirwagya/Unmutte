import * as React from "react";

export interface StressLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string; // main fill color
}

// Simple rotating badge/logo for the stress game; default black for visibility.
const StressLogo: React.FC<StressLogoProps> = ({ size = 64, color = "#111827", className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-label="Stress Game Logo"
    className={className}
    {...props}
  >
    {/* Base rounded square */}
    <rect x="6" y="6" width="52" height="52" rx="12" fill={color} />
    {/* Small cut/shine */}
    <path d="M24 14c8-4 16-4 24 0" stroke="white" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
    {/* Face suggestive mark */}
    <circle cx="26" cy="30" r="4" fill="white" opacity="0.14" />
    <circle cx="38" cy="30" r="4" fill="white" opacity="0.14" />
    <path d="M23 40c3 3 15 3 18 0" stroke="white" strokeOpacity="0.14" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default StressLogo;
