import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'


export default function ActionButton({business}) {
    const actionButtonMenu = [
        {
            id: 1,
            name: 'Llamar',
            icon: require('./../../assets/images/call.png'),
            url: 'tel:' + business?.contacto,
        },
        {
            id: 2,
            name: 'Direccion',
            icon: require('./../../assets/images/pin.png'),
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.direccion,
        },
        {
            id: 3,
            name: 'Sitio web',
            icon: require('./../../assets/images/web.png'),
            url: business?.sitio,
        },
        {
            id: 4,
            name: 'Compartir',
            icon: require('./../../assets/images/share.png'),
            url: business?.sitio,
        },
    ]

    const OnPressHandle = (item) => {
        if (item.name == 'Compartir') 
        {
            Share.share({
                message: business?.nombre + "\n Direccion: " + business.direccion + "\n Mas detalles en la App de Directory de Negocios Locales, por Jorge Allan Paz. " + "\n Link: " + "https://allan-portafolio.vercel.app/"
            })
            return;
        }
        Linking.openURL(item.url);
    }

  return (
      <View style={{
          backgroundColor: '#fff',
          padding: 20
    }}>
          <FlatList
              data={actionButtonMenu}
              horizontal={true}
              contentContainerStyle={{width: '100%', justifyContent:'space-between'}}
              renderItem={({ item, index }) => (
                  <TouchableOpacity key={index}
                    onPress={() => OnPressHandle(item)}
                  >
                      <Image source={item?.icon}
                          style={{
                              width: 60,
                              height: 60,
                        }}
                      />
                      <Text style={{
                          fontSize: 14,
                          fontWeight: 'medium'
                      }}>{item.name}</Text>
                  </TouchableOpacity>
              )}
          />
    </View>
  )
}