import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useRouter } from 'expo-router';




export default function Category({explore = false, onCategorySelect}) {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        try {
            setIsLoading(true);
            const q = query(collection(db, "Category"));
            const querySnapshot = await getDocs(q);

            const categoryList = [];
            // Add debug logging to check for duplicate IDs
            const seenIds = new Set();

            querySnapshot.forEach((doc) => {
                const docId = doc.id;
                if (seenIds.has(docId)) {
                    console.warn(`Duplicate document ID found: ${docId}`);
                }
                seenIds.add(docId);

                categoryList.push({
                    id: docId,
                    ...doc.data()
                });
            });

            // Ensure no duplicate IDs in final list
            const uniqueCategories = categoryList.filter((category, index, self) =>
                index === self.findIndex((c) => c.id === category.id)
            );

            setCategoryList(uniqueCategories);
        } catch (error) {
            console.error('Error fetching category:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryPress = (category) => {
        if (!explore) {
            router.push(`/business/${encodeURIComponent(category.name)}`);
        } else {
            onCategorySelect(category.name)
        }
        
    };

    // Fixed renderItem to properly destructure index
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={(category) => handleCategoryPress(item)}
        >
            <View style={{
                width: 60,
                height: 60,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 99
            }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.icon }}
                        style={styles.categoryImage}
                        resizeMode="cover"
                    />
                </View>
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            {!explore &&
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
                    Categorias
                </Text>
                <Text style={{ color: Colors.light.tint }}>Ver todas</Text>
            </View>}
            {isLoading ? (
                <ActivityIndicator size="small" color="#0005" />
            ) : (
                <FlatList
                    data={categoryList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}

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
        width: 35,
        height: 35,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    categoryName: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10
    }
});