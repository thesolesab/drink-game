import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { TYPOGRAPHY } from "../constants";
import { useStyles } from "../hooks/useStyles";
import { useStore } from "../store/useStore";

export default function Index() {
  const router = useRouter();
  const name = useStore((state) => state.user.name);

  const styles = useStyles()
  
  return (
    <View style={styles.screen}>
      <Text style={TYPOGRAPHY.heading}>Welcome {name}!</Text>
      <Button title="Go to Settings" onPress={() => router.navigate('/settings')} />
    </View>
  );
}