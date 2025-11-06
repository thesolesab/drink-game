import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants";

export const FormStyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: SPACING.sm,
        fontSize: 16,
        color: COLORS.background,
    },
    inputFocused: {
        borderColor: COLORS.primary,
    },
    inputError: {
        borderColor: COLORS.danger,
    },
    label: {
        fontSize: 16,
        marginBottom: SPACING.xs,
        fontWeight: '500',
    },
    errorText: {
        color: COLORS.danger,
        fontSize: 14,
        marginTop: SPACING.xs,
    },
});