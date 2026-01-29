import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Button from './Button';

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    image?: ImageSourcePropType;
    isFavorite?: boolean;
    onPress?: () => void;
    onFavoritePress?: () => void;
    onBuyPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    image,
    isFavorite = false,
    onPress,
    onFavoritePress,
    onBuyPress,
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={image} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={styles.imagePlaceholder} />
                )}

                {/* Favorite Button */}
                <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
                    <Image
                        source={require('../assets/fav_icon.png')}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.price}>{price}</Text>

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        title="Satın Al"
                        onPress={onBuyPress || (() => { })}
                        style={styles.buyButton}
                        textStyle={styles.buyButtonText}
                        showArrow
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        width: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: 160,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4A4A4A',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000ff',
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    buyButton: {
        flex: 1,
        backgroundColor: '#000000',
        paddingVertical: 10,
        borderRadius: 20,
    },
    buyButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductCard;
