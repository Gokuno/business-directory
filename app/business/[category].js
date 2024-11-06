import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import BusinessListCard from '@/components/BusinessList/BusinessListCard';
import { Colors } from '@/constants/Colors';

export default function BusinessListByCategory() {
    const { category } = useLocalSearchParams();
    const navigation = useNavigation();
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Set the header title dynamically when the component mounts
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        });
        getBusinessesByCategory();
    }, [category]);


    const getBusinessesByCategory = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "BusinessList"),
                where("category", "==", category)
            );

            const querySnapshot = await getDocs(q);
            const businessList = [];

            querySnapshot.forEach((doc) => {
                businessList.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setBusinesses(businessList);
        } catch (error) {
            console.error('Error fetching businesses:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0005" />
            </View>
        );
    }

    return (
        <View>
            {businesses?.length > 0 ?
                <FlatList
                    data={businesses}
                    refreshing={loading}
                    onRefresh={getBusinessesByCategory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <BusinessListCard
                            businesses={item}
                        />
                    )}
                /> :
                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '25%', color: Colors.light.icon }}> No se encontraron negocios en esta categoria</Text>
            }
        </View>
    );
}