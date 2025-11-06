import { StyleSheet } from "react-native";
import { COLORS, SPACING} from "../constants";

export const BaseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'WDXRegular',
        fontSize: 18,
        color: '#fff',
    },
    card:{
        backgroundColor: COLORS.card,
        borderRadius: 10,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
});