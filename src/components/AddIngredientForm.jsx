import { Picker } from "@react-native-picker/picker";
import { useRef, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";
import { useStyles } from "../hooks/useStyles";
import { useStore } from "../store/useStore";
import StyledButton from "./StyledButton";

export default function AddIngredientForm({ closeModal }) {
    const addIngredient = useStore((state) => state.addIngredient);
    const styles = useStyles();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("ml");
    const [alco, setAlco] = useState(false);
    const [error, setError] = useState(null);
    const nameInputRef = useRef(null);
    const amountInputRef = useRef(null);

    const handleAdd = () => {
        if (!name.trim() || !amount.trim()) {
            setError("Please fill in all fields.");

            if (!nameInputRef?.current.value) {
                nameInputRef.current.focus();
            } else {
                amountInputRef.current.focus()
            }
            return;
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
        <>
            <Text style={TYPOGRAPHY.heading}>Add ingredient</Text>
            {error && <Text style={[TYPOGRAPHY.title, { color: COLORS.danger }]}>{error}</Text>}
            <View style={{
                display: 'grid',
                gridTemplateColumns: '4fr 1fr',
                width: '100%',
                gap: SPACING.sm,
                alignItems: 'center',
                justifyItems: 'center'
            }}>
                <TextInput
                    ref={nameInputRef}
                    style={[styles.input, { marginBottom: SPACING.sm }]}
                    placeholder="ingredient"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        if (error) setError(null);
                    }}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        if (amountInputRef?.current) {
                            amountInputRef.current.focus();
                        }
                    }}
                />
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <Text style={[styles.buttonText, { marginRight: SPACING.sm }]}>Alco</Text>
                    <Switch value={alco} onValueChange={setAlco} />
                </View>

                <TextInput
                    ref={amountInputRef}
                    style={styles.input}
                    placeholder="amount"
                    value={amount}
                    onChangeText={(text) => {
                        setAmount(text);
                        if (error) setError(null);
                    }}
                    keyboardType="numeric"
                />

                <Picker
                    selectedValue={unit}
                    onValueChange={(v) => setUnit(v)}
                    style={[styles.input, { marginVertical: SPACING.sm, color: 'black', width: 'auto' }]}
                >
                    <Picker.Item label="ml" value="ml" />
                    <Picker.Item label="liter" value="l" />
                    <Picker.Item label="g" value="g" />
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="pcs" value="pcs" />
                </Picker>
            </View>
            <View style={styles.rowBetween}>
                <StyledButton
                    onPress={() =>
                        handleAdd
                            ? handleAdd({ name, amount, unit, alco })
                            : null
                    }
                    text="Add ingredient"
                />
                <StyledButton
                    onPress={closeModal}
                    text="Close"
                />
            </View>
        </>
    )
}