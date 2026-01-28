export default {
    expo: {
        name: "ArtBazaar",
        slug: "ArtBazaarP",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./src/assets/Logo.png",
        userInterfaceStyle: "light",
        scheme: "artbazaar",
        newArchEnabled: true,
        splash: {
            image: "./src/assets/Logo.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.artbazaar.app"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./src/assets/Logo.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true,
            launchMode: "singleTask",
            package: "com.artbazaar.app",
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./google-services.json"
        },
        web: {
            favicon: "./src/assets/Logo.png",
            bundler: "metro",
            output: "single"
        },
        plugins: [
            "expo-router",
            "expo-font",
            "@react-native-google-signin/google-signin",
            [
                "react-native-fbsdk-next",
                {
                    appID: "1268833478439759",
                    clientToken: "83bf98ac71bd4fbaf60a47f74428b895",
                    displayName: "ArtBazaar",
                    scheme: "fb1268833478439759"
                }
            ]
        ],
        extra: {
            router: {},
            eas: {
                projectId: "186fcc2b-ac45-4609-8a23-1119f0ef4861"
            }
        }
    }
};
