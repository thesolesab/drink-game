import { Text, View } from "react-native";
import { SPACING } from "../constants";
import { useStyles } from "../hooks/useStyles";

export default function CocktailCard({ item }) {
    const styles = useStyles()
    return (
        <View style={[styles.card, { marginBottom: SPACING.sm }]}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.title}</Text>
            <Text style={{ color: "#666", marginBottom: 6 }}>{item.descr}</Text>
            {item.composition?.map((c, idx) => (
                <Text key={idx} style={styles.buttonText}>
                    • {c.name} — {Number(c.amount).toFixed(2)} {c.unit} {c.alco ? "(alc)" : ""}
                </Text>
            ))}
            <Text style={{ marginTop: 6, color: "#444" }}>Total ML: {item.targetVolumeML}</Text>
        </View>
    );
}