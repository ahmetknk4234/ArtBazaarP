import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '../src/components/Button';

const { height, width } = Dimensions.get('window');

const QUOTES = [
    { quote: "Büyük İşler Küçük\nAyrıntıların Birleşimidir.", author: 'Vincent van Gogh' },
    { quote: "Sanat Asla Bitmez,\nYalnızca Terk Edilir.", author: 'Leonardo da Vinci' },
    {
        quote: "Ayaklarım, Uçmak İçin\nKanatlarım Varken Size\nihtiyacım Yok",
        author: 'Frida Kahlo'
    },
];

const WelcomeScreen: React.FC = () => {
    const router = useRouter();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);

    // Açılış ekranı animasyonları
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(30)).current;

    // Onboarding sayfası animasyonları
    const onboardingTranslateY = useRef(new Animated.Value(height)).current;
    const onboardingOpacity = useRef(new Animated.Value(0)).current;

    // Alıntı kayma animasyonu
    const quoteTranslateX = useRef(new Animated.Value(0)).current;
    const quoteOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // İlk açılış ekranı animasyonları
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(logoScale, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.parallel([
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 800,
                delay: 500,
                useNativeDriver: true,
            }),
            Animated.timing(titleTranslateY, {
                toValue: 0,
                duration: 800,
                delay: 500,
                useNativeDriver: true,
            }),
        ]).start();

        // 2.5 saniye sonra onboarding sayfasını kaydır
        const timer = setTimeout(() => {
            setShowOnboarding(true);
            Animated.parallel([
                Animated.timing(onboardingTranslateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(onboardingOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        if (quoteIndex < QUOTES.length - 1) {
            // Mevcut alıntıyı kaydır (sola kaydır ve fade out)
            Animated.parallel([
                Animated.timing(quoteTranslateX, {
                    toValue: -width,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(quoteOpacity, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Yeni alıntıyı ayarla ve sağdan kaydır (fade in)
                setQuoteIndex(quoteIndex + 1);
                quoteTranslateX.setValue(width);
                quoteOpacity.setValue(0);

                Animated.parallel([
                    Animated.timing(quoteTranslateX, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(quoteOpacity, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        } else {
            // Son alıntıdaysa LoginScreen'e geç
            router.replace('/login');
        }
    };

    const handleSkip = () => {
        // Geç butonu - direkt LoginScreen'e geç
        router.replace('/login');
    };

    return (
        <View style={styles.mainContainer}>
            {/* Açılış Ekranı (Siyah Arka Plan) */}
            {!showOnboarding && (
                <View style={styles.splashContainer}>
                    <Animated.View
                        style={[
                            styles.logoContainer,
                            {
                                opacity: logoOpacity,
                                transform: [{ scale: logoScale }],
                            },
                        ]}
                    >
                        <Image
                            source={require('../src/assets/Logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.titleContainer,
                            {
                                opacity: titleOpacity,
                                transform: [{ translateY: titleTranslateY }],
                            },
                        ]}
                    >
                        <Image
                            source={require('../src/assets/Title.png')}
                            style={styles.titleImage}
                            resizeMode="contain"
                        />
                    </Animated.View>
                </View>
            )}

            {/* Onboarding Sayfası (Kayarak Gelen) */}
            {showOnboarding && (
                <Animated.View
                    style={[
                        styles.onboardingContainer,
                        {
                            transform: [{ translateY: onboardingTranslateY }],
                            opacity: onboardingOpacity,
                        },
                    ]}
                >
                    <SafeAreaView style={styles.onboardingContent}>
                        {/* Logo ve Marka - Üstte Yan Yana */}
                        <View style={styles.logoSection}>
                            <Image
                                source={require('../src/assets/Logo.png')}
                                style={styles.onboardingLogo}
                                resizeMode="contain"
                            />
                            <Image
                                source={require('../src/assets/Title.png')}
                                style={styles.brandImage}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Ana İçerik */}
                        <View style={styles.content}>
                            {/* Alıntı Metni - Aşağıda */}
                            <Animated.View
                                style={[
                                    styles.quoteContainer,
                                    {
                                        transform: [{ translateX: quoteTranslateX }],
                                        opacity: quoteOpacity,
                                    },
                                ]}
                            >
                                <Text style={styles.quoteText}>
                                    {QUOTES[quoteIndex].quote}
                                </Text>
                                <Text style={styles.quoteAuthor}>
                                    {QUOTES[quoteIndex].author}
                                </Text>
                            </Animated.View>

                            {/* Sayfa Göstergeleri */}
                            <View style={styles.pagination}>
                                {QUOTES.map((_, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.dot,
                                            index === quoteIndex && styles.dotActive,
                                        ]}
                                    />
                                ))}
                            </View>

                            {/* Butonlar */}
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="Devam Et"
                                    onPress={handleContinue}
                                    variant="primary"
                                />

                                <Button
                                    title="Geç"
                                    onPress={handleSkip}
                                    variant="secondary"
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    // Açılış Ekranı Stilleri
    splashContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 79,
        height: 79,
        backgroundColor: 'transparent',
        tintColor: '#ffffffff',
    },
    titleContainer: {
        alignItems: 'center',
    },
    titleImage: {
        width: 150,
        height: 40,
        tintColor: '#FFFFFF',
    },
    // Onboarding Sayfası Stilleri
    onboardingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    onboardingContent: {
        flex: 1,
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        gap: 12,
    },
    onboardingLogo: {
        width: 79,
        height: 79,
        backgroundColor: 'transparent',
        tintColor: '#000000',
    },
    brandImage: {
        width: 120,
        height: 35,
        tintColor: '#000000',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    quoteContainer: {
        marginBottom: 40,
        position: 'relative',
    },
    quoteText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 38,
        marginBottom: 16,
        textAlign: 'center',
    },
    quoteAuthor: {
        fontSize: 14,
        color: '#999999',
        textAlign: 'right',
        fontStyle: 'italic',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginVertical: 30,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
    },
    dotActive: {
        backgroundColor: '#000000',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        gap: 12,
    },
});

export default WelcomeScreen;
