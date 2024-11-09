import { View, Text, FlatList, Image, Linking } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function MenuList() {

  const menuList = [
    {
      id: 1,
      name: 'Agregar Negocio',
      icon: require('./../../assets/images/add.png'),
      path:''
    },
    {
      id: 2,
      name: 'Mi Negocio',
      icon: require('./../../assets/images/business-and-trade.png'),
      path:''
    },
    {
      id: 3,
      name: 'Compartir App',
      icon: require('./../../assets/images/share.png'),
      path:''
    },
    {
      id: 4,
      name: 'Cerrar Session',
      icon: require('./../../assets/images/logout.png'),
      path:''
    },
  ]

  return (
    <View style={{
      marginTop: 50,
    }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            flex: 1,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            margin: 10,
            backgroundColor: '#fff',
            borderColor: Colors.light.icon
          }}>
            <Image source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
              flex: 1
            }}>{item.name}</Text>
          </View>
        )}
      />
      <View style={{
        marginTop: 100,
        alignItems: 'center',
        gap: 15
      }}>
        <Text style={{fontSize: 16, color: 'gray'}}>Desarrollado por Jorge Allan Paz</Text>
        <Text
          onPress={() => Linking.openURL('https://allan-portafolio.vercel.app/')}
          style={{
            color: 'blue',
            fontSize: 16
          }}
          >Mi Portafolio</Text>
      </View>
    </View>
  )
}