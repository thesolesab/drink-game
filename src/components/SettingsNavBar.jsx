import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { COLORS, SPACING } from "../constants";
import { useStyles } from "../hooks/useStyles";

const pages = [
    { id: 'main', title: 'Main', icon: (currentPage, id) => (currentPage === id ? 'home-sharp' : 'home-outline') },
    { id: 'tosts', title: 'Toasts', icon: (currentPage, id) => (currentPage === id ? 'notifications-sharp' : 'notifications-outline') },
    { id: 'nouns', title: 'Nouns', icon: (currentPage, id) => (currentPage === id ? 'book-sharp' : 'book-outline') },
    { id: 'adjectives', title: 'Adjectives', icon: (currentPage, id) => (currentPage === id ? 'book-sharp' : 'book-outline') },
]



export default function SettingsNavBar({ currentPage, onNavigate }) {
    const styles = useStyles();

    return (
        <View style={{ display: 'flex', padding: 10, gap: SPACING.sm, backgroundColor: COLORS.background, flexDirection: 'row', justifyContent: 'center' }}>
            {pages.map((page) => (
                <Pressable
                    key={page.id}
                    onPress={() => onNavigate(page.id)}
                >
                    <Ionicons name={page.icon(currentPage, page.id)} size={20} color={COLORS.text} />
                    <Text style={styles.buttonText}>{page.title}</Text>
                </Pressable>
                // <Button
                //     key={page.id}
                //     title="dd"
                //     onClick={() => onNavigate(page.id)}
                //     style={{
                //         ...styles.button,
                //         ...(currentPage === page.id ? styles.dangerButton : {}),
                //         display: 'flex', flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
                //     }}
                // >

                // </Button>
            ))}
        </View>
    );
}