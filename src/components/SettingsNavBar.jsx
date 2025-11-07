import { Text } from "react-native";
import { useStyles } from "../hooks/useStyles";
import { COLORS } from "../constants";

const pages = [
    { id: 'main', title: 'Main Settings' },
    { id: 'tosts', title: 'Manage Toasts' },
    { id: 'nouns', title: 'Manage Nouns' },
    { id: 'adjectives', title: 'Manage Adjectives' },
]

export default function SettingsNavBar({ currentPage, onNavigate }) {
    const styles = useStyles();
    
    return (
        <nav style={{display: 'flex', width: '100%', padding: 10, backgroundColor: COLORS.background, flexDirection: 'row', justifyContent: 'center'}}>
            {pages.map((page) => (
                <button
                    key={page.id}
                    onClick={() => onNavigate(page.id)}
                    style={{
                        ...styles.button,
                        ...(currentPage === page.id ? styles.dangerButton : {})
                    }}
                >
                  <Text style={styles.buttonText}>{page.title}</Text> 
                </button>
            ))}
        </nav>
    );
}