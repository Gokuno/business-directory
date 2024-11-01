import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function LoginScreen() {
    const handlePress = () => {
        router.replace('/(tabs)/'); // Updated navigation path
    };

    return (
        <View>
            <View style={{
                display: "flex",
                alignItems: "center",
                marginTop: 100
            }}>
                <Image
                    source={require("./../assets/images/login.png")}
                    style={{
                        width: 200,
                        height: 400,
                        borderRadius: 20,
                        borderWidth: 5,
                        borderColor: "#000"
                    }}
                />
            </View>
            <View style={styles.subContainer}>
                <Text style={{
                    fontSize: 40,
                    fontFamily: "tinos-bold",
                    textAlign: "center"
                }}>
                    Your <Text style={{
                        color: Colors.light.tint
                    }}>Business Directory</Text> Platform
                </Text>
                <Text style={{
                    fontSize: 18,
                    fontFamily: "tinos",
                    textAlign: "center",
                    marginVertical: 10,
                    color: Colors.light.icon
                }}>
                    Find a the business you are looking for and post your own business
                </Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={handlePress}
                >
                    <Text style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 20,
                        fontFamily: "tinos-bold"
                    }}>Get Started Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: "#fff",
        padding: 20,
        marginTop: -20
    },
    btn: {
        backgroundColor: Colors.light.tint,
        padding: 14,
        borderRadius: 99,
        marginTop: 20
    }
});