import { useCallback } from "react";
import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { useStyles } from "../hooks/useStyles";

export default function UniversalList({ data = [], onRemove, renderLabel }) {
  const renderItem = useCallback(
    ({ item }) => <ListItem item={item} onRemove={onRemove} renderLabel={renderLabel} />,
    [onRemove, renderLabel]
  );

  const styles = useStyles();

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => (item?.name ?? item?.id ?? index).toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={{ ...styles.card, flex: 1 }}
    />
  );
}