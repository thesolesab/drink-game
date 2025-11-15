import { StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";

export const BaseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...TYPOGRAPHY.body,
        color: COLORS.text,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 10,
        padding: SPACING.md,
        width: '100%',
    },
    nav: {
        display: 'flex',
        padding: 10,
        gap: SPACING.sm,
        backgroundColor: COLORS.background,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceBetween: {
        gap: SPACING.sm,
        justifyContent: 'space-between',
    },

});