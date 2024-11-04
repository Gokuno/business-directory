import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import CategoryItem from './CategoryItem';


export default function Category() {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        GetCategoryList()
    }, [])

    const GetCategoryList = async () => {
        setCategoryList([])
        const q = query(collection(db, "Category"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setCategoryList(prev => [...prev, doc.data()]);
            console.log(doc.data())
        })
    }

    return (
        <View>
            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
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
                renderItem={({ item, index }) => (
                    <CategoryItem category={item} key={index} />
                )}
            />
        </View>
    )
}