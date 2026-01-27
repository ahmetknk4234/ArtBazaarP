import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../src/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const { signOut, user } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace('/login');
        } catch (error) {
            console.error("Çıkış yapılırken hata:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Anasayfa</Text>
                <Text style={styles.subtitle}>Hoşgeldiniz, {user?.displayName || user?.email}</Text>

                <View style={styles.buttonContainer}>
                    <Button title="Çıkış Yap" onPress={handleSignOut} color="#FF3B30" />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 200,
    }
});
