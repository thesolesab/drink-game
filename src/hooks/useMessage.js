import { useCallback, useEffect, useState } from "react";

/**
 * Хук для управления временными сообщениями (toast-уведомлениями)
 * @param {number} defaultDuration - Длительность отображения сообщения в миллисекундах (по умолчанию 3000)
 * @returns {Object} Объект с текущим сообщением и функциями для управления
 */
export default function useMessage(defaultDuration = 3000) {
    const [message, setMessage] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    // Очищаем таймер при размонтировании
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    /**
     * Показывает сообщение
     * @param {string} text - Текст сообщения
     * @param {string} type - Тип сообщения: 'success', 'error', 'warning', 'info' (по умолчанию 'info')
     * @param {number} duration - Длительность отображения в миллисекундах (опционально, использует defaultDuration если не указано)
     */
    const showMessage = useCallback((text, type = 'info', duration = null) => {
        // Очищаем предыдущий таймер, если есть
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Устанавливаем новое сообщение
        setMessage({ text, type });

        // Устанавливаем таймер для автоматического скрытия
        const actualDuration = duration !== null ? duration : defaultDuration;
        if (actualDuration > 0) {
            const id = setTimeout(() => {
                setMessage(null);
                setTimeoutId(null);
            }, actualDuration);
            setTimeoutId(id);
        }
    }, [defaultDuration, timeoutId]);

    /**
     * Скрывает текущее сообщение
     */
    const hideMessage = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setMessage(null);
    }, [timeoutId]);

    /**
     * Удобные методы для разных типов сообщений
     */
    const showSuccess = useCallback((text, duration = null) => {
        showMessage(text, 'success', duration);
    }, [showMessage]);

    const showError = useCallback((text, duration = null) => {
        showMessage(text, 'error', duration);
    }, [showMessage]);

    const showWarning = useCallback((text, duration = null) => {
        showMessage(text, 'warning', duration);
    }, [showMessage]);

    const showInfo = useCallback((text, duration = null) => {
        showMessage(text, 'info', duration);
    }, [showMessage]);

    return {
        message,
        showMessage,
        hideMessage,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
}

