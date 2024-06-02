import { Link } from 'expo-router';
import React from 'react'
import { Text, View } from 'react-native'

const HomePage = () => {
  return (
    <View>
      <Text>HomePage</Text>
      <Link href='(tabs)'>Order Ride</Link>
      <Link href='(tabs)/food'>Order Food</Link>
    </View>
  )
}

export default HomePage;