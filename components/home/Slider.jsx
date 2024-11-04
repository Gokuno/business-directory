import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { FlatList } from 'react-native'

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        GetSliderList();
    }, [])

    const GetSliderList = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const q = query(collection(db, 'Slider'));
            const querySnapshot = await getDocs(q);

            const lists = [];
            querySnapshot.forEach((doc) => {
                lists.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setSliderList(lists);
        } catch (error) {
            console.error('Error fetching slider images:', error);
            setError('Carga de image fallida')
        } finally {
            setIsLoading(false);
        }
    }

    // Separate render item function for better readability
    const renderItem = ({ item }) => (
        <Image
            source={{ uri: item.imageUrl }}
            style={styles.sliderImage}
        />
    );

    return (
        <View>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                paddingLeft: 20,
                paddingTop: 20,
                marginBottom: 5
            }}>
                Promocionales del mes
            </Text>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={sliderList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    )
};

// Separate styles for better organization
const styles = {
    container: {
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 5
    },
    listContainer: {
        paddingHorizontal: 20
    },
    sliderImage: {
        width: 300,
        height: 150,
        borderRadius: 15,
        marginRight: 15,
    }
};