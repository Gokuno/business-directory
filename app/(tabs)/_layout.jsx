import React from 'react';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from './../../constants/Colors';
import { useSession } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function TabLayout() {
    const { session } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!session) {
            router.replace('/(auth)/login');
        }
    }, [session]);

    if (!session) return null; // Do not render until session is verified

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.light.tint
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explorar",
                    tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => <AntDesign name="profile" size={24} color={color} />
                }}
            />
        </Tabs>
    );
}