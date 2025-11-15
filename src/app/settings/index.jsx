import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import DrinkSettingsCard from "../../components/DrinkSettingsCard";
import Modal from "../../components/Modal";
import StyledButton from "../../components/StyledButton";
import { SPACING, TYPOGRAPHY } from "../../constants";
import useModal from "../../hooks/useModal";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";

const DEFAULT_SETTINGS = {
    cocktail: { make: false, maxIngredients: '4', volume: '300', quantity: '1' },
    shot: { make: false, maxIngredients: '1', volume: '30', quantity: '1' },
};

export default function SettingsTab() {
    const userName = useStore((state) => state.user.name);
    const [newUserName, setNewUserName] = useState('');
    const updateUserName = useStore((state) => state.updateUserName);
    const storedSettings = useStore((s) => s.drinks?.settings || {});

    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const styles = useStyles();
    const { modal, openModal, closeModal } = useModal();

    useEffect(() => {
        setSettings({
            cocktail: {
                make: !!storedSettings.cocktail?.make,
                maxIngredients: String(storedSettings.cocktail?.maxIngredients ?? 4),
                volume: String(storedSettings.cocktail?.volume ?? 300),
                quantity: String(storedSettings.cocktail?.quantity ?? 1),
            },
            shot: {
                make: !!storedSettings.shot?.make,
                maxIngredients: String(storedSettings.shot?.maxIngredients ?? 1),
                volume: String(storedSettings.shot?.volume ?? 30),
                quantity: String(storedSettings.shot?.quantity ?? 1),
            },
        });
    }, [storedSettings]);

    const handleUpdateUserName = useCallback(() => {
        if (newUserName.trim() === '') {
            openModal('error', {
                headerText: 'Empty name',
                warningText: 'Please enter your name',
            });
            return;
        }
        updateUserName(newUserName.trim());
        setNewUserName('');
        openModal('success', {
            headerText: 'Name updated!',
            warningText: 'Your name has been saved',
        });
    }, [newUserName, updateUserName, openModal]);

    const saveAllSettings = useCallback(() => {
        useStore.getState().setSettings(settings);
        openModal('success', {
            headerText: 'Settings saved!',
            warningText: 'Your preferences have been updated',
        });
    }, [settings, openModal]);

    const handleReset = useCallback(() => {
        useStore.getState().resetSettings();
        closeModal();
        openModal('success', {
            headerText: 'Reset complete!',
            warningText: 'Settings restored to default',
        });
    }, [openModal, closeModal]);

    const updateSetting = useCallback((type, key, value) => {
        setSettings((prev) => ({
            ...prev,
            [type]: { ...prev[type], [key]: value },
        }));
    }, []);

    return (
        <View style={[styles.screen, { gap: SPACING.sm, padding: SPACING.md }]}>
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

            <ScrollView style={{ flexGrow: 0, width: '100%' }} showsVerticalScrollIndicator={false}>
                {(['cocktail', 'shot']).map((type, index) => (
                    <View key={type}>
                        {index > 0 && <View style={{ height: SPACING.sm }} />}
                        <DrinkSettingsCard
                            title={type === 'cocktail' ? 'Cocktails' : 'Shots'}
                            make={settings[type].make}
                            onMakeChange={(val) => updateSetting(type, 'make', val)}
                            maxIngredients={settings[type].maxIngredients}
                            onMaxIngredientsChange={(val) => updateSetting(type, 'maxIngredients', val)}
                            volume={settings[type].volume}
                            onVolumeChange={(val) => updateSetting(type, 'volume', val)}
                            quantity={settings[type].quantity}
                            onQuantityChange={(val) => updateSetting(type, 'quantity', val)}
                        />
                    </View>
                ))}
            </ScrollView>

            <View style={[styles.rowBetween, { gap: SPACING.sm }]}>
                <StyledButton
                    onPress={saveAllSettings}
                    text="Save Settings"
                />
                <StyledButton
                    text="Reset to Default"
                    onPress={() => openModal('warning', {
                        headerText: 'Reset to default?',
                        warningText: 'This action cannot be undone',
                        onYes: handleReset,
                    })}
                    style={styles.dangerButton}
                    textStyle={styles.dangerButtonText}
                />
            </View>

            {/* Одна модалка для всех сценариев */}
            {modal && (
                <Modal
                    type={modal.type}
                    headerText={modal.headerText}
                    warningText={modal.warningText}
                    handleYes={() => {
                        modal.onYes?.();
                        closeModal();
                    }}
                    handleNo={closeModal}
                    handleClose={closeModal}
                />
            )}
        </View>
    );
}