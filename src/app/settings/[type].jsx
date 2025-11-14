import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Modal from "../../components/Modal";
import StyledButton from "../../components/StyledButton";
import UniversalList from "../../components/UniversalList";
import { SPACING, TYPOGRAPHY } from "../../constants";
import useModal from "../../hooks/useModal";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";

export default function SettingsTypeScreen() {
  const { type } = useLocalSearchParams();

  const [newItemText, setNewItemText] = useState('');
  const items = useStore((state) => state[type]);
  const addItem = useStore((state) => state.setToArray);
  const removeItem = useStore((state) => state.removeFromArray);

  const { modal, openModal, closeModal } = useModal();

  const styles = useStyles();

  const handleAddItem = () => {
    if (newItemText.trim() !== '') {
      addItem(type, newItemText.trim());
      setNewItemText('');
      openModal('success', {
        headerText: 'Success',
        warningText: `New ${type.slice(0, -1)} added successfully`,
      });
    } else {
      openModal('error', {
        headerText: 'Empty input',
        warningText: `Please enter a ${type.slice(0, -1)}`,
      });
    }
  };
  const handleRemoveItem = (item) => removeItem(type, item);

  return (
    <View style={[styles.screen, { gap: SPACING.sm }]}>
      <Text style={{ ...TYPOGRAPHY.title, textTransform: 'uppercase' }}>{type}:</Text>

      <UniversalList
        data={items}
        onRemove={handleRemoveItem}
        renderLabel={(item) => item}
      />

      <View style={[styles.card, { justifyContent: 'flex-start' }]}>
        <TextInput
          style={[styles.input, { marginBottom: SPACING.sm }]}
          placeholder={`Add new ${type.slice(0, -1)}`}
          value={newItemText}
          onChangeText={setNewItemText} />
        <StyledButton
          onPress={handleAddItem}
          text="Add"
        />
      </View>
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