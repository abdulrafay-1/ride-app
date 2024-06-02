import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Food = () => {
    return (
        <View style={styles.container}>
            <Text>Food is in Progress</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    }
})

export default Food