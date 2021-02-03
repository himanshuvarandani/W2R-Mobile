import { AntDesign } from "@expo/vector-icons"
import axios from "axios"
import * as React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export default function RetailerScreen({ navigation }) {
  const [shops, setShops] = React.useState([])

  React.useEffect(() => {
    async function myAsyncFunction() {
      await axios
        .get("http://10.0.2.2:5000/fetch/all_wholesaler_details")
        .then((response) => {
          setShops(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    myAsyncFunction()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {shops.map((element: any) => {
          return (
            <View key={element._id} style={styles.shop}>
              <View style={styles.transparency}>
                <Text style={styles.title}>{element.shopName}</Text>
                <Text>Address: {element.shopAddress}</Text>
                <Text>Owner: {element.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.transparency}
                onPress={() => {
                  navigation.navigate("ShopScreen", {
                    wholesalerId: element._id,
                  })
                }}
              >
                <AntDesign name="rightsquare" size={65} color="skyblue" />
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    marginBottom: 0,
    padding: 10,
    backgroundColor: "dodgerblue",
  },
  transparency: {
    backgroundColor: "transparent",
  },
})
