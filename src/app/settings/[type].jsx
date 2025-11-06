import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useStore } from "../../store/useStore";
import { useStyles } from "../../hooks/useStyles";
import { TYPOGRAPHY } from "../../constants";

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
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
      <Pressable onPress={() => handleRemoveItem(item)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>x</Text>
      </Pressable>
    </View>
  )

  return (
    <View style={styles.screen}>
      <Text style={TYPOGRAPHY.title}>{type}:</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={`Add new ${type.slice(0, -1)}`}
          value={newItemText}
          onChangeText={setNewItemText} />
        <Pressable style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.list}
      />


      <Pressable style={styles.backButton} onPress={() =>  router.back() }>
        <Text style={styles.backButtonText}>Go Back</Text>
      </Pressable>
    </View>
  );
}