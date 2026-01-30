import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

interface UpButtonProps {
    onPress?: () => void;
    style?: any;
}

export default function UpButton({ onPress, style }: UpButtonProps) {
    return (
        <TouchableOpacity 
            style={[styles.upButton, style]} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.chevron} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    upButton: {
        width: 39,
        height: 39,
        backgroundColor: '#000000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chevron: {
        width: 10,
        height: 10,
        borderLeftWidth: 2.5,
        borderTopWidth: 2.5,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '45deg' }],
        marginTop: 4,
    },
});
