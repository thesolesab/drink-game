import { useRouter } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";
import AddIngredientForm from "../../components/AddIngredientForm";
import Modal from "../../components/Modal";
import StyledButton from "../../components/StyledButton";
import UniversalList from "../../components/UniversalList";
import { SPACING } from "../../constants";
import useModal from "../../hooks/useModal";
import { useStyles } from "../../hooks/useStyles";
import { useStore } from "../../store/useStore";


export default function Generator() {
    const router = useRouter();
    const ingredients = useStore((state) => state.drinks.ingredients);
    const removeIngredient = useStore((state) => state.removeIngredient);
    const { modal, openModal, closeModal } = useModal();

    const styles = useStyles();


    const handleRemoveItem = useCallback((item) => {
        removeIngredient(item.name);
    }, [removeIngredient]);

    const ingredientsArray = Object.values(ingredients);

    return (
        <View style={[styles.screen]}>
            <UniversalList
                data={ingredientsArray}
                onRemove={handleRemoveItem}
                renderLabel={(item) => `${item.name.toUpperCase()}: ${(+item.amount).toFixed(2)}, ${item.unit}`}
            />

            <View style={[styles.rowBetween, { marginTop: SPACING.sm }]}>
                <StyledButton
                    onPress={openModal}
                    text="Add ingredient"
                />
                <StyledButton
                    onPress={() => {
                        router.push('/generator/result');
                    }}
                    disabled={ingredientsArray.length === 0}
                    text="Generate"
                />
            </View>
            {modal && (
                <Modal handleClose={closeModal}                >
                    <AddIngredientForm closeModal={closeModal} />
                </Modal>
            )}
        </View>
    )
}