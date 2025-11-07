import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { TYPOGRAPHY } from "../constants";
import { useStyles } from "../hooks/useStyles";
import { useStore } from "../store/useStore";

export default function Index() {
  const name = useStore((state) => state.user.name);

  const styles = useStyles()

  return (
    <View style={styles.screen}>
      <Text style={TYPOGRAPHY.heading}>Welcome {name || 'unknown'}!</Text>
      <Link href="/settings" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>go to settings</Text>
        </Pressable>
      </Link>
    </View>
  );
}