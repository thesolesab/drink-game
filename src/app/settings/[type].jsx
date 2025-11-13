import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import StyledButton from "../../components/StyledButton";
import UniversalList from "../../components/UniversalList";
import { SPACING, TYPOGRAPHY } from "../../constants";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";

export default function SettingsTypeScreen() {
  const { type } = useLocalSearchParams();

  const [newItemText, setNewItemText] = useState('');
  const items = useStore((state) => state[type]);
  const addItem = useStore((state) => state.setToArray);
  const removeItem = useStore((state) => state.removeFromArray);

  const styles = useStyles();

  const handleAddItem = () => {
    if (newItemText.trim() !== '') {
      addItem(type, newItemText.trim());
      setNewItemText('');
    }
  };
  const handleRemoveItem = (item) => removeItem(type, item);

  return (
    <View style={[styles.screen]}>
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
    </View>
  );
}