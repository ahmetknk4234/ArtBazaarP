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
import { BottomNavigation, ProductCard } from '../src/components';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// Temsili Veriler
const categories = [
    { id: '1', name: 'Tümü' },
    { id: '2', name: 'Geleneksel' },
    { id: '3', name: 'Seramik' },
    { id: '4', name: 'Zanaat' },
    { id: '5', name: 'Heykel' },
    { id: '6', name: 'Resim' },
    { id: '7', name: 'Dijital' },
];


const products = [
    {
        id: '1',
        title: 'Monza İtalya',
        artist: 'Elif Kara',
        price: '31.500 ₺',
        isAd: false,
        category: 'Geleneksel',
    },
    {
        id: '2',
        title: 'Sanatçı Reklam Alanı',
        artist: '',
        price: '37.500 ₺',
        isAd: true,
        category: '',
    },
    {
        id: '3',
        title: 'Naturel Birinci',
        artist: 'Can Öztürk',
        price: '38.200 ₺',
        isAd: false,
        category: 'Seramik',
    },
    {
        id: '4',
        title: 'Renklerin Dansı',
        artist: 'Zeynep Ak',
        price: '21.500 ₺',
        isAd: false,
        category: 'Resim',
    },
    {
        id: '5',
        title: 'Sanatçı Reklam Alanı',
        artist: '',
        price: '',
        isAd: true,
        category: '',
    },
    {
        id: '6',
        title: 'Soyutlama Üçüncü',
        artist: 'Ali Veli',
        price: '27.650 ₺',
        isAd: false,
        category: 'Dijital',
    },
    {
        id: '7',
        title: 'Gece Mavisi',
        artist: 'Selin Yıldız',
        price: '45.000 ₺',
        isAd: false,
        category: 'Geleneksel',
    },
    {
        id: '8',
        title: 'Sonbahar Akşamı',
        artist: 'Mert Aydın',
        price: '33.750 ₺',
        isAd: false,
        category: 'Resim',
    },
];

export default function Dashboard() {
    const { user } = useAuth();

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
                                <Image source={require('../src/assets/Menu_bar.png')} style={{ width: 24, height: 24, tintColor: '#000' }} resizeMode="contain" />
                            </TouchableOpacity>
                            <Text style={styles.greetingText}>Selam {user?.displayName || user?.email?.split('@')[0] || 'Kullanıcı'}</Text>
                        </View>

                        {/* Sağ taraf - İkonlar */}
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Image source={require('../src/assets/search_icon.png')} style={{ width: 22, height: 22, tintColor: '#000' }} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Image source={require('../src/assets/bag_icon.png')} style={{ width: 22, height: 22, tintColor: '#000' }} resizeMode="contain" />
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
                                <Image source={require('../src/assets/Arrow_icon.png')} style={{ width: 16, height: 16, marginLeft: 7, tintColor: '#fff' }} resizeMode="contain" />
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
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Kategoriler</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Tümünü Gör</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryTab,
                                    index === 1 && styles.categoryTabActive
                                ]}
                            >
                                <Text style={[
                                    styles.categoryTabText,
                                    index === 1 && styles.categoryTabTextActive
                                ]}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Products Grid */}
                <View style={styles.productsGrid}>
                    {products.filter(p => !p.isAd).map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            onBuyPress={() => console.log('Buy', product.id)}
                            onFavoritePress={() => console.log('Favorite', product.id)}
                            onPress={() => console.log('View', product.id)}
                        />
                    ))}
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    seeAllText: {
        fontSize: 14,
        color: '#888',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        gap: 24,
    },
    categoryTab: {
        paddingBottom: 8,
    },
    categoryTabActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    categoryTabText: {
        fontSize: 14,
        color: '#888',
    },
    categoryTabTextActive: {
        color: '#000',
        fontWeight: '600',
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
        rowGap: 16,
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
