import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

const SocialLoginButtons: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.replace('/dashboard');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Google Giriş Hatası', error.message);
    }
  };

  return (
    <View style={styles.socialButtonsContainer}>
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../assets/apple_logo.png')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
        <Image
          source={require('../assets/google_logo.png')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../assets/facebook_logo.png')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 32,
  },
  socialButton: {
    width: 80,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialIcon: {
    width: 60,
    height: 60,
  },
});

export default SocialLoginButtons;
