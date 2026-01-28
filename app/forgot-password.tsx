import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button, Input, Header, NavigationLink } from '../src/components';
import { useAuth } from '../src/contexts/AuthContext';

const ForgotPasswordScreen: React.FC = () => {
    const router = useRouter();
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Hata', 'Lütfen e-posta adresinizi giriniz.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi giriniz.');
            return;
        }

        try {
            setLoading(true);
            await resetPassword(email);
            setEmailSent(true);
            Alert.alert(
                'Başarılı',
                'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.',
                [{ text: 'Tamam', onPress: () => router.replace('/login') }]
            );
        } catch (error: any) {
            console.error(error);
            Alert.alert('Hata', error.message || 'Şifre sıfırlama işlemi başarısız oldu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Üst Siyah Header Bölümü */}
                <Header
                    title="Şifrenizi mi Unuttunuz?"
                    subtitle="Sıfırlama bağlantısını almak için e-postanızı girin."
                    showBackButton={true}
                />

                {/* Ana İçerik Bölümü */}
                <View style={styles.contentSection}>
                    {!emailSent ? (
                        <>

                            {/* E-Posta Input */}
                            <Input
                                label="E-Posta"
                                placeholder="E-posta adresinizi girin"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {/* Şifre Sıfırlama Butonu */}
                            <Button
                                title={loading ? "Gönderiliyor..." : "Doğrula"}
                                onPress={handleResetPassword}
                                disabled={loading}
                                style={{ marginTop: 16, marginBottom: 24 }}
                            />
                        </>
                    ) : (
                        <View style={styles.successContainer}>
                            <Text style={styles.successIcon}>✉️</Text>
                            <Text style={styles.successTitle}>E-Posta Gönderildi!</Text>
                            <Text style={styles.successDescription}>
                                Şifre sıfırlama bağlantısı {email} adresine gönderildi.
                                Lütfen gelen kutunuzu ve spam klasörünüzü kontrol edin.
                            </Text>
                            <Button
                                title="Giriş Sayfasına Dön"
                                onPress={() => router.replace('/login')}
                                style={{ marginTop: 24 }}
                            />
                        </View>
                    )}

                    {/* Giriş Yap Linki */}
                    <NavigationLink
                        questionText="Şifrenizi hatırladınız mı?"
                        linkText="Giriş Yapın"
                        onPress={() => router.push('/login')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentSection: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    successContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    successIcon: {
        fontSize: 64,
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 16,
    },
    successDescription: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default ForgotPasswordScreen;
