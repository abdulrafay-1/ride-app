import { Stack } from "expo-router"


const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(drawer)" options={{
            headerShown : false,
        }} />
    </Stack>
  )
}

export default RootLayout