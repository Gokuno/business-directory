import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { FlatList } from 'react-native';
import BusinessListCard from '@/components/Explore/BusinessListCard';
import { Colors } from '@/constants/Colors';

export default function MyBusiness() {
  const [businessList, setBusinessList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();


  useEffect(() => {
    user && getUserBusiness();
  }, [user]);

  const getUserBusiness = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
       // Clear the previous business list
      setBusinessList([]);

      const q = query(collection(db, 'BusinessList'), 
        where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
      const snapShot = await getDocs(q);
      
      const business = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBusinessList(business);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching businesses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <View style={{ padding: 20, marginTop: 50 }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Mi Negocio</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.light.icon} />
      ) : (
        <FlatList
          data={businessList}
          onRefresh={getUserBusiness}
          refreshing={isLoading}  
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BusinessListCard business={item} />
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
             No se encontro negocio
            </Text>
          )}
        />
      )}
    </View>
  )
}