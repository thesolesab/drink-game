import { immer } from "zustand/middleware/immer"
const { create } = require("zustand")


const initialState = {
    adjectives: ['libre', 'long', 'strong', 'light', 'red'],
    nouns: ['cuba', 'island', 'octoober', 'budwiser', 'desire'],
    tosts: ['Cheers!', 'To absent friends', "Here's to you!",
        "Here's to your health!", "Here's to our hostess!", "Here's to our friends! To absent friends!",
        "To (our) success!", "Here’s to your happiness!", "Here’s to our friendship!", "To our meeting!",
        "I lift my glass to our charming ladies!", "Bottoms up!", "May your home be warmed by the love of family and friends"],
}

export const useStore = create(
    immer(
        (set)=>({
            ...initialState,


        })
    )
)