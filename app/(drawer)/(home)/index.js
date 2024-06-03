import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View, } from 'react-native'
import taxi from "../../../assets/taxi.png"
import fries from "../../../assets/frenchfries.png"
import { AntDesign } from '@expo/vector-icons';


const HomePage = () => {
  return (
    <View style={styles.maincon}>
      <Text style={styles.heading}>RIDE APP</Text>
      <View style={styles.container}>
        <Link href="(tabs)"><View style={styles.card}>
          <Image source={taxi} style={styles.imageIcons} />
          <View style={styles.cardTextCon}>
            <Text style={styles.cardText}>Book Ride</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </View>
        </View></Link>
        <Link href='(tabs)/food'>
          <View style={styles.card}>
            <Image source={fries} style={styles.imageIcons} />
            <View style={styles.cardTextCon}>
              <Text style={styles.cardText}>Order Food</Text>
              <AntDesign name="arrowright" size={24} color="black" />
            </View>
          </View>
        </Link>
      </View>
    </View>
  )


}

const styles = StyleSheet.create({
  maincon: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
    color: "#555555"
  },

  container: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 10,
  },
  imageIcons: {
    width: 120,
    height: 120,
    textAlign: 'center',
  },
  card: {
    backgroundColor: "#e4e4e4",
    padding: 12,
    borderRadius: 20,
  },
  cardTextCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "500",
  }
});

export default HomePage;