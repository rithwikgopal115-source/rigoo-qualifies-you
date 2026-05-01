export const IconGrid = ({ color, spin = true }: { color: string; spin?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 26 26" fill="none" className={spin ? "anim-spin-cw" : ""}>
    <rect x="1" y="1" width="10" height="10" stroke={color} strokeWidth="0.75" />
    <rect x="15" y="1" width="10" height="10" stroke={color} strokeWidth="0.75" />
    <rect x="1" y="15" width="10" height="10" stroke={color} strokeWidth="0.75" />
    <rect x="15" y="15" width="10" height="10" stroke={color} strokeWidth="0.75" />
    <circle cx="13" cy="13" r="1.5" fill={color} />
  </svg>
);

export const IconFan = ({ color }: { color: string }) => (
  <svg width="26" height="32" viewBox="0 0 28 34" fill="none">
    <line x1="14" y1="22" x2="14" y2="33" stroke={color} strokeWidth="1" />
    <g style={{ animation: "spinCW 3s linear infinite", transformOrigin: "14px 18px" }}>
      <path d="M14 18 Q11 10 14 4 Q17 10 14 18" fill={color} />
      <path d="M14 18 Q22 15 28 18 Q22 21 14 18" fill={color} />
      <path d="M14 18 Q17 26 14 32 Q11 26 14 18" fill={color} />
      <path d="M14 18 Q6 21 0 18 Q6 15 14 18" fill={color} />
      <circle cx="14" cy="18" r="2.5" fill={color} />
    </g>
  </svg>
);

export const IconBrandR = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 34 34" fill="none">
    <rect x="0.5" y="0.5" width="33" height="33" stroke={color} strokeWidth="0.75" />
    <text x="17" y="23" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="200" fill={color}>R</text>
  </svg>
);
