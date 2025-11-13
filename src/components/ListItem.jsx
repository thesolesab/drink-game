import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "../hooks/useStyles";
import StyledButton from "./StyledButton";

function ListItem({ item, onRemove, renderLabel = (item) => item }) {
  const styles = useStyles();
  return (
    <View style={[styles.rowBetween, styles.card, styles.withBorder]}>
      <Text style={styles.buttonText}>{renderLabel(item)}</Text>
      <StyledButton
        onPress={() => onRemove(item)}
        text="x"
        style={styles.removeButtonWithMargin}
        textStyle={styles.removeButtonText}
        activeOpacity={0.7}
      />
    </View>
  );
}

export default React.memo(ListItem, (a, b) => a.item === b.item && a.onRemove === b.onRemove);