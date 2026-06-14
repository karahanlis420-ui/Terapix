import React from 'react';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';

type MascotProps = {
  size?: number;
};

/**
 * Terapix maskotu: parlayan, yapraklı sevimli filiz.
 * Tamamen SVG ile çizildi (harici görsel gerektirmez).
 */
export function Mascot({ size = 220 }: MascotProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="glow" cx="50%" cy="48%" r="50%">
          <Stop offset="0%" stopColor="#FFF4CF" stopOpacity={0.95} />
          <Stop offset="55%" stopColor="#FBEFC9" stopOpacity={0.5} />
          <Stop offset="100%" stopColor="#FBEFC9" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="body" cx="50%" cy="38%" r="65%">
          <Stop offset="0%" stopColor="#E7F1DB" />
          <Stop offset="55%" stopColor="#C6DEB3" />
          <Stop offset="100%" stopColor="#AECB97" />
        </RadialGradient>
      </Defs>

      {/* Arka plan yumuşak bej blob */}
      <Ellipse cx="100" cy="104" rx="86" ry="76" fill="#EAE2D0" opacity={0.55} />

      {/* Dekoratif bej yapraklar */}
      <Path
        d="M150 132 C168 126 176 138 172 150 C158 152 148 144 150 132 Z"
        fill="#D9C9A8"
        opacity={0.55}
      />
      <Path
        d="M48 138 C34 134 28 144 32 154 C44 154 52 148 48 138 Z"
        fill="#D9C9A8"
        opacity={0.45}
      />

      {/* Parıltı (glow) */}
      <Circle cx="100" cy="106" r="72" fill="url(#glow)" />

      {/* Sap ve yapraklar */}
      <Path d="M100 64 L100 44" stroke="#88B06E" strokeWidth={4} strokeLinecap="round" />
      <Path
        d="M100 50 C110 34 128 32 138 36 C130 50 112 52 100 50 Z"
        fill="#9DC182"
      />
      <Path
        d="M100 52 C90 38 74 35 64 39 C72 52 88 56 100 52 Z"
        fill="#AECB8F"
      />

      {/* Gövde */}
      <Path
        d="M100 60
           C132 60 145 86 145 112
           C145 144 126 162 100 162
           C74 162 55 144 55 112
           C55 86 68 60 100 60 Z"
        fill="url(#body)"
      />

      {/* Ayaklar */}
      <Ellipse cx="84" cy="161" rx="11" ry="8" fill="#AECB97" />
      <Ellipse cx="116" cy="161" rx="11" ry="8" fill="#AECB97" />

      {/* Kollar */}
      <Ellipse cx="57" cy="120" rx="8" ry="11" fill="#B6D2A0" />
      <Ellipse cx="143" cy="120" rx="8" ry="11" fill="#B6D2A0" />

      {/* Yanaklar */}
      <Circle cx="75" cy="120" r="7" fill="#EFB1A8" opacity={0.6} />
      <Circle cx="125" cy="120" r="7" fill="#EFB1A8" opacity={0.6} />

      {/* Gözler */}
      <G>
        <Ellipse cx="86" cy="106" rx="6.5" ry="8.5" fill="#4A3B30" />
        <Ellipse cx="114" cy="106" rx="6.5" ry="8.5" fill="#4A3B30" />
        <Circle cx="88.5" cy="103" r="2.2" fill="#FFFFFF" />
        <Circle cx="116.5" cy="103" r="2.2" fill="#FFFFFF" />
      </G>

      {/* Gülümseme */}
      <Path
        d="M89 120 Q100 131 111 120"
        stroke="#4A3B30"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />

      {/* Parıltı yıldızları */}
      <Path
        d="M58 86 Q60 90 64 92 Q60 94 58 98 Q56 94 52 92 Q56 90 58 86 Z"
        fill="#FFFFFF"
        opacity={0.9}
      />
      <Path
        d="M146 96 Q147.5 99 151 100.5 Q147.5 102 146 105 Q144.5 102 141 100.5 Q144.5 99 146 96 Z"
        fill="#FFFFFF"
        opacity={0.85}
      />
      <Circle cx="134" cy="78" r="2.2" fill="#FFFFFF" opacity={0.8} />
      <Circle cx="64" cy="118" r="1.8" fill="#FFFFFF" opacity={0.7} />
    </Svg>
  );
}
