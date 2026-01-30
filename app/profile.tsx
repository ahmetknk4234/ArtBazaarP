import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackButton, BottomNavigation } from '../src/components';
import { useAuth } from '../src/contexts/AuthContext';

const { width } = Dimensions.get('window');

interface MenuItemProps {
    icon: string;
    label: string;
    onPress?: () => void;
    isToggle?: boolean;
    toggleValue?: boolean;
    onToggleChange?: (value: boolean) => void;
    isLast?: boolean;
}

function MenuItem({ icon, label, onPress, isToggle, toggleValue, onToggleChange, isLast }: MenuItemProps) {
    return (
        <TouchableOpacity
            style={[styles.menuItem, isLast && styles.menuItemLast]}
            onPress={isToggle ? () => onToggleChange?.(!toggleValue) : onPress}
            disabled={isToggle ? false : !onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.menuIcon}>{icon}</Text>
            <Text style={styles.menuLabel}>{label}</Text>
            {isToggle ? (
                <View style={[styles.switchOuter, toggleValue && styles.switchOuterActive]}>
                    <View style={[styles.switchInner, toggleValue && styles.switchInnerActive]} />
                </View>
            ) : (
                <Text style={styles.menuArrow}>›</Text>
            )}
        </TouchableOpacity>
    );
}

export default function Profile() {
    const router = useRouter();
    const { user, signOut } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [notificationsOff, setNotificationsOff] = useState(false);

    const displayName = user?.displayName || 'Kullanıcı Adı';
    const userHandle = user?.email ? `@${user.email.split('@')[0]}` : '@mağazadı123';

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace('/welcome');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Background */}
                <View style={styles.headerWrapper}>
                    <ImageBackground
                        source={require('../src/assets/asset1.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    >
                        <View style={styles.backButtonWrapper}>
                            <BackButton />
                        </View>
                    </ImageBackground>

                    {/* User Info Card */}
                    <View style={styles.userCard}>
                        <View style={styles.avatarContainer}>
                            {user?.photoURL ? (
                                <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarIcon}>👤</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{displayName}</Text>
                            <Text style={styles.userHandle}>{userHandle}</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Sections */}
                <View style={styles.menuContainer}>
                    {/* Group 1 */}
                    <View style={styles.menuGroup}>
                        <MenuItem
                            icon="▦"
                            label="Kontrol Panelim"
                            onPress={() => {}}
                        />
                        <MenuItem
                            icon="🌙"
                            label="Koyu mod"
                            isToggle
                            toggleValue={darkMode}
                            onToggleChange={setDarkMode}
                        />
                        <MenuItem
                            icon="💬"
                            label="Dil seçenekleri"
                            onPress={() => {}}
                            isLast
                        />
                    </View>

                    {/* Group 2 */}
                    <View style={styles.menuGroup}>
                        <MenuItem
                            icon="🔕"
                            label="Bildirimleri durdur"
                            isToggle
                            toggleValue={notificationsOff}
                            onToggleChange={setNotificationsOff}
                        />
                        <MenuItem
                            icon="⚙"
                            label="Genel Ayarlar"
                            onPress={() => {}}
                            isLast
                        />
                    </View>

                    {/* Group 3 */}
                    <View style={styles.menuGroup}>
                        <MenuItem
                            icon="⇄"
                            label="Hesabı Değiştir"
                            onPress={() => {}}
                        />
                        <MenuItem
                            icon="🎁"
                            label="Ödüller"
                            onPress={() => {}}
                            isLast
                        />
                    </View>

                    {/* Group 4 */}
                    <View style={styles.menuGroup}>
                        <MenuItem icon="📱" label="Abonelik" onPress={() => {}} />
                        <MenuItem icon="💳" label="Ödeme" onPress={() => {}} />
                        <MenuItem icon="👥" label="Arkadaşlara Tavsiye Edin" onPress={() => {}} />
                        <MenuItem icon="❓" label="Yardım Alın" onPress={() => {}} isLast />
                    </View>

                    {/* Group 5 */}
                    <View style={styles.menuGroup}>
                        <MenuItem icon="❓" label="FAQ" onPress={() => {}} />
                        <MenuItem icon="ℹ" label="Hizmet şartları" onPress={() => {}} isLast />
                    </View>
                </View>

                {/* Logout Button - scroll ile ulaşılır */}
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                        <Text style={styles.logoutIcon}>🚪</Text>
                        <Text style={styles.logoutText}>Çıkış yap</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    headerWrapper: {
        marginBottom: 24,
    },
    headerImage: {
        width: '100%',
        height: 140,
        backgroundColor: '#F0F0F0',
    },
    backButtonWrapper: {
        position: 'absolute',
        top: 12,
        left: 16,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 20,
        paddingLeft: 4,
    },
    avatarContainer: {
        marginRight: 14,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    avatarPlaceholder: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#7B68EE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarIcon: {
        fontSize: 32,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4,
    },
    userHandle: {
        fontSize: 14,
        color: '#666666',
    },
    menuContainer: {
        paddingHorizontal: 16,
        marginTop: 32,
    },
    menuGroup: {
        backgroundColor: '#000000',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(255,255,255,0.08)',
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuIcon: {
        fontSize: 18,
        color: '#FFFFFF',
        marginRight: 12,
        width: 24,
        textAlign: 'center',
    },
    menuLabel: {
        flex: 1,
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    menuArrow: {
        fontSize: 22,
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '300',
    },
    switchOuter: {
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#000000',
        padding: 2,
        justifyContent: 'center',
    },
    switchOuterActive: {
        backgroundColor: '#000000',
    },
    switchInner: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    switchInnerActive: {
        alignSelf: 'flex-end',
    },
    logoutContainer: {
        marginHorizontal: 16,
        marginTop: 28,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 12,
        paddingVertical: 16,
        gap: 10,
    },
    logoutIcon: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
