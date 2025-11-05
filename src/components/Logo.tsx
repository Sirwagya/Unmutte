import { Volume2 } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Heart + Wave Logo */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Outer heart shape with wave */}
          <path
            d="M24 42C24 42 6 30 6 18C6 13 9 9 14 9C17 9 20 11 24 15C28 11 31 9 34 9C39 9 42 13 42 18C42 30 24 42 24 42Z"
            fill="url(#gradient1)"
          />
          
          {/* Sound wave inside heart */}
          <path
            d="M24 20V28M20 22V26M28 22V26M16 24V24M32 24V24"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient1" x1="6" y1="9" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7CB9E8" />
              <stop offset="50%" stopColor="#BFA2DB" />
              <stop offset="100%" stopColor="#F8C8DC" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-semibold bg-gradient-to-r from-[#7CB9E8] via-[#BFA2DB] to-[#F8C8DC] bg-clip-text text-transparent">
            Unmutte
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            Where feelings find freedom.
          </span>
        </div>
      )}
    </div>
  );
}
