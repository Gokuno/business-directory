import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";

export default function RootLayout() {
  useFonts({
    'tinos': require('./../assets/fonts/Tinos-Regular.ttf'),
    'tinos-bold': require('./../assets/fonts/Tinos-Bold.ttf'),
    'tinos-italic': require('./../assets/fonts/Tinos-Italic.ttf'),
  })
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
