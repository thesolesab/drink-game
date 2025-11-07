import { useEffect, useState } from "react";
import { View } from "react-native-web";
import { TYPOGRAPHY } from "../constants";
import { Text } from "react-native";
import { useStore } from "../store/useStore";


export default function StoreHydration({ children }) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const unsubscribe = useStore.persist.onFinishHydration(() => {
            setIsHydrated(true);
        });

        if (useStore.persist.hasHydrated()) {
            setIsHydrated(true);
        }

        return unsubscribe;
    }, []);

    if (!isHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={TYPOGRAPHY.heading}>Loading...</Text>
            </View>
        )
    }
    return children;
}