import { View, Text, FlatList, Image, Linking, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {

  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: 'Agregar Negocio',
      icon: require('./../../assets/images/add.png'),
      path:'/business/add-business'
    },
    {
      id: 2,
      name: 'Mi Negocio',
      icon: require('./../../assets/images/business-and-trade.png'),
      path:'/business/my-business'
    },
    {
      id: 3,
      name: 'Compartir App',
      icon: require('./../../assets/images/share.png'),
      path:'share'
    },
    {
      id: 4,
      name: 'Cerrar Session',
      icon: require('./../../assets/images/logout.png'),
      path:'logout'
    },
  ]

  const router = useRouter();

  const onMenuClick = (item) => {
    if (item.path == 'logout') {
      signOut();
      return;
    }
    if (item.path == 'share') {
      Share.share({message: 'Descarga la App de Directorio de Negocios por Jorge Allan Paz, URL de descarga: https://allan-portafolio.vercel.app/work'})
      return;
    }
    router.push(item.path)
  }

  return (
    <View style={{
      marginTop: 50,
    }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
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
          </TouchableOpacity>
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