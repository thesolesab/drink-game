import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import StyledButton from "../../components/StyledButton";
import UniversalList from "../../components/UniversalList";
import { SPACING } from "../../constants";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";


export default function Generator() {
    const router = useRouter();
    const ingredients = useStore((state) => state.drinks.ingredients);
    const addIngredient = useStore((state) => state.addIngredient);
    const removeIngredient = useStore((state) => state.removeIngredient);

    const styles = useStyles();

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("l");
    const [alco, setAlco] = useState(false);

    const handleRemoveItem = useCallback((item) => {
        removeIngredient(item.name);
    }, [removeIngredient]);

    const ingredientsArray = Object.values(ingredients);

    const handleAdd = () => {
        if (!name.trim() || !amount.trim()) {
            return; // можно добавить уведомление, если нужно
        }

        const newIngredient = {
            name: name.trim(),
            amount: parseFloat(amount),
            unit,
            alco: !!alco,
        };

        addIngredient(newIngredient);

        // очистить поля
        setName("");
        setAmount("");
    }

    return (
        <View style={[styles.screen]}>
            <UniversalList
                data={ingredientsArray}
                onRemove={handleRemoveItem}
                renderLabel={(item) => `${item.name.toUpperCase()}: ${(+item.amount).toFixed(2)}, ${item.unit}`}
            />
            <View style={{ padding: 12 }}>
                <Text style={styles.buttonText}>Add ingredient</Text>

                <TextInput
                    style={[styles.input, { marginBottom: SPACING.sm }]}
                    placeholder="ingredient"
                    value={name}
                    onChangeText={setName}
                    returnKeyType="next"
                />

                <TextInput
                    style={styles.input}
                    placeholder="amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />

                <Picker
                    selectedValue={unit}
                    onValueChange={(v) => setUnit(v)}
                    style={[styles.input, { marginVertical: SPACING.sm, color: 'black' }]}
                >
                    <Picker.Item label="ml" value="ml" />
                    <Picker.Item label="liter" value="l" />
                    <Picker.Item label="g" value="g" />
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="pcs" value="pcs" />
                </Picker>

                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <Text style={[styles.buttonText, { marginRight: SPACING.sm }]}>Alco</Text>
                    <Switch value={alco} onValueChange={setAlco} />
                </View>
                <StyledButton
                    onPress={handleAdd}
                    text="Add ingredient"
                />
                <View style={styles.center}>
                    <StyledButton
                        onPress={() => {
                            router.push('/generator/result');
                        }}
                        style={{ marginTop: SPACING.md }}
                        text="Generate"
                    />
                </View>
            </View>
        </View>
    )
}