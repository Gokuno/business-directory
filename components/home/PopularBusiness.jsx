import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';

export default function PopularBusiness() {
    const [businessList, setBusinessList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Add error state if you want to handle errors
    const [error, setError] = useState(null);

    // Properly declare the function using const
    const getBusinessList = async () => {
        try {
            setIsLoading(true);
            const q = query(collection(db, 'BusinessList'), limit(10));
            const querySnapshot = await getDocs(q);

            const businessList = [];
            const seenIds = new Set();

            querySnapshot.forEach((doc) => {
                const docId = doc.id;
                if (seenIds.has(docId)) {
                    console.warn(`Duplicate document ID found: ${docId}`);
                }
                seenIds.add(docId);

                businessList.push({
                    id: docId,
                    ...doc.data()
                });
            });

            const uniqueBusiness = businessList.filter((business, index, self) =>
                index === self.findIndex((c) => c.id === business.id)
            );

            setBusinessList(uniqueBusiness);
        } catch (error) {
            console.error('Error fetching list:', error);
            setError('Carga de lista fallida');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBusinessList();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                // Add null check for item
                if (item && item.nombre) {
                    console.log('BusinessList pressed:', item.nombre);
                } else {
                    console.log('Item or item name is undefined:', item);
                }
            }}
        >
            <View style={{
                marginLeft: 20,
                padding: 10,
                backgroundColor: '#fff',
                borderRadius: 15
            }}>
                <Image
                    source={{ uri: item?.imageUrl }}
                    style={{
                        width: 200,
                        height: 130,
                        borderRadius: 15,
                    }}
                />
                <View style={{ marginTop: 8, gap: 5 }}>
                    <Text style={{ color: Colors.light.icon, marginTop: 2 }}>
                        {item.category}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>
                        {item.nombre}
                    </Text>
                    <Text style={{ color: Colors.light.icon, fontSize: 14, marginBottom: 4 }}>
                        {item.direccion}
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                        <Image source={require('./../../assets/images/star.png')} style={{
                            width: 20,
                            height: 20
                        }} />
                        <Text>5.0</Text>
                    </View>
                    <Text style={{
                        backgroundColor: Colors.light.tint,
                        color: '#fff',
                        padding: 4,
                        fontSize: 10,
                        borderRadius: 8
                    }}>
                        {item.category}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: 2,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>
                    Negocios Mas Populares
                </Text>
                <Text style={{ color: Colors.light.tint }}>Ver todos</Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="small" color="#0005" />
            ) : error ? (
                <Text style={{ color: 'red', padding: 20 }}>{error}</Text>
            ) : (
                <FlatList
                    data={businessList}
                    horizontal={true}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `business-${item?.id || index}-${index}`}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
}