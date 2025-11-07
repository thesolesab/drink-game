import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
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

  const renderItem = ({ item }) => (
    <View style={[styles.rowBetween, styles.card, styles.withBorder]}>
      <Text style={TYPOGRAPHY.body}>{item}</Text>
      <Pressable onPress={() => handleRemoveItem(item)} style={styles.removeButtonWithMargin}>
        <Text style={styles.removeButtonText}>x</Text>
      </Pressable>
    </View>
  )

  return (
    <View style={[styles.screen]}>
      <Text style={{ ...TYPOGRAPHY.title, textTransform: 'uppercase' }}>{type}:</Text>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={{ ...styles.card, flex: 1 }}
      />

      <View style={[styles.card, { justifyContent: 'flex-start' }]}>
        <TextInput
          style={[styles.input, { marginBottom: SPACING.sm }]}
          placeholder={`Add new ${type.slice(0, -1)}`}
          value={newItemText}
          onChangeText={setNewItemText} />
        <Pressable style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      {/* <Pressable style={styles.button} onPress={() =>  router.back() }>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable> */}
    </View>
  );
}