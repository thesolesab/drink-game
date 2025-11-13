import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../hooks/useStyles";


export default function StyledButton({
  onPress = null,
  children,
  text = "",
  style = {},
  textStyle = {},
  disabled = false,
  activeOpacity = 0.8,
  icon = null, // иконка слева (компонент, например <Ionicons />)
  iconPosition = "left", // "left" или "right"
  ...props
}) {

  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { flexDirection: iconPosition === "right" ? "row-reverse" : "row", alignItems: "center", gap: 6 },
        style, // style идёт ПОСЛЕ базовых — переопределяет flexDirection и другие свойства
        disabled ? { opacity: 0.6 } : null,
      ]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {icon && <View>{icon}</View>}
      <Text style={[styles.buttonText, textStyle]}>
        {children ?? text}
      </Text>
    </TouchableOpacity>
  );
}
