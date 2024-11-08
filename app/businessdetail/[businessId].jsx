import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { Colors } from '@/constants/Colors';
import Intro from '@/components/BusinessDetail/Intro';
import ActionButton from '@/components/BusinessDetail/ActionButton';
import About from '@/components/BusinessDetail/About';
import Reviews from '@/components/BusinessDetail/Reviews';

export default function BusinessDetail() {
    const { businessId } = useLocalSearchParams();
    const [business, setBusiness] = useState();
    const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
        if (businessId) {
            getBusinessDetailById();
        }
    }, [businessId]);

    /**
     * Used to get BusinessDetail by Id
     */
    const getBusinessDetailById = async () => {
        try {
            setIsLoading(true);
            const docRef = doc(db, 'BusinessList', businessId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setBusiness(docSnap.data());
            } else {
                console.log("No document found with ID:", businessId);
            }
        } catch (error) {
            console.error("Error fetching business details:", error);
        } finally {
            setIsLoading(false);
        }
    }
    if (isloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                    size='large'
                    color={Colors.light.icon}
                />
            </View>
        );
    }

    if (!business) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Business not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/*Intro/Header */}
                <Intro business={business} />
                {/*TODO: Redes sociales */}
                {/*Action buttons*/}
                <ActionButton business={business} />
                {/*description*/}
                
                <About business={business} />
                {/*review*/}
                <Reviews business={business} />
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