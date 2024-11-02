import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import * as WebBrowser from 'expo-web-browser'
import { Button } from './../../components/Button';
import { useWarmUpBrowser } from './../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';


WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/(tabs)', { scheme: 'myapp' }),
            })

            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error('OAuth error', err)
        }
    }, [])


    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View style={{
                display: "flex",
                alignItems: "center",
                marginTop: 100
            }}>
                <Image
                    source={require("./../../assets/images/login.png")}
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
                    Find the business you are looking for and post your own business
                </Text>

                <Button icon="logo-google" title="Continue with Google" onPress={onPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: "#fff",
        padding: 20,
        marginTop: -20
    }
});