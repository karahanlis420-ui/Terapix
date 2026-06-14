import React from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
} from 'react-native-svg';

import type { SceneKind } from '@/lib/scenes/scenes';

type Props = { kind: SceneKind; width?: number; height?: number };

/** Sakinleştirici, soyut SVG sahneler (harici görsel gerektirmez). */
export function SceneArt({ kind, width = 320, height = 200 }: Props) {
  return (
    <View style={{ width, height, borderRadius: 22, overflow: 'hidden' }}>
      <Svg width={width} height={height} viewBox="0 0 320 200">
        {kind === 'sunrise' && <Sunrise />}
        {kind === 'night' && <Night />}
        {kind === 'sea' && <Sea />}
        {kind === 'forest' && <Forest />}
      </Svg>
    </View>
  );
}

function Sunrise() {
  return (
    <>
      <Defs>
        <LinearGradient id="sky-sun" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCE3B8" />
          <Stop offset="1" stopColor="#F6C58A" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="320" height="200" fill="url(#sky-sun)" />
      <Circle cx="160" cy="120" r="40" fill="#FBB45C" opacity={0.95} />
      <Circle cx="160" cy="120" r="58" fill="#FBB45C" opacity={0.25} />
      <Path d="M0 150 Q90 110 180 150 T320 150 V200 H0 Z" fill="#E0A874" />
      <Path d="M0 172 Q110 138 220 172 T320 168 V200 H0 Z" fill="#C98F5E" />
    </>
  );
}

function Night() {
  return (
    <>
      <Defs>
        <LinearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#2A2E55" />
          <Stop offset="1" stopColor="#4C4F7D" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="320" height="200" fill="url(#sky-night)" />
      <Circle cx="235" cy="60" r="28" fill="#F3EFD6" />
      <Circle cx="245" cy="54" r="24" fill="#3C406B" />
      <Circle cx="60" cy="45" r="2" fill="#FFFFFF" />
      <Circle cx="100" cy="70" r="1.6" fill="#FFFFFF" />
      <Circle cx="140" cy="40" r="2.2" fill="#FFFFFF" />
      <Circle cx="180" cy="80" r="1.5" fill="#FFFFFF" />
      <Circle cx="40" cy="95" r="1.8" fill="#FFFFFF" />
      <Circle cx="120" cy="110" r="1.4" fill="#FFFFFF" />
      <Path d="M0 160 Q80 130 170 160 T320 155 V200 H0 Z" fill="#232746" />
    </>
  );
}

function Sea() {
  return (
    <>
      <Defs>
        <LinearGradient id="sky-sea" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#CFEAF2" />
          <Stop offset="1" stopColor="#A6D2E0" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="320" height="200" fill="url(#sky-sea)" />
      <Circle cx="160" cy="70" r="30" fill="#FCE3A8" />
      <Path d="M0 110 H320 V200 H0 Z" fill="#7FB8CC" />
      <Path d="M0 110 Q40 100 80 110 T160 110 T240 110 T320 110 V120 H0 Z" fill="#9CCBD9" />
      <Path d="M0 135 Q50 127 100 135 T200 135 T300 135 T320 135 V150 H0 Z" fill="#6FA9BE" opacity={0.7} />
    </>
  );
}

function Forest() {
  return (
    <>
      <Defs>
        <LinearGradient id="sky-forest" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E7F2DC" />
          <Stop offset="1" stopColor="#CBE4BB" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="320" height="200" fill="url(#sky-forest)" />
      <Circle cx="250" cy="55" r="24" fill="#F6E2A8" />
      <Path d="M0 165 H320 V200 H0 Z" fill="#A9CB98" />
      <Polygon points="70,160 50,160 60,120" fill="#6E8C6A" />
      <Polygon points="74,160 46,160 60,135" fill="#7FA877" />
      <Polygon points="135,165 110,165 122,110" fill="#5E7E5A" />
      <Polygon points="140,165 105,165 122,128" fill="#6E8C6A" />
      <Polygon points="210,162 188,162 199,122" fill="#6E8C6A" />
      <Polygon points="214,162 184,162 199,136" fill="#7FA877" />
    </>
  );
}
