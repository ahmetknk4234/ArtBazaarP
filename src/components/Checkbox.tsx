import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  boldText?: string[];
  flexLabel?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onToggle, boldText = [], flexLabel = false }) => {
  const renderLabel = () => {
    if (boldText.length === 0) {
      return <Text style={[styles.checkboxLabel, flexLabel && styles.flexLabel]}>{label}</Text>;
    }

    const parts = label.split(/(\s+)/);
    return (
      <Text style={[styles.checkboxLabel, flexLabel && styles.flexLabel]}>
        {parts.map((part, index) => {
          const trimmedPart = part.trim();
          if (boldText.includes(trimmedPart)) {
            return (
              <Text key={index} style={styles.checkboxBold}>
                {part}
              </Text>
            );
          }
          return part;
        })}
      </Text>
    );
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {renderLabel()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#000000',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000000',
  },
  flexLabel: {
    flex: 1,
  },
  checkboxBold: {
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Checkbox;
