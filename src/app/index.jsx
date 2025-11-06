import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../store/useStore";

export default function Index() {
  const tosts = useStore((state) => state.tosts);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tosts:</Text>
      {tosts.map((tost, index) => (
        <Text key={index} style={styles.text}>{tost}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'WDXRegular',
    fontSize: 18,
    color: '#fff',
  },
})
