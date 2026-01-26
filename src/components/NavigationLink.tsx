import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NavigationLinkProps {
  questionText: string;
  linkText: string;
  onPress: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  questionText,
  linkText,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questionText} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 14,
    color: '#999999',
  },
  linkText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default NavigationLink;
