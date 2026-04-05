import React from 'react';

/**
 * TripLine Kyrgyzstan Tours — Premium Logo
 * Adaptive: white on dark, colored on light backgrounds
 */
const Logo = ({ isLight = true, size = 'md' }) => {
  const scales = { sm: 0.75, md: 1, lg: 1.25 };
  const scale = scales[size] ?? 1;

  // Color palette driven by props
  const mountainPrimary = isLight ? '#003580' : '#ffffff';
  const mountainAccent  = isLight ? '#0050c8' : '#e2eaf8';
  const snowCap         = isLight ? '#ffffff' : '#ffffff';
  const sunColor        = '#f5a623';
  const tripColor       = isLight ? '#003580' : '#ffffff';
  const lineColor       = '#f5a623';
  const subtitleColor   = isLight ? '#0050c8' : 'rgba(255,255,255,0.75)';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 52"
      width={220 * scale}
      height={52 * scale}
      role="img"
      aria-label="TripLine Kyrgyzstan Tours logo"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Sun glow */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#ffe066" stopOpacity="1" />
          <stop offset="60%" stopColor="#f5a623" stopOpacity="1" />
          <stop offset="100%" stopColor="#e8870a" stopOpacity="0.6" />
        </radialGradient>
        {/* Mountain gradient (front) */}
        <linearGradient id="mtFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={mountainPrimary} />
          <stop offset="100%" stopColor={mountainAccent} stopOpacity="0.85" />
        </linearGradient>
        {/* Mountain gradient (back) */}
        <linearGradient id="mtBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={mountainAccent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={mountainPrimary} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* ── Icon mark (mountains + sun) ── */}
      <g transform="translate(0, 4)">
        {/* Sun */}
        <circle cx="27" cy="14" r="6.5" fill="url(#sunGlow)" />
        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 27 + Math.cos(rad) * 8.5;
          const y1 = 14 + Math.sin(rad) * 8.5;
          const x2 = 27 + Math.cos(rad) * 11.5;
          const y2 = 14 + Math.sin(rad) * 11.5;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={sunColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          );
        })}

        {/* Back mountain range */}
        <polygon
          points="6,44 16,22 22,30 30,16 37,28 44,20 52,44"
          fill="url(#mtBack)"
          opacity="0.45"
        />

        {/* Front mountain (left) */}
        <polygon
          points="0,44 14,18 28,44"
          fill="url(#mtFront)"
        />
        {/* Snow cap left */}
        <polygon
          points="14,18 10,28 18,28"
          fill={snowCap}
          opacity="0.9"
        />

        {/* Front mountain (right) */}
        <polygon
          points="18,44 32,12 46,44"
          fill="url(#mtFront)"
          opacity="0.85"
        />
        {/* Snow cap right */}
        <polygon
          points="32,12 27,24 37,24"
          fill={snowCap}
          opacity="0.95"
        />

        {/* Horizon line */}
        <line x1="0" y1="44" x2="54" y2="44"
          stroke={isLight ? '#003580' : 'rgba(255,255,255,0.3)'}
          strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      </g>

      {/* ── Wordmark ── */}
      <g transform="translate(60, 0)">
        {/* TRIP */}
        <text
          x="0" y="28"
          fontFamily="'Montserrat', 'Inter', sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="-0.5"
          fill={tripColor}
        >
          TRIP
        </text>

        {/* LINE (golden accent) */}
        <text
          x="58" y="28"
          fontFamily="'Montserrat', 'Inter', sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="-0.5"
          fill={lineColor}
        >
          LINE
        </text>

        {/* Separator dot */}
        <circle cx="54" cy="22" r="2.5" fill={lineColor} />

        {/* Subtitle */}
        <text
          x="1" y="42"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="8.5"
          letterSpacing="2.2"
          fill={subtitleColor}
          textAnchor="start"
          opacity="0.85"
        >
          KYRGYZSTAN TOURS
        </text>

        {/* Underline accent */}
        <rect x="0" y="45" width="155" height="1.5"
          fill={lineColor} rx="1" opacity="0.5" />
      </g>
    </svg>
  );
};

export default Logo;
