import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

interface BackButtonProps {
    onPress?: () => void;
    style?: any;
}

export default function BackButton({ onPress, style }: BackButtonProps) {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    };

    return (
        <TouchableOpacity 
            style={[styles.backButton, style]} 
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.chevron} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
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
        borderBottomWidth: 2.5,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '45deg' }],
        marginLeft: 4,
    },
});
