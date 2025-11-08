import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TYPOGRAPHY } from "../constants";
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