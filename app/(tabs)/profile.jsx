import MenuList from '@/components/Profile/MenuList';
import UserIntro from '@/components/Profile/UserIntro';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={{
            padding: 20,
            marginTop: 80
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 30,
                alignItems: 'center',
                textAlign: 'center'
            }}>Perfil</Text>

            <UserIntro />

            <MenuList />
        </View>
    );
}