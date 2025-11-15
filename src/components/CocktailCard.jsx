import { Text, View } from "react-native";
import { SPACING } from "../constants";
import { toML } from "../hooks/useCocktailGenerator";
import { useStyles } from "../hooks/useStyles";

export default function CocktailCard({ item }) {
    const styles = useStyles()
    return (
        <View style={[styles.card, { marginBottom: SPACING.sm }]}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.title.toUpperCase()}</Text>
            <Text style={{ color: "#666", marginBottom: 6 }}>{item.descr}</Text>
            {item.composition?.map((c, idx) => (
                <Text key={idx} style={styles.buttonText}>
                    {renderCompositionItem(c)}
                </Text>
            ))}
            <Text style={{ marginTop: 6, color: "#444" }}>Total ML: {item.targetVolumeML}</Text>
        </View>
    );
}

function renderCompositionItem(c) {
    if (c.unit === 'l') {
        return `• ${c.name} — ${toML(Number(c.amount).toFixed(2), c.unit)} ml ${c.alco ? "(alc)" : ""}`
    }
    return `• ${c.name} — ${Number(c.amount).toFixed(2)} ${c.unit} ${c.alco ? "(alc)" : ""}`
}