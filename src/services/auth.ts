import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    onAuthStateChanged, 
    updateProfile,
    User,
    getAuth,
    GoogleAuthProvider,
    signInWithCredential
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth } from '../config/firebaseConfig';

const REMEMBER_ME_KEY = '@auth_remember_me';

class AuthService {
    private static instance: AuthService;

    private constructor() {
        GoogleSignin.configure({
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
            // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     * Google ile giriş yapar
     */
    async signInWithGoogle(): Promise<User> {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo.data?.idToken;
            
            if (!idToken) {
                throw new Error('Google Sign-In failed: No idToken found');
            }

            const credential = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(auth, credential);
            return userCredential.user;
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                throw new Error('Giriş iptal edildi.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                throw new Error('Giriş işlemi zaten devam ediyor.');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                throw new Error('Google Play Hizmetleri kullanılamıyor.');
            } else {
                throw this.handleAuthError(error);
            }
        }
    }

    /**
     * Anlık kullanıcıyı döner
     */
    public getCurrentUser(): User | null {
        return auth.currentUser;
    }

    /**
     * Kullanıcı durumu değişikliğini dinler
     */
    public onAuthStateChanged(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, callback);
    }

    /**
     * Yeni kullanıcı kaydı oluşturur
     */
    async signUp(email: string, pass: string, name: string): Promise<User> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });

            return user;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Kullanıcı girişi yapar
     */
    async signIn(email: string, pass: string, rememberMe: boolean = false): Promise<User> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            
            if (rememberMe) {
                await this.saveRememberMeData(email, pass);
            } else {
                await this.clearRememberMeData();
            }

            return userCredential.user;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Beni hatırla verilerini kaydeder
     */
    private async saveRememberMeData(email: string, pass: string): Promise<void> {
        try {
            const data = JSON.stringify({ email, pass });
            await AsyncStorage.setItem(REMEMBER_ME_KEY, data);
        } catch (error) {
            console.error('Beni hatırla verisi kaydedilemedi', error);
        }
    }

    /**
     * Beni hatırla verilerini temizler
     */
    public async clearRememberMeData(): Promise<void> {
        try {
            await AsyncStorage.removeItem(REMEMBER_ME_KEY);
        } catch (error) {
            console.error('Beni hatırla verisi silinemedi', error);
        }
    }

    /**
     * Otomatik giriş denemesi yapar
     */
    public async autoSignIn(): Promise<boolean> {
        try {
            const data = await AsyncStorage.getItem(REMEMBER_ME_KEY);
            if (!data) return false;

            const { email, pass } = JSON.parse(data);
            if (email && pass) {
                await signInWithEmailAndPassword(auth, email, pass);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Otomatik giriş başarısız', error);
            return false;
        }
    }

    /**
     * Kullanıcı çıkışı yapar
     */
    async signOut(clearRememberMe: boolean = true): Promise<void> {
        try {
            await signOut(auth);
            if (clearRememberMe) {
                await this.clearRememberMeData();
            }
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Şifre sıfırlama
     */
    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Hata Yönetimi
     */
    private handleAuthError(error: any): Error {
        let message = 'Bir hata oluştu.';
        const code = error?.code || '';

        switch (code) {
            case 'auth/email-already-in-use':
                message = 'Bu e-posta adresi zaten kullanımda.';
                break;
            case 'auth/invalid-email':
                message = 'Geçersiz e-posta adresi.';
                break;
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
                message = 'Kullanıcı bulunamadı veya bilgiler hatalı.';
                break;
            case 'auth/wrong-password':
                message = 'Hatalı şifre.';
                break;
            case 'auth/too-many-requests':
                message = 'Çok fazla giriş denemesi. Lütfen bekleyin.';
                break;
            case 'auth/network-request-failed':
                message = 'İnternet bağlantınızı kontrol edin.';
                break;
            default:
                message = error.message;
        }

        return new Error(message);
    }
}

export const authService = AuthService.getInstance();
