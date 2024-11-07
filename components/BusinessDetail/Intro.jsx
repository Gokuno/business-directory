import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Intro({ business }) {
    const router = useRouter();

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
                }}>{business.nombre}</Text>
                <Text style={{
                    fontSize: 18,
                    color: Colors.light.icon
                }}>{business.direccion}</Text>
            </View>
        </View>
    );
}