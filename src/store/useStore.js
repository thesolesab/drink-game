import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from 'expo-zustand-persist';
import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";

const initialState = {
    user: {
        name: 'unknown',
        theme: 'dark',
        duration: 3,
    },
    adjectives: ['libre', 'long', 'strong', 'light', 'red'],
    nouns: ['cuba', 'island', 'october', 'budweiser', 'desire'],
    toasts: ['Cheers!', 'To absent friends', "Here's to you!",
        "Here's to your health!", "Here's to our hostess!", "Here's to our friends! To absent friends!",
        "To (our) success!", "Here’s to your happiness!", "Here’s to our friendship!", "To our meeting!",
        "I lift my glass to our charming ladies!", "Bottoms up!", "May your home be warmed by the love of family and friends"],
    drinks: {
        store: [],
        settings: {
            cocktail: {
                make: true,
                maxIngredients: 4,
                volume: 300,
                quantity: 10
            },
            shot: {
                make: true,
                maxIngredients: 1,
                volume: 70,
                quantity: 5
            }
        },
        ingredients: {}
    }
}

// дефолтные настройки для удобства нормализации / сброса
const DEFAULT_DRINK_SETTINGS = initialState.drinks.settings;

function normalizeSettings(input = {}) {
    const s = input || {};
    return {
        cocktail: {
            make: !!s.cocktail?.make,
            maxIngredients: Number(s.cocktail?.maxIngredients) || DEFAULT_DRINK_SETTINGS.cocktail.maxIngredients,
            volume: Number(s.cocktail?.volume) || DEFAULT_DRINK_SETTINGS.cocktail.volume,
            quantity: Number(s.cocktail?.quantity) || DEFAULT_DRINK_SETTINGS.cocktail.quantity,
        },
        shot: {
            make: !!s.shot?.make,
            maxIngredients: Number(s.shot?.maxIngredients) || DEFAULT_DRINK_SETTINGS.shot.maxIngredients,
            volume: Number(s.shot?.volume) || DEFAULT_DRINK_SETTINGS.shot.volume,
            quantity: Number(s.shot?.quantity) || DEFAULT_DRINK_SETTINGS.shot.quantity,
        },
    };
}

export const useStore = create(
    persist(
        immer(
            (set) => (
                {
                    ...initialState,

                    updateUserName: (newName) => set((state) => { state.user.name = newName }),
                    setToArray: (array, newItem) => set((state) => { state[array].push(newItem) }),
                    removeFromArray: (array, item) => set((state) => { state[array] = state[array].filter(i => i !== item) }),
                    reset: () => set(() => initialState),

                    // заменить настройки полностью (с нормализацией)
                    setSettings: (newSettings) => set((state) => { state.drinks.settings = normalizeSettings(newSettings); }),

                    addIngredient: (newIngredient) => set((state) => { state.drinks.ingredients[newIngredient.name] = newIngredient }),
                    removeIngredient: (ingredientName) => set((state) => { delete state.drinks.ingredients[ingredientName] }),
                    addDrink: (newDrink) => set((state) => { state.drinks.store.push(newDrink) }),
                }
            )
        ),
        {
            name: 'drink-game-storage',
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,
        }
    )
);