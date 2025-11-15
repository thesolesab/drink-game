import { Pressable, Text } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants";

/**
 * Компонент для отображения временных сообщений (toast-уведомлений)
 * @param {Object} message - Объект с полями { text, type }
 * @param {Function} onClose - Функция для закрытия сообщения
 */
export default function Message({ message, onClose }) {
    if (!message) return null;

    const getColorByType = (type) => {
        switch (type) {
            case 'success':
                return COLORS.success;
            case 'error':
                return COLORS.danger;
            case 'warning':
                return COLORS.warning;
            case 'info':
            default:
                return COLORS.text;
        }
    };

    const backgroundColor = getColorByType(message.type);
    const isErrorOrWarning = message.type === 'error' || message.type === 'warning';

    return (
        <Pressable
            style={{
                position: 'absolute',
                top: 50,
                left: SPACING.md,
                right: SPACING.md,
                zIndex: 1000,
                backgroundColor: isErrorOrWarning ? backgroundColor : COLORS.card,
                borderRadius: 8,
                padding: SPACING.md,
                borderWidth: 1,
                borderColor: isErrorOrWarning ? backgroundColor : COLORS.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            onPress={onClose}
        >
            <Text
                style={[
                    TYPOGRAPHY.body,
                    {
                        color: isErrorOrWarning ? COLORS.text : getColorByType(message.type),
                        textAlign: 'center',
                    }
                ]}
            >
                {message.text}
            </Text>
        </Pressable>
    );
}

