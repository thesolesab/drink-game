import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import CocktailCard from "../../components/CocktailCard";
import StyledButton from "../../components/StyledButton";
import { SPACING } from "../../constants";
import useCocktailGenerator from "../../hooks/useCocktailGenerator";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";


export default function ResultScreen() {
  const styles = useStyles();
  const router = useRouter();
  const drinks = useStore((s) => s.drinks.store) || [];
  const { generateFromStore, clearGenerated } = useCocktailGenerator();
  const [loading, setLoading] = useState(false);

  const onGenerate = async () => {
    setLoading(true);
    await generateFromStore(); // берёт ингредиенты из стора и пишет коктейли в стор
    setLoading(false);
  };

  const onClear = () => {
    clearGenerated();
  };

  useEffect(() => {
    // если сразу перешли на Result и ещё нет коктейлей — сгенерируем автоматически
    if (!drinks || drinks.length === 0) {
      onGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }) => (<CocktailCard item={item}/>);

  return (
    <View style={[styles.screen, { padding: SPACING.md }]}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: SPACING.sm }}>Generated cocktails</Text>

      <FlatList
        data={drinks}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        style={{ flex: 1 }}
        ListEmptyComponent={<Text style={{ color: "#666" }}>No cocktails yet</Text>}
      />

      <View style={{ flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md }}>
        <StyledButton onPress={() => router.back()} text="Back" style={{ flex: 1 }} />
        <StyledButton onPress={onGenerate} disabled={loading} text={loading ? "Generating..." : "Generate"} style={{ flex: 1 }} />
        <StyledButton onPress={onClear} text="Clear" style={{ flex: 1, backgroundColor: "#aaa" }} />
        <StyledButton onPress={() => router.push("../roulete")} text="Go to Roulete"/>
      </View>
    </View>
  );
}
