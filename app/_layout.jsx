
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import LoginScreen from './(auth)/LoginScreen';




export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

    if (!publishableKey) {
        throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
    }

    const [fontsLoaded] = useFonts({
        "tinos": require("./../assets/fonts/Tinos-Regular.ttf"),
        "tinos-bold": require("./../assets/fonts/Tinos-Bold.ttf"),
        "tinos-italic": require("./../assets/fonts/Tinos-Italic.ttf"),
    });

    return (
        <ClerkProvider publishableKey={publishableKey}>
            <ClerkLoaded>
                <SignedIn>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                </SignedIn>
                <SignedOut>
                    <LoginScreen />
                </SignedOut>
            </ClerkLoaded>
        </ClerkProvider>
    );
}