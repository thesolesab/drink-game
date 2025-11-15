import { Text, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";
import { toML } from "../hooks/useCocktailGenerator";
import { useStyles } from "../hooks/useStyles";

export default function CocktailCard({ item }) {
    const styles = useStyles()
    return (
        <View style={[styles.card, { marginBottom: SPACING.sm }]}>
            <View style={[styles.rowBetween, { width: '100%' }]}>
                <View style={{ flex: 1, flexShrink: 1 }}>
                    <Text style={TYPOGRAPHY.heading}>{item.title.toUpperCase()}</Text>
                    <Text
                        style={{
                            color: COLORS.textSecondary,
                            marginBottom: SPACING.sm,
                        }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {item.descr}
                    </Text>
                    {item.composition?.map((c, idx) => (
                        <Text key={idx} style={styles.buttonText}>
                            {renderCompositionItem(c)}
                        </Text>
                    ))}
                    <Text style={{ marginTop: 6, color: COLORS.textSecondary }}>Total ML: {item.targetVolumeML} ml</Text>
                </View>
                <Text style={{ color: COLORS.textSecondary, transform: [{ rotate: "90deg" }] }}>{item.type}</Text>
            </View>
        </View>
    );
}

function renderCompositionItem(c) {
    if (c.unit === 'l') {
        return `• ${c.name} — ${toML(Number(c.amount).toFixed(2), c.unit)} ml ${c.alco ? "(alc)" : ""}`
    }
    return `• ${c.name} — ${Number(c.amount).toFixed(2)} ${c.unit} ${c.alco ? "(alc)" : ""}`
}