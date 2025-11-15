import { Picker } from "@react-native-picker/picker";
import { useRef, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import { SPACING, TYPOGRAPHY } from "../constants";
import useMessage from "../hooks/useMessage";
import { useStyles } from "../hooks/useStyles";
import { useStore } from "../store/useStore";
import Message from "./Message";
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
    const { message, showSuccess, showError, hideMessage } = useMessage()

    const handleAdd = () => {
        if (!name.trim() || !amount.trim()) {
            setError("Please fill in all fields.");
            showError("Please fill in all fields.")

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

        showSuccess("Ингредиент успешно добавлен!")
        addIngredient(newIngredient);
        // очистить поля
        setName("");
        setAmount("");
    }

    return (
        <>
            <Text style={TYPOGRAPHY.heading}>Add ingredient</Text>
            <Message message={message} onClose={hideMessage} />

            {/* Первая строка: название ингредиента и переключатель Alco */}
            <View style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginBottom: SPACING.sm,
                gap: SPACING.sm,
            }}>
                <TextInput
                    ref={nameInputRef}
                    style={[styles.input, { flex: 4, marginBottom: 0 }]}
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
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", maxWidth: '10%' }}>
                    <Text style={[styles.buttonText, { marginRight: SPACING.sm }]}>Alco</Text>
                    <Switch value={alco} onValueChange={setAlco} />
                </View>
            </View>

            {/* Вторая строка: количество и единица измерения */}
            <View style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginBottom: SPACING.sm,
                gap: SPACING.sm,
            }}>
                <TextInput
                    ref={amountInputRef}
                    style={[styles.input, { flex: 4, marginBottom: 0 }]}
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
                    style={[styles.input, { flex: 1, marginVertical: 0, color: 'black', maxWidth: '10%' }]}
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
                    onPress={handleAdd}
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