import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SocialLoginButtons, Divider, Button, Checkbox, Input, Header, NavigationLink } from '../src/components';

const LoginScreen: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Üst Siyah Header Bölümü */}
                <Header
                    title="Hoşgeldiniz"
                    subtitle="Art Bazaar ile yolculugunuza devam etmek için giriş yapın."
                    showBackButton={true}
                />

                {/* Ana İçerik Bölümü */}
                <View style={styles.contentSection}>

                    {/* E-Posta Input */}
                    <Input
                        label="E-Posta"
                        placeholder="E-postanızı/Telefon Numaranızı Girin"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Şifre Input */}
                    <Input
                        label="Şifre"
                        placeholder="Şifrenizi Girin"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        showPasswordToggle={true}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                        autoCapitalize="none"
                    />

                    {/* Beni Hatırla ve Şifremi Unuttum */}
                    <View style={styles.optionsRow}>
                        <Checkbox
                            label="Beni Hatırla"
                            checked={rememberMe}
                            onToggle={() => setRememberMe(!rememberMe)}
                        />
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>Parolanızı mı unuttunuz?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Giriş Yap Butonu */}
                    <Button
                        title="Giriş Yap"
                        onPress={() => { }}
                        style={{ marginBottom: 24 }}
                    />

                    {/* Veya Divider */}
                    <Divider />

                    <SocialLoginButtons />

                    {/* Kayıt Ol Linki */}
                    <NavigationLink
                        questionText="Hesabınız yok mu?"
                        linkText="Kaydolun"
                        onPress={() => router.push('/register')}
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
    screenTitle: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 24,
    },

    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    forgotPassword: {
        fontSize: 14,
        color: '#000000ff',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
