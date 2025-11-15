import { Stack } from "expo-router";


export default function Layout() {
    return <Stack >
        <Stack.Screen name="index" options={{ title: 'Roulette', headerTitleAlign: 'center' }} />
    </Stack>
}