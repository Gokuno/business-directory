import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({ business }) {
    const router = useRouter();
    const { user } = useUser();

    const OnDelete = () => {
        Alert.alert('Quieres eliminar este negocio?', 'Seguro que quieres eliminarlo?', [
            {
                text: 'Borrar',
                style: 'destructive',
                onPress: () => deleteBusiness()
            },
            {
                text: 'Cancelar',
                style: 'cancel'
            },
        ])
    }

    const deleteBusiness = async () => {
        await deleteDoc(doc(db, 'BusinessList', business?.id));
        router.push('/profile');
        ToastAndroid.show('Negocio Eliminado', ToastAndroid.LONG)
    }

    if (!business) {
        return null;
    }
    
    return (
        <View>
            <View style={{
                position: 'absolute',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 20,
                marginTop: 20
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={34} color="white"  />
                </TouchableOpacity>

                <FontAwesome6 name="heart" size={34} color="white"  />
            </View>
            {business.imageUrl ? (
                <Image
                    source={{ uri: business.imageUrl }}
                    style={{
                        width: '100%',
                        height: 340
                    }}
                />
            ) : (
                <View style={{ width: '100%', height: 340, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No image available</Text>
                </View>
            )}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#fff',
                padding: 20,
                gap: 10,
                marginTop: -20,
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                justifyContent: 'space-between',
               
            }}>
            <View style={{
                padding: 20,
                gap: 10,
                marginTop: -20,
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25
            }}>
                <Text style={{
                    fontSize: 26,
                    fontWeight: 'bold'
                }}>{business.nombre}
                </Text>
                <Text style={{
                    fontSize: 18,
                    color: Colors.light.icon
                }}>{business.direccion}</Text>
            </View>
                {user?.primaryEmailAddress?.emailAddress == business?.userEmail &&
                <TouchableOpacity onPress={() => OnDelete()}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
                }
            </View>
        </View>
    );
}