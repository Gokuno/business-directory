import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/home/Header';
import Slider from '@/components/home/Slider';
import Category from '@/components/home/Category';
import PopularBusiness from '@/components/home/PopularBusiness';

export default function HomeScreen() {
    return (
        <View tyle={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Header />
                {/* Slider */}
                <Slider />
                {/* Category */}
                <Category />
                {/* Popular Business List */}
                <PopularBusiness />

                <View style={{ height: 50 }}>

                </View>
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