import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Mascot } from '@/components/mascot';

/**
 * Maskotu "canlı" gösterir: nefes alır gibi yumuşakça büyüyüp küçülür
 * ve hafifçe yukarı-aşağı süzülür. (reanimated, sürekli döngü)
 */
export function AnimatedMascot({ size = 200 }: { size?: number }) {
  const scale = useSharedValue(1);
  const float = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.05, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    float.value = withRepeat(
      withTiming(-8, { duration: 2600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [scale, float]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={style}>
      <Mascot size={size} />
    </Animated.View>
  );
}
