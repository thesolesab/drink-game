import { Text, View } from "react-native";
import { TYPOGRAPHY } from "../../constants";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";


export default function SettingsTab() {
    const userName = useStore((state) => state.user.name);

    const styles = useStyles();

    return (
        <View style={[styles.screen]}>
            <Text style={TYPOGRAPHY.title}>Settings</Text>

            <View style={styles.userSection}>
                <Text style={styles.userName}>User Name: {userName}</Text>
            </View>

            <Text style={TYPOGRAPHY.body}>Use the buttons above to manage toasts, nouns, and adjectives.</Text>
        </View>
    );
}