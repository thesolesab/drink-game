import { StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";

export const FormStyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: SPACING.sm,
        color: COLORS.text,
        ...TYPOGRAPHY.body,
    },
    inputFocused: {
        borderColor: COLORS.primary,
    },
    inputError: {
        borderColor: COLORS.danger,
    },
    label: {
        marginBottom: SPACING.xs,
        ...TYPOGRAPHY.body,
    },
    errorText: {
        color: COLORS.danger,
        marginTop: SPACING.xs,
        ...TYPOGRAPHY.body,
    },
});