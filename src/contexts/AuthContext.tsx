import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { authService } from '../services/auth';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, pass: string, rememberMe?: boolean) => Promise<void>;
    signUp: (email: string, pass: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                // 1. Önce mevcut durumu dinle
                const unsubscribe = authService.onAuthStateChanged((currentUser) => {
                    setUser(currentUser);
                    // Kullanıcı gelirse loading biter
                    if (currentUser) {
                        setIsLoading(false);
                    }
                });

                // 2. Eğer kullanıcı null ise, local storage'dan otomatik giriş dene
                const currentUser = authService.getCurrentUser();
                if (!currentUser) {
                    const success = await authService.autoSignIn();
                    // Auto login başarısız olursa veya veri yoksa loading'i bitir
                    if (!success) {
                        setIsLoading(false);
                    }
                }

                return unsubscribe;
            } catch (error) {
                console.error("Auth init error:", error);
                setIsLoading(false);
            }
        };

        const unsubscribePromise = initAuth();

        return () => {
            unsubscribePromise.then(unsub => unsub && unsub());
        };
    }, []);

    const signIn = async (email: string, pass: string, rememberMe: boolean = false) => {
        await authService.signIn(email, pass, rememberMe);
    };

    const signUp = async (email: string, pass: string, name: string) => {
        await authService.signUp(email, pass, name);
    };

    const signOut = async () => {
        await authService.signOut();
    };

    const resetPassword = async (email: string) => {
        await authService.resetPassword(email);
    };

    const signInWithGoogle = async () => {
        await authService.signInWithGoogle();
    };

    const value = {
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
