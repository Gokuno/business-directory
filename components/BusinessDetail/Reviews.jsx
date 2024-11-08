import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '@/constants/Colors';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState();

  return (
      <View style={{
          padding: 20,
          backgroundColor: '#fff'
    }}>
          <Text style={{
              fontWeight: 'bold',
              fontSize: 20
          }}>Reseñas</Text>
          <View style={{
             
          }}>
              <Rating
                  showRating={false}
                  imageSize={30}
                  onFinishRating={(rating) => setRating(rating)}
                  style={{paddingVertical: 10}}
              />
              <TextInput
                  placeholder='Deja un comentario'
                  numberOfLines={4}
                  onChangeText={(value) => setUserInput(value) }
                  style={{
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 10,
                      borderColor: Colors.light.icon,
                      textAlignVertical: 'top'
                  }}
              />
              <TouchableOpacity
                  disabled={!userInput}
                  onPress={() => console.log(userInput, rating)}
                  style={{
                    padding: 10,
                    backgroundColor: Colors.light.tint,
                    borderRadius: 10,
                    marginTop: 10,
                    marginBottom: 20
              }}>
                  <Text style={{
                      color: '#fff',
                      textAlign: 'center'
                  }}>Enviar</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}