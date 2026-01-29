import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageSourcePropType,
    Alert,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';

interface TabItem {
    name: string;
    label: string;
    route: string;
    icon: ImageSourcePropType;
}

const tabs: TabItem[] = [
    {
        name: 'home',
        label: 'Anasayfa',
        route: '/dashboard',
        icon: require('../assets/home.png'),
    },
    {
        name: 'messages',
        label: 'Mesajlar',
        route: '/messages',
        icon: require('../assets/message.png'),
    },
    {
        name: 'cart',
        label: 'Sepet',
        route: '/cart',
        icon: require('../assets/shopping.png'),
    },
    {
        name: 'favorites',
        label: 'Favoriler',
        route: '/favorites',
        icon: require('../assets/fav.png'),
    },
    {
        name: 'profile',
        label: 'Profil',
        route: '/profile',
        icon: require('../assets/profile.png'),
    },
];

const BottomNavigation: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleTabPress = (tab: TabItem) => {
        const isActive = pathname === tab.route || pathname.startsWith(tab.route + '/');

        // Zaten aktif sayfadaysa yeniden navigate etme
        if (isActive) {
            return;
        }
        router.push(tab.route as any);
    };

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = pathname === tab.route || pathname.startsWith(tab.route + '/');

                return (
                    <TouchableOpacity
                        key={tab.name}
                        style={[styles.tabItem, isActive && styles.activeTabItem]}
                        onPress={() => handleTabPress(tab)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.tabContent, isActive && styles.activeTabContent]}>
                            <Image
                                source={tab.icon}
                                style={[
                                    styles.icon,
                                    isActive && styles.activeIcon
                                ]}
                                resizeMode="contain"
                            />
                            {isActive && (
                                <Text style={styles.label} numberOfLines={1}>{tab.label}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        height: 60,
        paddingBottom: 0,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    activeTabItem: {
        flex: 2,
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        height: '100%',
    },
    activeTabContent: {
        backgroundColor: '#000000ff',
        width: '100%',
        paddingLeft: 24,
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: '#888888',
    },
    activeIcon: {
        tintColor: '#ffffffff',
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 6,
    },
});

export default BottomNavigation;

