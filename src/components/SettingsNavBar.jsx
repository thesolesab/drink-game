import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { COLORS } from "../constants";
import { useStyles } from "../hooks/useStyles";
import StyledButton from "./StyledButton";

const pages = [
    { id: 'main', title: 'Main', icon: (currentPage, id) => (currentPage === id ? 'home-sharp' : 'home-outline') },
    { id: 'tosts', title: 'Toasts', icon: (currentPage, id) => (currentPage === id ? 'notifications-sharp' : 'notifications-outline') },
    { id: 'nouns', title: 'Nouns', icon: (currentPage, id) => (currentPage === id ? 'book-sharp' : 'book-outline') },
    { id: 'adjectives', title: 'Adjectives', icon: (currentPage, id) => (currentPage === id ? 'book-sharp' : 'book-outline') },
]



export default function SettingsNavBar({ currentPage, onNavigate }) {
    const styles = useStyles();

    return (
        <View style={[styles.navBar, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }]}>
            {pages.map((page) => {
                const active = currentPage === page.id;
                return (
                    <StyledButton
                        key={page.id}
                        onPress={() => onNavigate(page.id)}
                        text={page.title}
                        icon={<Ionicons name={page.icon(currentPage, page.id)} size={18} color={active ? COLORS.onPrimary || '#fff' : COLORS.text} />}
                        style={[
                            active ? { backgroundColor: COLORS.primary || '#0a84ff' } : {},
                            { flexDirection: 'column', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12 }
                        ]}
                        activeOpacity={0.7}
                    />
                );
            })}
        </View>
    );
}