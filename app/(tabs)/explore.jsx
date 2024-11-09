import ExploreBusinessList from '@/components/Explore/ExploreBusinessList';
import Category from '@/components/home/Category';
import { db } from '@/configs/FirebaseConfig';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function ExploreScreen() {
    const [businessList, setBusinessList] = useState([]);

    const getBusinessListByCategory = async (category) => {
        try {
            // Clear previous results
            setBusinessList([]);
            
            const q = query(collection(db, 'BusinessList'), where('category', '==', category));
            const querySnapshot = await getDocs(q);
            const businesses = [];
            
            querySnapshot.forEach((doc) => {
                businesses.push({ id: doc.id, ...doc.data() });
            });
            
            setBusinessList(businesses);
        } catch (error) {
            console.error('Error fetching businesses:', error);
        }
    }

    return (
        <View style={{
            marginVertical: 50,
            padding: 20,
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 25,
            }}>Explora mas</Text>
            <View style={styles.searchContainer}>
                <AntDesign name="search1" size={20} color={Colors.light.icon} />
                <TextInput
                    placeholder="Buscar negocio..."
                    style={styles.searchInput}
                    placeholderTextColor={Colors.light.icon}
                />
            </View>
            <Category
                explore={true}
                onCategorySelect={(category) => getBusinessListByCategory(category)}
            />
            <ExploreBusinessList
                businessList={businessList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.icon,
        marginTop: 20,
        marginBottom: 30
    },
    searchInput: {
        marginLeft: 10,
        flex: 1,
    }
});