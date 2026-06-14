import React from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import type { MoodKey } from '@/constants/palette';

type MoodFaceProps = {
  variant: MoodKey;
  color: string;
  size?: number;
};

/**
 * Ruh hali kartlarındaki yüzler. Her biri dolu daire üzerine
 * basit yüz çizgileriyle (göz + ağız) oluşturulur.
 */
export function MoodFace({ variant, color, size = 56 }: MoodFaceProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Circle cx="32" cy="32" r="30" fill={color} />
      {renderFeatures(variant)}
    </Svg>
  );
}

const stroke = '#3F3A33';

function renderFeatures(variant: MoodKey) {
  switch (variant) {
    case 'good':
      return (
        <>
          <Circle cx="23" cy="27" r="3" fill={stroke} />
          <Circle cx="41" cy="27" r="3" fill={stroke} />
          <Path
            d="M22 38 Q32 49 42 38"
            stroke={stroke}
            strokeWidth={3.2}
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    case 'ok':
      return (
        <>
          <Circle cx="23" cy="28" r="3" fill={stroke} />
          <Circle cx="41" cy="28" r="3" fill={stroke} />
          <Line
            x1="24"
            y1="42"
            x2="40"
            y2="42"
            stroke={stroke}
            strokeWidth={3.2}
            strokeLinecap="round"
          />
        </>
      );
    case 'tired':
      return (
        <>
          {/* Yorgun / uykulu gözler (yumuşak kapalı) */}
          <Path
            d="M19 29 Q24 33 29 29"
            stroke={stroke}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M35 29 Q40 33 45 29"
            stroke={stroke}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          {/* Küçük ağız */}
          <Path
            d="M27 43 Q32 40 37 43"
            stroke={stroke}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    case 'hard':
      return (
        <>
          {/* Endişeli kaşlar */}
          <Path
            d="M20 23 L29 26"
            stroke={stroke}
            strokeWidth={2.6}
            strokeLinecap="round"
          />
          <Path
            d="M44 23 L35 26"
            stroke={stroke}
            strokeWidth={2.6}
            strokeLinecap="round"
          />
          <Circle cx="24" cy="31" r="3" fill={stroke} />
          <Circle cx="40" cy="31" r="3" fill={stroke} />
          {/* Üzgün ağız */}
          <Path
            d="M23 45 Q32 37 41 45"
            stroke={stroke}
            strokeWidth={3.2}
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
  }
}
