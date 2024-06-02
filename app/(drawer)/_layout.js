import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                
                <Drawer.Screen
                    name="(home)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                    }}
                />
                <Drawer.Screen
                    name="(tabs)" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Ride',
                        title: 'Ride',
                    }}
                />
                
            </Drawer>
        </GestureHandlerRootView>
    );
}
