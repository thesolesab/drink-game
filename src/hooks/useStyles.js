import { useMemo } from "react"
import { SPACING } from "../constants"
import { BaseStyles, ButtonStyles, FormStyles } from "../styles"

export const useStyles = () => {
    return useMemo(() => ({
        screen: BaseStyles.container,
        centeredScreen: [BaseStyles.container, BaseStyles.center],

        card: BaseStyles.card,
        cardWithMargin: [BaseStyles.card, { marginBottom: SPACING.md }],

        button: ButtonStyles.primary,
        buttonText: ButtonStyles.primaryText,
        secondaryButton: ButtonStyles.secondary,
        secondaryButtonText: ButtonStyles.secondaryText,
        outlineButton: ButtonStyles.outline,
        outlineButtonText: ButtonStyles.outlineText,
        dangerButton: ButtonStyles.danger,
        dangerButtonText: ButtonStyles.dangerText,

        input: FormStyles.input,
        label: FormStyles.label,

        row: BaseStyles.row,
        rowBetween: [BaseStyles.row, BaseStyles.spaceBetween],
        center: BaseStyles.center,
    }), [])
}