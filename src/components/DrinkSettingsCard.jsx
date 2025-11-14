import { Switch, Text, TextInput, View } from "react-native";
import { SPACING, TYPOGRAPHY } from "../constants";
import { useStyles } from "../hooks/useStyles";

export default function DrinkSettingsCard({
  title = "Drink",
  make = false,
  onMakeChange = () => {},
  maxIngredients = "1",
  onMaxIngredientsChange = () => {},
  volume = "50",
  onVolumeChange = () => {},
  quantity = "1",
  onQuantityChange = () => {},
}) {
  const styles = useStyles();

  return (
    <View style={[styles.card, { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.sm }]}>
      {/* Make? — всегда видна */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{ ...TYPOGRAPHY.title, marginBottom: 0 }}>{title}:</Text>
        <Switch value={make} onValueChange={onMakeChange} />
      </View>

      {/* Остальные поля видны только если make = true */}
      {make && (
        <>
          <Text style={[styles.buttonText, { marginTop: SPACING.sm, fontSize: 12 }]}>Max ingredients:</Text>
          <TextInput
            style={[styles.input, { marginBottom: SPACING.sm, paddingVertical: 6, paddingHorizontal: 8 }]}
            value={maxIngredients}
            onChangeText={onMaxIngredientsChange}
            keyboardType="numeric"
          />

          <Text style={[styles.buttonText, { fontSize: 12 }]}>Size (ml):</Text>
          <TextInput
            style={[styles.input, { marginBottom: SPACING.sm, paddingVertical: 6, paddingHorizontal: 8 }]}
            value={volume}
            onChangeText={onVolumeChange}
            keyboardType="numeric"
          />

          <Text style={[styles.buttonText, { fontSize: 12 }]}>Number:</Text>
          <TextInput
            style={[styles.input, { marginBottom: SPACING.sm, paddingVertical: 6, paddingHorizontal: 8 }]}
            value={quantity}
            onChangeText={onQuantityChange}
            keyboardType="numeric"
          />
        </>
      )}
    </View>
  );
}