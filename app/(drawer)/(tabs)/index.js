import React, { useState, useEffect } from 'react';
import { Text, TextInput, Image, View, StyleSheet, ActivityIndicator, Alert, _View, Button, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import { FontAwesome5 } from '@expo/vector-icons';
import carImg from '../../../assets/car.png'

const Ride = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [inputFocusTo, setInputFocusTo] = useState(false);
  const [inputFocusFrom, setInputFocusFrom] = useState(false);
  const [inputTo, setInputTo] = useState("");
  const [inputFrom, setInputFrom] = useState("");
  const [inputData, setInputData] = useState([]);
  const [markerTo, setMarkerTo] = useState();
  const [markerFrom, setMarkerFrom] = useState();
  const [polylineCords, setPolylineCords] = useState()
  const [pathDistance, setPathDistance] = useState()




  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        // Prompt user to grant permissions again
        Alert.alert(
          'Location Access',
          'Location access is required for the app to function properly.',
          [
            { text: 'OK', onPress: () => requestLocationPermission() },
          ],
          { cancelable: false }
        );
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error fetching location');
        // Handle location fetch error
      }
    })();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error fetching location');
        // Handle location fetch error
      }
    } else {
      // Handle permission denial
      setErrorMsg('Permission to access location was denied');
    }
  };

  const autoCompleteLocations = (inputVal) => {
    if (!inputVal || inputVal.length === 0) {
      return;
    } else {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3CpShKecaYLrgnKFNcAIrEJuo0b9bZZFUvbfBWoNI97E='
        }
      };
      // useEffect(() => {
      const timer = setTimeout(() => {
        fetch(`https://api.foursquare.com/v3/autocomplete?query=${inputVal}&ll=24.8607%2C67.0011&radius=10000&types=place&limit=5`, options)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(response => {
            setInputData(response.results);
            console.log(inputData)
          })
          .catch(err => console.error(err));
      }, 2000);

    }
    // clearTimeout(timer)
    // return () => clearTimeout(timer)
    // }, [inputVal])
  }


  const getPolyLine = async () => {
    const query = new URLSearchParams({
      profile: 'car',
      point: 'string',
      point_hint: 'string',
      snap_prevention: 'string',
      curbside: 'any',
      locale: 'en',
      elevation: 'false',
      details: 'string',
      optimize: 'false',
      instructions: 'true',
      calc_points: 'true',
      debug: 'false',
      points_encoded: 'true',
      'ch.disable': 'false',
      heading: '0',
      heading_penalty: '120',
      pass_through: 'false',
      algorithm: 'round_trip',
      'round_trip.distance': '10000',
      'round_trip.seed': '0',
      'alternative_route.max_paths': '2',
      'alternative_route.max_weight_factor': '1.4',
      'alternative_route.max_share_factor': '0.6',
      key: 'YOUR_API_KEY_HERE'
    }).toString();

    const resp = await fetch(
      `https://graphhopper.com/api/1/route?point=${markerFrom.place.geocodes.main.latitude},${markerFrom.place.geocodes.main.longitude}&point=${markerTo.place.geocodes.main.latitude},${markerTo.place.geocodes.main.longitude}&key=bde7dbd1-1d40-4f98-a05d-24ab70b5af83`,
      { method: 'GET' }
    );

    const data = await ((resp.text()));
    const parsedData = JSON.parse(data);
    setPathDistance(parsedData.paths[0].distance)
    const encodedPolyline = parsedData.paths[0].points;
    const decodedPolyline = polyline.decode(encodedPolyline);
    const coordinates = decodedPolyline.map(point => ({
      latitude: point[0],
      longitude: point[1],
    }));
    console.log('coordinates : ' + JSON.stringify(coordinates))
    setPolylineCords(coordinates)
    console.log(parsedData);
  }



  useEffect(() => {
    if (markerFrom) {
      console.log("markerFrom : " + JSON.stringify(markerFrom));
    }
    if (markerTo) {
      console.log("markerTo : " + JSON.stringify(markerTo));
    }

    if (markerTo && markerFrom) {
      getPolyLine()
    }
  }, [markerFrom, markerTo]);



  return (
    <View style={styles.container}>
      {location ? (
        <MapView style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }} >
          {polylineCords ? <Polyline
            coordinates={polylineCords} //specify our coordinates
            strokeColor={"#0787ff"}
            strokeWidth={6}
          /> : ''}

          {markerFrom ? <Marker coordinate={{ latitude: markerFrom.place.geocodes.main.latitude, longitude: markerFrom.place.geocodes.main.longitude }}
            title={markerFrom.text.primary}
          /> : <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title={"Your Location"}
          />}
          {markerTo && <Marker coordinate={{ latitude: markerTo.place.geocodes.main.latitude, longitude: markerTo.place.geocodes.main.longitude }}
            title={markerTo.text.primary}

          // centerOffset={{ x: -18, y: -60 }}
          // anchor={{ x: 0.69, y: 1 }}
          ><Image
              source={carImg}
              style={{ height: 45, width: 45 }}
            /></Marker>}
        </MapView>
      ) : (
        <Text>{errorMsg}</Text> || <ActivityIndicator size="large" color="#00ff00" />
      )}
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <TextInput
          style={
            [styles.input, { borderWidth: inputFocusFrom ? 3 : 1 }]
          }
          placeholder='From'
          onFocus={() => setInputFocusFrom(true)}
          onBlur={() => setInputFocusFrom(false)}
          onChangeText={(e) => { setInputFrom(e) }}
          onChange={() => autoCompleteLocations(inputFrom)}
          value={inputFrom}
        />
        <TextInput
          style={
            [styles.input, { borderWidth: inputFocusTo ? 3 : 1 }]
          }
          placeholder='To'
          onFocus={() => setInputFocusTo(true)}
          onBlur={() => setInputFocusTo(false)}
          onChangeText={(e) => { setInputTo(e) }}
          onChange={() => { autoCompleteLocations(inputTo) }}
          value={inputTo}
        />
        {inputData && inputData.map(data => <Pressable
          onPress={() => {
            if (inputFocusFrom) {
              setInputFrom(data.text.primary)
              setMarkerFrom(data)
            } else {
              setInputTo(data.text.primary)
              setMarkerTo(data)
            }
            setInputData()
          }}
          style={{
            width: "90%",
            height: 40,
            padding: 5,
            borderBottomColor: "#000",
            marginTop: 5,
            borderBottomWidth: 1,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff"
          }
          }><Text>{data.text.primary}</Text></Pressable>)}
      </View>
      <View style={{ flex: 1 }}></View>
      {pathDistance && <View><View style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}><Text style={{ width: "95%", backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: '#009947', padding: 12, fontSize: 22, }}>Distance : {(pathDistance / 1000).toFixed(2)}km</Text></View>
        <View style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}><Text style={{ width: "95%", backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: '#009947', padding: 12, fontSize: 22, }}>Price : {Math.round((pathDistance / 1000) * 80)}rs</Text></View>
      </View>}
      {console.log(inputTo, inputFrom, inputData)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: '100%',
    height: '100%',
    position: "absolute"
  },
  input: {
    height: 50,
    width: "90%",
    backgroundColor: "#f4f4f4",
    borderWidth: 1,
    borderColor: "#009947",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  }

});

export default Ride;
