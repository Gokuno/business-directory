import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/home/Header';

export default function HomeScreen() {
    return (
        <View tyle={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Header />
                {/* Slider */}

                {/* Category */}

                {/* Popular Business List */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    }
});