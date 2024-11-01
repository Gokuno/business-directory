
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.light.tint
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <AntDesign name="profile" size={24} color={color} />
                }}
            />
        </Tabs>
    );
}