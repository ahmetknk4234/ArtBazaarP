import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View, Image } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  showArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
  showArrow = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        showArrow && styles.buttonWithArrow,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
      {showArrow && (
        <View style={styles.arrowContainer}>
          <Image
            source={require('../assets/arrow.png')}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWithArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  primaryButton: {
    backgroundColor: '#000000',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#000000',
  },
  disabledButton: {
    opacity: 0.5,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default Button;
