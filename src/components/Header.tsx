import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  subtitle?: string;
  logoSize?: number;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, logoSize = 60, showBackButton = false }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.headerSection, { paddingTop: insets.top + 20 }]}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      <Image
        source={require('../assets/Logo.png')}
        style={[styles.headerLogo, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />
      <Text style={styles.welcomeTitle}>{title}</Text>
      {subtitle && <Text style={styles.welcomeSubtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerLogo: {
    tintColor: '#FFFFFF',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
});

export default Header;
