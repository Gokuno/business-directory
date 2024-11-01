// components/home/Header.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View>
                    <Text style={styles.welcomeText}>Welcome!</Text>
                    <Text style={styles.locationText}>
                        <AntDesign name="enviromento" size={18} color={Colors.dark.text} />{' '}
                        Hermosillo, Son
                    </Text>
                </View>
                <View style={styles.avatarContainer}>
                    <AntDesign name="user" size={24} color={Colors.light.text} />
                </View>
            </View>
            <View style={styles.searchContainer}>
                <AntDesign name="search1" size={20} color={Colors.light.icon} />
                <TextInput
                    placeholder="Search businesses..."
                    style={styles.searchInput}
                    placeholderTextColor={Colors.light.icon}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.light.tint,
        width: '100%'
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40
    },
    welcomeText: {
        fontFamily: 'tinos-bold',
        fontSize: 24,
        color: Colors.dark.text
    },
    locationText: {
        fontFamily: 'tinos',
        fontSize: 16,
        color: Colors.light.tabIconDefault,
        marginTop: 5,
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginTop: 20
    },
    searchInput: {
        marginLeft: 10,
        flex: 1,
        fontFamily: 'tinos'
    }
});