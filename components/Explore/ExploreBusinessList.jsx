import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusinessList({businessList}) {
    return (
      <FlatList
        data={businessList}
        showsVerticalScrollIndicator={false}    
        contentContainerStyle={{
          paddingBottom: 200 // Add padding to the bottom of the list
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BusinessListCard business={item} />
        )}
      />
    )
  }