import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { SPACING, TYPOGRAPHY } from "../../constants";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";


export default function SettingsTab() {
    const userName = useStore((state) => state.user.name);
    const [newUserName, setNewUserName] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const updateUserName = useStore((state) => state.updateUserName);

    const handleUpdateUserName = () => {
        if (newUserName.trim() !== '') {
            updateUserName(newUserName.trim());
            setNewUserName('');
        }
    };

    const handleReset = () => {
        setShowWarningModal(false);
        useStore.getState().reset();
    }

    const styles = useStyles();

    return (
        <View style={[styles.screen]}>
            <View style={styles.userSection}>
                <Text style={TYPOGRAPHY.heading}>User Name: {userName}</Text>
            </View>
            <View style={styles.card}>
                <TextInput
                    style={[styles.input, { marginBottom: SPACING.sm }]}
                    placeholder={`What is your name?`}
                    value={newUserName}
                    onChangeText={setNewUserName} />
                <Pressable style={styles.button} onPress={handleUpdateUserName}>
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
            </View>
            <Text style={TYPOGRAPHY.body}>Use the buttons above to manage toasts, nouns, and adjectives.</Text>

            {showWarningModal
                ? (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 80,
                            ...styles.centeredScreen,
                        }}
                    >
                        <Text style={TYPOGRAPHY.body}>Reset to default?</Text>
                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: SPACING.sm,
                            }}
                        >
                            <Button theme="primary" title="Yes" onPress={handleReset} />
                            <Button title="No" onPress={() => setShowWarningModal(false)} />
                        </View>
                    </View>
                )
                : (
                    <Button title="Reset to Default" onPress={() => setShowWarningModal(true)} />
                )
            }
        </View>
    );
}