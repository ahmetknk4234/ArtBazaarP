import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../src/contexts/AuthContext';
import { BottomNavigation } from '../src/components';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// Temsili Veriler
const categories = [
    { id: '1', name: 'Resim', icon: 'brush-outline' },
    { id: '2', name: 'Heykel', icon: 'cube-outline' },
    { id: '3', name: 'Fotoğraf', icon: 'camera-outline' },
    { id: '4', name: 'Dijital', icon: 'desktop-outline' },
];

const featuredProducts = [
    {
        id: '1',
        title: 'Premium Birinci',
        artist: 'Ahmet Yılmaz',
        price: '29.400 ₺',
        image: null,
    },
    {
        id: '2',
        title: 'Şerdenha Akçesi',
        artist: 'Mehmet Demir',
        price: '37.500 ₺',
        image: null,
    },
];

const products = [
    {
        id: '1',
        title: 'Monza İtalya',
        artist: 'Elif Kara',
        price: '31.500 ₺',
        isAd: false,
    },
    {
        id: '2',
        title: 'Sanatçı Reklam Alanı',
        artist: '',
        price: '37.500 ₺',
        isAd: true,
    },
    {
        id: '3',
        title: 'Naturel Birinci',
        artist: 'Can Öztürk',
        price: '38.200 ₺',
        isAd: false,
    },
    {
        id: '4',
        title: 'Sanatçı Reklam Alanı',
        artist: '',
        price: '',
        isAd: true,
    },
    {
        id: '5',
        title: 'Renklerin Dansı',
        artist: 'Zeynep Ak',
        price: '21.500 ₺',
        isAd: false,
    },
    {
        id: '6',
        title: 'Soyutlama Üçüncü',
        artist: 'Ali Veli',
        price: '27.650 ₺',
        isAd: false,
    },
];

export default function Dashboard() {
    const { user } = useAuth();

    const renderCategoryItem = (category: typeof categories[0]) => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
            <View style={styles.categoryIconContainer}>
                <Ionicons name={category.icon as any} size={24} color="#333" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
    );

    const renderFeaturedCard = (product: typeof featuredProducts[0]) => (
        <View key={product.id} style={styles.featuredCard}>
            <View style={styles.featuredImagePlaceholder}>
                <Ionicons name="image-outline" size={40} color="#999" />
            </View>
            <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{product.title}</Text>
                <Text style={styles.featuredArtist}>{product.artist}</Text>
                <Text style={styles.featuredPrice}>{product.price}</Text>
            </View>
        </View>
    );

    const renderProductCard = (product: typeof products[0]) => (
        <View key={product.id} style={styles.productCard}>
            {product.isAd ? (
                <View style={styles.adContainer}>
                    <Text style={styles.adTitle}>Sanatçı</Text>
                    <Text style={styles.adTitle}>Reklam</Text>
                    <Text style={styles.adTitle}>Alanı</Text>
                </View>
            ) : (
                <>
                    <View style={styles.productImagePlaceholder}>
                        <Ionicons name="image-outline" size={32} color="#ccc" />
                    </View>
                    <View style={styles.productInfo}>
                        <Text style={styles.productTitle}>{product.title}</Text>
                        <Text style={styles.productArtist}>{product.artist}</Text>
                        <Text style={styles.productPrice}>{product.price}</Text>
                        <TouchableOpacity style={styles.buyButton}>
                            <Text style={styles.buyButtonText}>Şimdi Al</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        {/* Sol taraf - Menu ve Kullanıcı */}
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menuButton}>
                                <Ionicons name="menu-outline" size={24} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.greetingText}>Selam {user?.displayName || user?.email?.split('@')[0] || 'Kullanıcı'}</Text>
                        </View>

                        {/* Sağ taraf - İkonlar */}
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="search-outline" size={22} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="bag-outline" size={22} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileButton}>
                                <Image
                                    source={require('../src/assets/add_img.png')}
                                    style={styles.profileImage}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.heroTitle}>
                        Çağdaş Sanat Stilinizi{'\n'}Keşfedin
                    </Text>

                    {/* Promo Banner */}
                    <View style={styles.promoBanner}>
                        <View style={styles.promoBannerLeft}>
                            {/* Kasım Ayı Badge */}
                            <View style={styles.promoBadge}>
                                <Text style={styles.promoBadgeText}>Kasım Ayı</Text>
                            </View>

                            <Text style={styles.promoTitle}>Kasım Sanat{'\n'}müzayedeleri</Text>

                            <TouchableOpacity style={styles.promoLink}>
                                <Text style={styles.promoLinkText}>Açık Artırmayı İncele</Text>
                                <Text style={styles.promoArrow}> →</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.promoImageContainer}>
                            <Image
                                source={require('../src/assets/muzayede.png')}
                                style={styles.promoImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Kategori Kartları */}
                    <View style={styles.quickCategories}>
                        <TouchableOpacity style={styles.quickCategoryDark}>
                            <Text style={styles.quickCategoryTextWhite}>Ayın{'\n'}Sanatçıları</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickCategoryDark}>
                            <Text style={styles.quickCategoryTextWhite}>En Çok Tercih{'\n'}Edilen Eserler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickCategoryDark}>
                            <Text style={styles.quickCategoryTextWhite}>En Çok Tercih{'\n'}Edilen Eserler</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Kategoriler</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {categories.map(renderCategoryItem)}
                    </ScrollView>
                </View>

                {/* Featured Products */}
                <View style={styles.section}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuredContainer}
                    >
                        {featuredProducts.map(renderFeaturedCard)}
                    </ScrollView>
                </View>

                {/* Products Grid */}
                <View style={styles.productsGrid}>
                    {products.map(renderProductCard)}
                </View>

                {/* Bottom Spacing */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <BottomNavigation />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greetingText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginLeft: 12,
    },
    menuButton: {
        padding: 4,
    },
    iconButton: {
        padding: 8,
        marginLeft: 4,
    },
    profileButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 8,
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 10,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        lineHeight: 36,
    },
    promoBanner: {
        backgroundColor: '#000000',
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        height: 160,
    },
    promoBannerLeft: {
        flex: 1,
        padding: 20,
        paddingRight: 10,
        justifyContent: 'center',
    },
    promoBadge: {
        backgroundColor: '#D4AF37',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    promoBadgeText: {
        color: '#000000ff',
        fontSize: 12,
        fontWeight: '600',
    },
    promoTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
        lineHeight: 32,
    },
    promoLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    promoLinkText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    promoArrow: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    promoImageContainer: {
        width: '50%',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    promoImage: {
        width: '100%',
        height: '120%',
    },
    quickCategories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 10,
    },
    quickCategoryDark: {
        flex: 1,
        backgroundColor: '#000000',
        borderRadius: 16,
        padding: 14,
        minHeight: 70,
        justifyContent: 'center',
    },
    quickCategoryLight: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        minHeight: 80,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    quickCategoryTextWhite: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
    },
    quickCategoryTextDark: {
        color: '#000000',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#DDD',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#7B2CBF',
        width: 24,
    },
    section: {
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    categoriesContainer: {
        paddingHorizontal: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 24,
    },
    categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    featuredContainer: {
        paddingHorizontal: 16,
    },
    featuredCard: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginRight: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    featuredImagePlaceholder: {
        width: '100%',
        height: 120,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredInfo: {
        padding: 12,
    },
    featuredTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    featuredArtist: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    featuredPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7B2CBF',
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    productCard: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImagePlaceholder: {
        width: '100%',
        height: 100,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfo: {
        padding: 12,
    },
    productTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    productArtist: {
        fontSize: 11,
        color: '#666',
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7B2CBF',
        marginBottom: 8,
    },
    buyButton: {
        backgroundColor: '#7B2CBF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    adContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#4A4A4A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    adTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        lineHeight: 24,
    },
});
