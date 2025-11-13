import { useRef } from "react";
import { Alert, Animated, Easing, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
import StyledButton from "../../components/StyledButton";
import { COLORS, SPACING } from "../../constants";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";

/**
 * Колесо рулетки — использует drinks.store из стора.
 * Каждый элемент ожидается как объект или строка; метка берётся из item.name || item.title || item.
 */

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", cx, cy,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
}

function randomLightColor(seed) {
  // детерминированный-ish цвет по индексу seed для стабильности
  const h = Math.floor(((seed * 47) % 360));
  const s = 55;
  const l = 70;
  return `hsl(${h} ${s}% ${l}%)`;
}

export default function RuleteScreen() {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const size = Math.min(width - SPACING.md * 2, 360);
  const radius = size / 2;
  const cx = size / 2;
  const cy = size / 2;

  const itemsRaw = useStore((s) => s.drinks.store) || [];
  // нормализуем метки
  const items = itemsRaw.map((it) => (typeof it === "string" ? it : (it?.name ?? it?.title ?? JSON.stringify(it))));

  const rotation = useRef(new Animated.Value(0)).current;
  const spinning = useRef(false);

  const spin = () => {
    if (spinning.current || items.length === 0) return;
    spinning.current = true;

    const segments = items.length;
    const baseSpins = 6;
    const winnerIndex = Math.floor(Math.random() * segments);
    const sliceAngle = 360 / segments;
    const offsetInside = (Math.random() * sliceAngle) - sliceAngle / 2;
    const targetAngle = baseSpins * 360 + (360 - (winnerIndex * sliceAngle + sliceAngle / 2)) + offsetInside;

    Animated.timing(rotation, {
      toValue: targetAngle,
      duration: 3500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const final = targetAngle % 360;
      const normalized = ((360 - final) + sliceAngle / 2) % 360;
      const won = Math.floor(normalized / sliceAngle) % segments;
      spinning.current = false;
      rotation.setValue(final); // держим значение в 0..360
      Alert.alert("Result", items[won] ?? "—");
    });
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const sliceAngle = items.length > 0 ? 360 / items.length : 360;

  return (
    <View style={[styles.screen, { padding: SPACING.md }]}>
      <View style={{ alignItems: "center" }}>
        {/* стрелка */}
        <View style={{
          width: 0, height: 0, borderLeftWidth: 12, borderRightWidth: 12,
          borderBottomWidth: 24, borderLeftColor: "transparent", borderRightColor: "transparent",
          borderBottomColor: "#111", marginBottom: 8,
        }} />

        <Animated.View style={{ transform: [{ rotate }] }}>
          <Svg width={size} height={size}>
            <G>
              {items.map((label, i) => {
                const start = i * sliceAngle;
                const end = start + sliceAngle;
                const d = describeArc(cx, cy, radius, start, end);
                const fill = randomLightColor(i + 1);
                const mid = start + sliceAngle / 2;
                const textPos = polarToCartesian(cx, cy, radius * 0.65, mid);
                return (
                  <G key={i}>
                    <Path d={d} fill={fill} stroke="#fff" strokeWidth={1} />
                    <SvgText
                      x={textPos.x}
                      y={textPos.y}
                      fontSize={12}
                      fill="#111"
                      fontWeight="700"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform={`rotate(${mid} ${textPos.x} ${textPos.y})`}
                    >
                      {label.length > 14 ? label.substr(0, 14) + "…" : label}
                    </SvgText>
                  </G>
                );
              })}
              <Circle cx={cx} cy={cy} r={radius * 0.14} fill="#fff" />
            </G>
          </Svg>
        </Animated.View>

        <StyledButton
          onPress={spin}
          disabled={items.length === 0}
          style={{ opacity: items.length === 0 ? 0.5 : 1 }}
          text="Spin"
        />

        {items.length === 0 && (
          <Text style={{ marginTop: SPACING.sm, color: COLORS.danger }}>Нет сгенерированных коктейлей в сторе</Text>
        )}
      </View>
    </View>
  );
}