import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';




export default function Category() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        try {
            const q = query(collection(db, "Category"));
            const querySnapshot = await getDocs(q);

            const categoryList = [];
            querySnapshot.forEach((doc) => {
                // Include the document ID as a unique identifier
                categoryList.push({
                    id: doc.id, // Use Firestore's document ID
                    ...doc.data()
                });
            });

            setCategoryList(categoryList);
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => console.log('Category pressed:', item.name)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.icon }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <View>
            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: 10,
                marginBottom: 10
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                    Categorias
                </Text>
                <Text style={{ color: Colors.light.tint }}>Ver todas</Text>
            </View>

            <FlatList
                data={categoryList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    categoryItem: {
        marginRight: 4,
        alignItems: 'center',
        width: 100,
    },
    imageContainer: {
        width: 40,
        height: 40,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryName: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
    }
});