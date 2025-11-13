import { useRouter } from "expo-router";
import { View } from "react-native";
import { SPACING } from "../constants";
import { useStyles } from "../hooks/useStyles";
import StyledButton from "./StyledButton";

export default function ScreenLayout({ children, showHomeButton = true }) {
  const router = useRouter();
  const styles = useStyles();

  return (
    <View style={[styles.screen, { paddingBottom: SPACING.md }]}>
      {children}
      {showHomeButton && (
        <StyledButton
          onPress={() => router.push('/')}
          text="Back to Home"
          style={{ marginTop: SPACING.md }}
        />
      )}
    </View>
  );
}