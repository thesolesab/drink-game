import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from 'expo-zustand-persist';
import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";

const initialState = {
    user: {
        name: 'unknown',
        theme: 'dark',
    },
    adjectives: ['libre', 'long', 'strong', 'light', 'red'],
    nouns: ['cuba', 'island', 'october', 'budweiser', 'desire'],
    tosts: ['Cheers!', 'To absent friends', "Here's to you!",
        "Here's to your health!", "Here's to our hostess!", "Here's to our friends! To absent friends!",
        "To (our) success!", "Here’s to your happiness!", "Here’s to our friendship!", "To our meeting!",
        "I lift my glass to our charming ladies!", "Bottoms up!", "May your home be warmed by the love of family and friends"],
    drinks: {
        store: [],
        settings: {},
        ingredients: {}
    }
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