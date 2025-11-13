# drink-game

Приложение на Expo (React Native + expo-router) для генерации коктейлей и выбора их с помощью рулетки.  
Проект использует файл‑маршрутизацию в `src/app`, Zustand для стора и `react-native-svg` для рендера колеса.

## Ключевые возможности
- Создание ингредиентов и генерация коктейлей (Generator).
- Хранение сгенерированных коктейлей в Zustand (persist).
- Колесо‑рулетка (Roulete), выбирающее коктейль из стора.
- Настройки пользователя и списков (Settings).

## Быстрый старт
Требования: Node.js, npm/yarn, Expo CLI.

1. Установить зависимости:
`npm install` или `yarn`
2. Запустить проект:
`npx expo start`
3. Открыть на Android/iOS/веб через Expo DevTools или эмулятор:
- Android emulator / device
- iOS simulator (macOS)
- Web (localhost)

Если возникают странности с кешем/шрифтами, перезапустите с очисткой:
`npx expo start -c`

## Важные зависимости
- `expo-router` — навигация (file-based routing)
- `zustand` — стор, с persist (AsyncStorage)
- `react-native-svg` — отрисовка колеса (установить через `expo install react-native-svg`)
- `@react-native-picker/picker` — нативные селекты (если используются)

## Структура проекта (основное)
- `src/app` — маршруты (index, generator, roulete, settings и т.д.)
- `src/app/*/_layout.jsx` — лэйауты для стека/вложенной навигации
- `src/store` — Zustand store (useStore.js)
- `src/components` — переиспользуемые компоненты (SettingsNavBar, StoreHydration и т.д.)
- `assets` — шрифты и ресурсы

## Замечания по навигации
- Для корректной истории и отображения кнопки "назад" используются вложенные Stack в `generator/_layout.jsx` и `roulete/_layout.jsx`.  
- В `src/app/_layout.jsx` для экранов, где есть вложенный Stack, рекомендуется выключать `headerShown` на корневом уровне, чтобы не дублировался заголовок.

## Разработка и вклад
- Код размещён в `src`. Для внесения исправлений — открывать соответствующий маршрут в `src/app`.
- Перед созданием pull request убедиться, что навигация и стор работают на устройстве/эмуляторе.

## Лицензия
MIT — содержимое проекта можно использовать и изменять.