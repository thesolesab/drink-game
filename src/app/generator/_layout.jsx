import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack >
            <Stack.Screen name="index" options={{ title: 'Generator', headerTitleAlign: 'center' }} />
            <Stack.Screen name="result" options={{ title: 'Result', headerTitleAlign: 'center' }} />
        </Stack>
    )
}