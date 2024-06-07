import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="(home)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                        drawerIcon: ({color}) => <Ionicons name="home-outline" size={24} color={color} />,

                    }}
                />
                <Drawer.Screen
                    name="(tabs)" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Ride',
                        title: 'Ride & Food',
                        drawerIcon: ({color}) => <MaterialIcons name="directions-bike" size={24} color={color} />,
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
