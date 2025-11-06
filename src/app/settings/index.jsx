import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../constants";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";


export default function SettingsScreen() {
    const userName = useStore((state) => state.user.name);

    const styles = useStyles();

    return (
        <View style={styles.screen}>
            <Text style={TYPOGRAPHY.title}>Settings</Text>

            <View style={styles.userSection}>
                <Text style={styles.userName}>User Name: {userName}</Text>
            </View>

            <View style={styles.rowBetween}>
                <Link href="/settings/tosts" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Manage Toasts</Text>
                    </Pressable>
                </Link>

                <Link href="/settings/nouns" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Manage Nouns</Text>
                    </Pressable>
                </Link>

                <Link href="/settings/adjectives" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Manage Adjectives</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    )
}