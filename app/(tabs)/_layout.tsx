import { Tabs } from 'expo-router';
import React from 'react';

import { WellnessTabBar } from '@/components/wellness-tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <WellnessTabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Eşlikçi' }} />
      <Tabs.Screen name="simdi" options={{ title: 'Şimdi' }} />
      <Tabs.Screen name="kesfet" options={{ title: 'Keşfet' }} />
      <Tabs.Screen name="ben" options={{ title: 'Ben' }} />
    </Tabs>
  );
}
