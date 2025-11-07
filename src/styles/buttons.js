import { StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";


export const ButtonStyles = StyleSheet.create({
    primary: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    primaryText: {
        color: COLORS.text,
        ...TYPOGRAPHY.body,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    secondaryText: {
        color: COLORS.text,
        ...TYPOGRAPHY.body,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    outlineText: {
        color: COLORS.primary,
        ...TYPOGRAPHY.body,
    },
    remove:{
        backgroundColor: COLORS.danger,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    removeText:{
        color: COLORS.text,
        ...TYPOGRAPHY.body,
        fontSize: 18,
    },

    danger: {
        backgroundColor: COLORS.danger,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        jcccontent: 'center',
        cursor: 'pointer',
    },
    dangerText: {
        color: COLORS.text,
        ...TYPOGRAPHY.body,
    },
});
