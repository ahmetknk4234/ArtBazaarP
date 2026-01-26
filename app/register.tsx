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

const RegisterScreen: React.FC = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Üst Siyah Header Bölümü */}
                <Header
                    title={"ArtBazaar Hesabınızı\nOluşturun"}
                    subtitle="Sanat Dünyası Parmaklarının Ucunda"
                    showBackButton={true}
                />

                {/* Ana İçerik Bölümü */}
                <View style={styles.contentSection}>
                    {/* İsim Soyisim Input */}
                    <Input
                        label="İsim Soyisim"
                        placeholder="Adınızı Girin"
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="words"
                    />

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

                    {/* Gizlilik Politikası Checkbox */}
                    <View style={styles.checkboxRow}>
                        <Checkbox
                            label="Gizlilik ve politikaları kabul ediyorum"
                            checked={acceptPrivacy}
                            onToggle={() => setAcceptPrivacy(!acceptPrivacy)}
                            boldText={['Gizlilik', 'politikaları']}
                            flexLabel={true}
                        />
                    </View>

                    {/* Oturum Aç Butonu */}
                    <Button
                        title="Oturum aç"
                        onPress={() => { }}
                        style={{ marginBottom: 24 }}
                    />

                    {/* Veya Divider */}
                    <Divider />

                    {/* Sosyal Login Butonları */}
                    <SocialLoginButtons />

                    {/* Giriş Yap Linki */}
                    <NavigationLink
                        questionText="Hesabınız var mı?"
                        linkText="Giriş yapın"
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

    checkboxRow: {
        marginBottom: 24,
    },
});

export default RegisterScreen;
