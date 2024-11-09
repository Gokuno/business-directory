import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({ business }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={{
                borderRadius: 15,
                marginTop: 15,
                backgroundColor: '#fff',
                gap: 5,
            }}
            onPress={() => router.push('/businessdetail/' + business?.id)}
        >
          <Image source={{ uri: business.imageUrl }}
            style={{
              width: '100%',
              height: 150,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
          <View style={{
            paddingLeft: 20,
            marginBottom: 10
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 2
            }}
            >
              {business.nombre}
            </Text>
            <Text style={{
              color: Colors.light.icon,
              fontSize: 16,
              marginBottom: 4
            }}>
              {business.direccion}
            </Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5
            }}>
            </View>
          </View>
        </TouchableOpacity>
      )
}