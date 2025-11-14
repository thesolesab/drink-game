import { useMemo } from "react"
import { COLORS, SPACING } from "../constants"
import { BaseStyles, ButtonStyles, FormStyles } from "../styles"

export const useStyles = () => {
    return useMemo(() => ({
        screen: BaseStyles.container,
        centeredScreen: Object.assign({}, BaseStyles.container, BaseStyles.center),

        card: BaseStyles.card,
        cardWithMargin: [BaseStyles.card, { marginBottom: SPACING.md }],

        button: ButtonStyles.primary,
        buttonText: ButtonStyles.primaryText,
        secondaryButton: ButtonStyles.secondary,
        secondaryButtonText: ButtonStyles.secondaryText,
        outlineButton: ButtonStyles.outline,
        outlineButtonText: ButtonStyles.outlineText,
        removeButton: ButtonStyles.remove,
        removeButtonWithMargin: [ButtonStyles.remove, { marginLeft: SPACING.sm }],
        removeButtonText: ButtonStyles.removeText,

        dangerButton: ButtonStyles.danger,
        dangerButtonText: ButtonStyles.dangerText,
        succesButton: ButtonStyles.succes,
        succesButtonText: ButtonStyles.succesText,

        input: FormStyles.input,
        label: FormStyles.label,

        navBar: BaseStyles.nav,

        row: BaseStyles.row,
        rowBetween: {...BaseStyles.row, ...BaseStyles.spaceBetween},
        center: BaseStyles.center,
        withBorder: { borderWidth: 1, borderColor: COLORS.border },
    }), [])
}