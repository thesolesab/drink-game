import { Pressable, Text, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";
import { useStyles } from "../hooks/useStyles";
import StyledButton from "./StyledButton";

export default function Modal({
    type = "info", // "warning" | "success" | "error" | "info"
    headerText = "Alert",
    warningText = "",
    headerTextColor = null,
    warningTextColor = null,
    children,
    handleYes = () => { },
    handleNo = () => { },
    handleClose = () => { },
}) {

    const styles = useStyles();

    // определяем кнопки и цвета по типу
    const config = {
        warning: {
            buttons: 'dual', // Yes/No
            defaultWarningColor: COLORS.warning,
        },
        success: {
            buttons: 'single', // Close
            defaultWarningColor: COLORS.success,
        },
        error: {
            buttons: 'single', // Close
            defaultWarningColor: COLORS.danger,
        },
        info: {
            buttons: 'single', // Close
            defaultWarningColor: COLORS.info,
        },
    };

    const currentConfig = config[type] || config.info;
    const isSingleButton = currentConfig.buttons === 'single';
    const finalWarningColor = warningTextColor || currentConfig.defaultWarningColor;
    const finalHeaderColor = headerTextColor || COLORS.text;

    return (
        <Pressable
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onPress={handleClose} // закрытие по нажатию фона
        >
            <Pressable
                style={{
                    backgroundColor: COLORS.background,
                    borderRadius: 12,
                    padding: SPACING.md,
                    width: '100%',
                    alignItems: 'center',
                    gap: SPACING.md,
                }}
                onPress={(e) => e.stopPropagation()} // предотвращаем пропагацию клика на фон
            >
                {children ? (
                    children
                ) : (
                    <>
                        <Text style={[TYPOGRAPHY.title, { color: finalHeaderColor }]}>
                            {headerText}
                        </Text>
                        {warningText ? (
                            <Text style={[TYPOGRAPHY.body, { color: finalWarningColor }]}>
                                {warningText}
                            </Text>
                        ) : null}

<<<<<<< Updated upstream
                {children}

                <View style={{
                    flexDirection: 'row',
                    gap: SPACING.sm,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {isSingleButton ? (
                        <StyledButton onPress={handleClose} text="Close" />
                    ) : (
                        <>
                            <StyledButton onPress={handleYes} text="Yes" />
                            <StyledButton
                                onPress={handleNo || handleClose}
                                text="No"
                                style={{ backgroundColor: COLORS.secondary }}
                            />
                        </>
                    )}
                </View>
=======
                        <View style={{
                            flexDirection: 'row',
                            gap: SPACING.sm,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {isSingleButton ? (
                                <StyledButton onPress={handleClose} text="Close" />
                            ) : (
                                <>
                                    <StyledButton onPress={handleYes} text="Yes" />
                                    <StyledButton
                                        onPress={handleNo || handleClose}
                                        text="No"
                                        style={{ backgroundColor: COLORS.secondary }}
                                    />
                                </>
                            )}
                        </View>
                    </>
                )}
>>>>>>> Stashed changes
            </Pressable>
        </Pressable>
    );
}
