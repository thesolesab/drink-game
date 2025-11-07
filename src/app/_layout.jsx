import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

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
        title:'Settings',
        headerTitleAlign: 'center',
      }}
    />
  </Stack>
);
}
