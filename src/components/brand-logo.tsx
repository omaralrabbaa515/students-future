import React from "react";

interface AppLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textSize?: "sm" | "md" | "lg";
}

export function AppLogo({
  className = "",
  size = 36,
  showText = false,
  textSize = "md",
}: AppLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Luxury Royal Academic Logo Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105 select-none drop-shadow-sm"
        aria-label="شعار منصة الطلاب والمستقبل الأردنية"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="primaryShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="emeraldTech" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="cyanSpark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield / Geometric Badge */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="24"
          fill="url(#primaryShield)"
          stroke="url(#goldGlow)"
          strokeWidth="2.5"
        />

        {/* Subtle Tech Circuit Grid lines inside badge */}
        <path
          d="M20 50 H32 M68 50 H80 M50 20 V28 M50 72 V80"
          stroke="#334155"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="50" r="2.5" fill="#38BDF8" />
        <circle cx="68" cy="50" r="2.5" fill="#38BDF8" />
        <circle cx="50" cy="28" r="2.5" fill="#FBBF24" />
        <circle cx="50" cy="72" r="2.5" fill="#34D399" />

        {/* Royal Crown Crest Silhouette (representing Jordan's Hashemite Heritage) */}
        <path
          d="M34 36 L42 42 L50 32 L58 42 L66 36 L63 46 H37 Z"
          fill="url(#goldGlow)"
          opacity="0.95"
        />

        {/* Academic Graduation Mortarboard */}
        <polygon
          points="50,42 76,53 50,64 24,53"
          fill="url(#cyanSpark)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />

        {/* Mortarboard Under-Cap */}
        <path
          d="M36 58 C36 67 64 67 64 58"
          fill="none"
          stroke="url(#emeraldTech)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Graduation Tassel with Golden Tip */}
        <path
          d="M50 53 Q66 57 70 66"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="70" cy="66" r="2.5" fill="#F59E0B" />

        {/* Central Intelligence Spark / Star */}
        <polygon
          points="50,49 52,53 56,53 53,55 54,59 50,56 46,59 47,55 44,53 48,53"
          fill="#FFFFFF"
          filter="url(#glow)"
        />

        {/* Jordanian Star in Royal Gold at Base */}
        <circle cx="50" cy="80" r="3" fill="url(#goldGlow)" />
      </svg>

      {showText && (
        <div className="flex flex-col text-right leading-tight select-none">
          <span
            className={`font-display font-extrabold tracking-tight text-foreground ${
              textSize === "sm"
                ? "text-sm"
                : textSize === "lg"
                  ? "text-xl sm:text-2xl"
                  : "text-base sm:text-lg"
            }`}
          >
            الطلاب <span className="text-primary font-black">والمستقبل</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
            <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            المنصة الأكاديمية والمهنية المعتمدة
          </span>
        </div>
      )}
    </div>
  );
}
