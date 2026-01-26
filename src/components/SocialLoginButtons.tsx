import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SocialLoginButtons: React.FC = () => {
  return (
    <View style={styles.socialButtonsContainer}>
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../assets/apple_logo.png')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
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
