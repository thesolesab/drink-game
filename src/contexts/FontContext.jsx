import { createContext } from 'react';
import { Text, TextInput } from 'react-native';

const FontContext = createContext();

export const FontProvider = ({ children }) => {

    const CustomText = ({ style, ...props }) => (
        <Text {...props} style={[{ fontFamily: 'WDXRegular' }, style]} {...props} />
    )

    const CustomTextInput = ({ style, ...props }) => (
        <TextInput {...props} style={[{ fontFamily: 'WDXRegular' }, style]} {...props} />
    )

    return (
        <FontContext.Provider value={{ CustomText, CustomTextInput }}>
            {children}
        </FontContext.Provider>
    );
}