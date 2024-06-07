import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import * as Location from 'expo-location';
import { Link, Navigator, router } from 'expo-router';

const Ride = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          'Location',
          'Location access denied Please give location access for application to run properly',
          [
            { text: 'OK', onPress: () => router.replace("(drawer)") },
          ],
          { cancelable: false }
        )

        // Location.requestForegroundPermissionsAsync();
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <View style={styles.container}>
      {/* Fix Location Async BUGS and LOGIC */}
       {location && <MapView style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : 24.905840,
          longitude: location ? location.coords.longitude : 67.085987,
          latitudeDelta: location ? 0.01 : 0.3,
          longitudeDelta: location ? 0.01 : 0.3,
        }} >
        {location && <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
          // pinColor={""} // any color
          title={"Your Location"}
        />}
      </MapView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    position: "absolute"
  },
});

export default Ride;