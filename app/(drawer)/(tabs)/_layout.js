import { Tabs } from 'expo-router'
import React from 'react'
import { Entypo, FontAwesome6 } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{
                title: "Book Ride",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({color}) => <FontAwesome6 name="car-side" size={23} color={color} />
            }} />
            <Tabs.Screen name='food/index' options={{
                title: "Food",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({color}) => <FontAwesome6 name="burger" size={23} color={color} />
            }} />
        </Tabs>
    )
}

export default TabsLayout;