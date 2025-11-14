import { StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";

const baseButton = {
  paddingVertical: SPACING.sm,
  paddingHorizontal: SPACING.lg,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const baseText = {
  ...TYPOGRAPHY.body,
  color: COLORS.text,
};

export const ButtonStyles = StyleSheet.create({
  primary: {
    ...baseButton,
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    ...baseText,
  },
  secondary: {
    ...baseButton,
    backgroundColor: COLORS.secondary,
  },
  secondaryText: {
    ...baseText,
  },
  outline: {
    ...baseButton,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  outlineText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.body,
  },
  remove: {
    ...baseButton,
    backgroundColor: COLORS.danger,
    width: 30,
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  removeText: {
    ...baseText,
    fontSize: 18,
  },
  danger: {
    ...baseButton,
    backgroundColor: COLORS.danger,
  },
  dangerText: {
    ...baseText,
  },
  succes: {
    ...baseButton,
    backgroundColor: COLORS.success,
  },
  succesText: {
    ...baseText,
  },
});