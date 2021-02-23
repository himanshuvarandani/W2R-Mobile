import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import * as React from "react"
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native"

export default function WholesalerScreen({ navigation }) {
  const [shop, setShop] = React.useState({})
  const [products, setProducts] = React.useState([])

  const handleShop = (text) => {
    setShop(text)
  }

  const handleProducts = (text) => {
    setProducts(text)
  }

  const getWholesalerDetails = (id) => {
    axios
      .get("http://10.0.2.2:5000/fetch/wholesaler_details", {
        params: { id: id },
      })
      .then((response) => {
        handleShop(response.data)
        navigation.setOptions({ headerTitle: response.data.shopName })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getWholesalerProducts = (id) => {
    axios
      .get("http://10.0.2.2:5000/fetch/all_wholesaler_products", {
        params: { wholesalerId: id },
      })
      .then((response) => {
        handleProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const call = () => {
    AsyncStorage.getItem("key").then((id) => {
      getWholesalerDetails(id)
      getWholesalerProducts(id)
    })
  }

  return (
    <View style={styles.container} onLayout={call}>
      <ScrollView>
        <Text style={styles.title}>Your Products</Text>
        {products.map((element: any) => {
          return (
            <TouchableOpacity
              style={styles.shop}
              key={element._id}
              onPress={() => {
                navigation.navigate("ProductScreen", {
                  product: element,
                })
              }}
            >
              <View style={{ backgroundColor: "transparent" }}>
                <Text>{element.name}</Text>
                <Text>{element.brand}</Text>
                <Text>{element.description}</Text>
                <Text>{element.price}</Text>
                <Text>{element.quantity}</Text>
              </View>
              <View>
                <Image
                  source={{
                    uri:
                      "https://i.insider.com/5c9d2e7909b60352005dc059?width=1100&format=jpeg&auto=webp",
                  }}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          )
        })}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddProductScreen")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Click Here, To Add A New Product</Text>
        </TouchableOpacity>
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
    alignSelf: "center",
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
  image: { width: 100, height: 100 },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
})
