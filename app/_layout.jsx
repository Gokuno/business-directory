import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "tinos": require("./../assets/fonts/Tinos-Regular.ttf"),
        "tinos-bold": require("./../assets/fonts/Tinos-Bold.ttf"),
        "tinos-italic": require("./../assets/fonts/Tinos-Italic.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}