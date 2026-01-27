import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    onAuthStateChanged, 
    updateProfile,
    User,
    // @ts-ignore
    setPersistence,
    // @ts-ignore
    inMemoryPersistence
} from 'firebase/auth';
import { auth, authPersistence } from '../config/firebaseConfig';

class AuthService {
    private static instance: AuthService;

    private constructor() { }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
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

            // Kullanıcı ismini güncelle
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
     * @param remember - Beni hatırla seçeneği (True ise kalıcı, False ise oturum bazlı)
     */
    async signIn(email: string, pass: string, remember: boolean = true): Promise<User> {
        try {
            await setPersistence(auth, remember ? authPersistence : inMemoryPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            return userCredential.user;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Kullanıcı çıkışı yapar
     */
    async signOut(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Şifre sıfırlama e-postası gönderir
     */
    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Firebase hatalarını Türkçe mesaja çevirir
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
            case 'auth/operation-not-allowed':
                message = 'E-posta/şifre girişi etkin değil.';
                break;
            case 'auth/weak-password':
                message = 'Şifre çok zayıf.';
                break;
            case 'auth/user-disabled':
                message = 'Kullanıcı hesabı devre dışı bırakılmış.';
                break;
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
                message = 'Kullanıcı bulunamadı veya bilgiler hatalı.';
                break;
            case 'auth/wrong-password':
                message = 'Hatalı şifre.';
                break;
            case 'auth/too-many-requests':
                message = 'Çok fazla giriş denemesi yapıldı. Lütfen daha sonra tekrar deneyin.';
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
