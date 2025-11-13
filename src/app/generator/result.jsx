import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useStyles } from "../../hooks/useStyles";


export default function ResultScreen() {
    const styles = useStyles();
    const router = useRouter();

    return (
        <View style={[styles.screen]}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Generated Result</Text>
            <View style={styles.rowBetween}>
                <TouchableOpacity style={styles.button} onPress={() => router.back()} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push("../roulete")} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Go to Roulete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
