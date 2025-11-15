import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import StoreHydration from "../components/StoreHydration";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    WDXRegular: require('../../assets/fonts/WDX-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <StoreHydration>
      <Stack >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="generator"
          // header выключаем на корневом уровне — его будет рисовать вложенный Stack в generator/_layout.jsx
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="roulette"
          // header выключаем на корневом уровне — его будет рисовать вложенный Stack в roulette/_layout.jsx
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </StoreHydration>
  );
}
