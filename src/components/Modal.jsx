import { Button, Text, View } from "react-native";
import { useStyles } from "../hooks/useStyles";
import { TYPOGRAPHY } from "../constants";


export default function Modal({onCloseModal}) {

    const styles = useStyles();
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 80,
                ...styles.centeredScreen,
            }}
        >
            <Text style={TYPOGRAPHY.body}>Reset to default?</Text>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: SPACING.sm,
                }}
            >
                <Button title="Yes" onPress={handleReset} />
                <Button title="No" onPress={onCloseModal} />
            </View>
        </View>
    )
}
