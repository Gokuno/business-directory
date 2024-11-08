import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
      <View style={{
          padding: 20,
          backgroundColor: '#fff',
          height: '28%'
    }}>
          <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15,
          }}>Acerca de Nosotros</Text>
          <Text style={{
              fontSize: 16,
              lineHeight: 24
          }}>{business?.descripcion}</Text>
    </View>
  )
}