import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '@/constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState();
    const { user } = useUser();

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business.id)
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage:user?.imageUrl
            })
        })

        ToastAndroid.show('Se agrego comentario', ToastAndroid.BOTTOM)
    }


  return (
      <View style={{
          padding: 20,
          backgroundColor: '#fff',
          paddingBottom: 200
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
                  onPress={() => onSubmit()}
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
          <View>
              {business?.reviews?.map((item, index) => (
                  <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 50,
                      gap: 10,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: Colors.light.icon,
                      borderRadius: 10

                  }}>
                      <Image source={{ uri: item.userImage }}
                          style={{
                              width: 50,
                              height: 50,
                              borderRadius: 99
                        }}
                      />
                      <View style={{ display: 'flex', gap: 5}}>
                        <Text style={{ fontWeight: 'bold'}}>{item.userName}</Text>
                        <Rating
                            imageSize={20}
                              ratingCount={item.rating}
                              style={{alignItems: 'flex-start'}}
                        />
                        <Text style={{marginTop: 5}}>{item.comment}</Text>
                       </View>
                  </View>
              ))}
        </View>
    </View>
  )
}