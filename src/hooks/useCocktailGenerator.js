import { useCallback } from "react";
import { useStore } from "../store/useStore";

const UNIT_TO_ML = { ml: 1, l: 1000, g: 1, kg: 1000, pcs: 30 };
export const toML = (amount, unit) => amount * (UNIT_TO_ML[unit] || 1);
const fromML = (ml, unit) => ml / (UNIT_TO_ML[unit] || 1);

export default function useCocktailGenerator() {
  const getState = useStore.getState;
  const setState = useStore.setState;

  const clearGenerated = useCallback(() => {
    setState((s) => ({ drinks: { ...s.drinks, store: [] } }));
  }, [setState]);

  // Генерирует один коктейль с ограничением алкоголя <= 50%
  const generateCocktail = useCallback((availableMap, type = "cocktail", targetVolumeML = 50, maxIngredients = 4) => {
    const available = JSON.parse(JSON.stringify(availableMap)); // глубокая копия
    const totalNeeded = targetVolumeML;
    const alcoholLimit = totalNeeded * 0.5;
    let composition = {};
    let currentTotal = 0;
    let currentAlcoholML = 0;

    const poolBase = Object.values(available).filter((i) => Number(i.amount) > 0);
    if (poolBase.length === 0) return null;

    let attempts = 0;
    while (currentTotal < totalNeeded - 1e-6 && attempts < 200) {
      attempts++;
      // Если еще не достигнут максимум ингредиентов, выбираем из всех доступных
      // Если достигнут максимум, выбираем только из уже добавленных
      const pool = Object.values(composition).length < maxIngredients ? poolBase : Object.values(composition);
      const candidate = pool[Math.floor(Math.random() * pool.length)];
      if (!candidate) break;

      const name = candidate.name;
      const availML = toML(available[name].amount, available[name].unit);
      if (availML <= 0) {
        // Если ингредиент закончился и мы достигли максимума ингредиентов,
        // попробуем найти другой доступный ингредиент из poolBase
        if (Object.values(composition).length >= maxIngredients) {
          const alternative = poolBase.find((p) => {
            const pML = toML(available[p.name].amount, available[p.name].unit);
            return pML > 0 && !composition[p.name];
          });
          if (!alternative) break;
          continue;
        }
        continue;
      }

      const remainingNeeded = totalNeeded - currentTotal;
      const remainingAllowedAlcoholML = Math.max(0, alcoholLimit - currentAlcoholML);

      let takeML = Math.min(remainingNeeded, availML);
      if (candidate.alco) {
        takeML = Math.min(takeML, remainingAllowedAlcoholML);
        if (takeML <= 0) {
          const nonAlco = poolBase.find((p) => !p.alco && toML(p.amount, p.unit) > 0);
          if (!nonAlco) break;
          continue;
        }
      }

      const addedAmountInUnit = fromML(takeML, candidate.unit);
      composition[name] = {
        name,
        unit: candidate.unit,
        amount: ((composition[name]?.amount || 0) + addedAmountInUnit),
        alco: !!candidate.alco,
      };

      const remainAfter = Math.max(0, availML - takeML);
      available[name].amount = fromML(remainAfter, candidate.unit);
      currentTotal += takeML;
      if (candidate.alco) currentAlcoholML += takeML;
    }

    if (currentTotal < totalNeeded - 1e-6) return null;

    const result = Object.values(composition).map((c) => ({
      name: c.name,
      amount: Number(c.amount.toFixed(3)),
      unit: c.unit,
      alco: !!c.alco,
    }));

    const generator = new (function Generator() {
      this.adjectives = getState().adjectives || ['libre', 'long'];
      this.nouns = getState().nouns || ['cuba', 'island'];
      this.tost = getState().tosts || ['Cheers'];
      this.generateName = () => `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]} ${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`;
      this.generateTost = () => this.tost[Math.floor(Math.random() * this.tost.length)];
    })()

    return {
      title: generator.generateName(),
      descr: generator.generateTost(),
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      type,
      targetVolumeML: totalNeeded,
      composition: result,
    };
  }, [getState]);

  // Генерирует набор коктейлей по настройкам из стора
  const generateFromStore = useCallback(async () => {
    const s = getState();
    const settings = s.drinks?.settings || {};
    const ingredientsMap = s.drinks?.ingredients || {};

    // Не мутируем исходный объект — копируем
    let available = JSON.parse(JSON.stringify(ingredientsMap));

    const orders = [];
    for (const [type, opts] of Object.entries(settings)) {
      if (opts && opts.make) {
        orders.push({
          type,
          volume: Number(opts.volume) || 50,
          quantity: Number(opts.quantity) || 1,
          maxIngredients: Number(opts.maxIngredients) || 4,
        });
      }
    }

    if (orders.length === 0) {
      orders.push({ type: "cocktail", volume: 50, quantity: 1, maxIngredients: 4 });
    }

    const generated = [];

    for (const order of orders) {
      const targetQuantity = order.quantity || 1;
      let generatedCount = 0;
      console.log(`Generating ${targetQuantity} ${order.type}(s) with volume ${order.volume}ml`);

      for (let i = 0; i < targetQuantity; i++) {
        // каждый раз генерируем с текущим available (постепенно его истощаем)
        const cocktail = generateCocktail(available, order.type, order.volume, order.maxIngredients);
        if (!cocktail) {
          console.warn(`Could not generate ${order.type} #${i + 1}/${targetQuantity} — not enough ingredients`);
          // Продолжаем попытки для остальных коктейлей, но пропускаем этот
          continue;
        }

        // Обновляем available, вычитая использованные ингредиенты
        // (generateCocktail работает с копией, поэтому нужно обновить основной available)
        cocktail.composition.forEach((c) => {
          const avail = available[c.name];
          if (avail) {
            const usedML = toML(c.amount, c.unit);
            const currentML = toML(avail.amount, avail.unit);
            const remainML = Math.max(0, currentML - usedML);
            avail.amount = fromML(remainML, avail.unit);
            // Если ингредиент закончился, можно установить amount в 0
            if (remainML < 1e-6) {
              avail.amount = 0;
            }
          }
        });

        generated.push(cocktail);
        generatedCount++;
      }

      console.log(`Successfully generated ${generatedCount}/${targetQuantity} ${order.type}(s)`);
    }

    setState((st) => ({ drinks: { ...st.drinks, store: generated } }));
    return generated;
  }, [getState, setState, generateCocktail]);

  return { generateFromStore, clearGenerated };
}