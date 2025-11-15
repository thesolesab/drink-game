import { useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, useWindowDimensions, View } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
import CocktailCard from "../../components/CocktailCard";
import Modal from "../../components/Modal";
import StyledButton from "../../components/StyledButton";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants";
import useModal from "../../hooks/useModal";
import useRouletteDrawer from "../../hooks/useRouletteDrawer";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";


export default function RouletteScreen() {
  const styles = useStyles();
  const { width, height } = useWindowDimensions();
  const size = Math.min(width * 0.8, height * 0.8);
  const radius = size / 2;
  const cx = size / 2;
  const cy = size / 2;
  const { modal, openModal, closeModal } = useModal()
  const [winner, setWinner] = useState(null)

  const { polarToCartesian, randomLightColor, describeArc } = useRouletteDrawer()

  const duration = useStore((s) => s.user.duration) || 3;
  const itemsRaw = useStore((s) => s.drinks.store) || [];
  const [items, setItems] = useState(itemsRaw)

  const rotation = useRef(new Animated.Value(0)).current;
  const spinning = useRef(false);

  const spin = () => {
    if (spinning.current || items.length === 0) return;
    spinning.current = true;

    const segments = items.length;
    const baseSpins = duration * 2;
    const winnerIndex = Math.floor(Math.random() * segments);
    const sliceAngle = 360 / segments;
    const offsetInside = (Math.random() * sliceAngle) - sliceAngle / 2;
    const targetAngle = baseSpins * 360 + (360 - (winnerIndex * sliceAngle + sliceAngle / 2)) + offsetInside;

    Animated.timing(rotation, {
      toValue: targetAngle,
      duration: duration * 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const final = targetAngle % 360;
      const won = Math.floor(final / sliceAngle);
      spinning.current = false;
      rotation.setValue(final); // держим значение в 0..360
      const winner = items[won]
      setWinner(winner)
      openModal()
      setItems(() => items.filter(i => i.id !== winner.id))
    });
  };
  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  const sliceAngle = items.length > 0 ? 360 / items.length : 360;

  const renderWheel = (() => {
    if (items.length === 0) return <Text style={{ marginTop: SPACING.sm, color: COLORS.danger }}>Нет сгенерированных коктейлей в сторе</Text>;
    if (items.length === 1) return (
      <>
        <Text style={{ marginTop: SPACING.sm, color: COLORS.danger }}>Last cocktail: </Text>
        <CocktailCard item={items[0]} />
      </>
    );
    return (
      <Pressable onPress={spin} style={{ alignItems: "center" }}>
        {/* стрелка */}
        <View style={{
          width: 0, height: 0, borderLeftWidth: 12, borderRightWidth: 12,
          borderBottomWidth: 24, borderLeftColor: "transparent", borderRightColor: "transparent",
          borderBottomColor: COLORS.text, marginBottom: 8, position: "absolute", top: 50 % - 10, zIndex: 1000,
          transform: [{ rotate: "180deg" }]
        }} />

        <Animated.View style={{ transform: [{ rotate }] }}>
          <Svg width={size} height={size}>
            <G>
              {items.map(({ title, id }, i) => {
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
                      transform={`rotate(${mid + 90} ${textPos.x} ${textPos.y})`}
                    >
                      {title.length > 14 ? title.substr(0, 14) + "…" : title}
                    </SvgText>
                  </G>
                );
              })}
              <Circle cx={cx} cy={cy} r={radius * 0.04} fill="#fff" />
            </G>
          </Svg>
        </Animated.View>

        {/* <StyledButton
          onPress={spin}
          disabled={items.length === 0}
          style={{ opacity: items.length === 0 ? 0.5 : 1 }}
          text="Spin"
        /> */}
      </Pressable>
    )
  })();

  return (
    <View style={[styles.screen, { padding: SPACING.md }]}>
      <View style={{ alignItems: "center" }}>
        {renderWheel}
      </View>
      {modal &&
        <Modal handleClose={closeModal}>
          <Text style={TYPOGRAPHY.heading}>Win!Win!Win!</Text>
          <CocktailCard item={winner} />
          <StyledButton text='Close' onPress={closeModal} />
        </Modal>}
    </View>
  );
}