import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants";


export const ButtonStyles = StyleSheet.create({
    primary: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondary: {
        backgroundColor: COLORS.secondary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    outline:{
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineText:{
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },

    danger:{
        backgroundColor: COLORS.danger,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        jcccontent: 'center',
    },
    dangerText:{
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
