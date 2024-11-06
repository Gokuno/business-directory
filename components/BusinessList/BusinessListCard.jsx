import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function BusinessListCard({ businesses }) {
  return (
    <View style={{
      padding: 10,
      margin: 10,
      borderRadius: 15,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
    }}>
      <Image source={{ uri: businesses.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View style={{
        flex: 1,
        gap: 10
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 2
        }}
        >
          {businesses.nombre}
        </Text>
        <Text style={{
          color: Colors.light.icon,
          fontSize: 16,
          marginBottom: 4
        }}>
          {businesses.direccion}
        </Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5
        }}>
          <Image source={require('./../../assets/images/star.png')} style={{
            width: 20,
            height: 20
          }} />
          <Text style={{ fontSize: 16 }}>5.0</Text>
        </View>
      </View>
    </View>
  )
}