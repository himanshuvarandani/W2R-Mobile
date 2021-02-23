import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import React from "react"
import {
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

export default function ProductScreen({ navigation, route }) {
  const product = route.params.product
  const wholesalerId = route.params.wholesalerId

  const check = (cart, retailerId, productId, price) => {
    if (cart.wholesalerId == "") {
      updateRetailerCart(retailerId, [productId], [1], price)
    } else {
      const productIds = cart.productIds
      const quantities = cart.quantities

      productIds.push(productId)
      quantities.push(1)

      if (cart.wholesalerId === wholesalerId) {
        updateRetailerCart(
          retailerId,
          productIds,
          quantities,
          cart.totalPrice + price
        )
      } else {
        Alert.alert(
          "Cart",
          "Did you want to empty the cart for adding this product from another shop?",
          [
            {
              text: "Yes",
              onPress: () =>
                updateRetailerCart(retailerId, [productId], [1], price),
            },
            {
              text: "No",
              style: "cancel",
            },
          ]
        )
      }
    }
  }

  const updateRetailerCart = (
    retailerId,
    productIds,
    quantities,
    totalPrice
  ) => {
    axios
      .post("http://10.0.2.2:5000/update/update_retailer_cart", {
        retailerId: retailerId,
        wholesalerId: wholesalerId,
        productIds: productIds,
        quantities: quantities,
        totalPrice: totalPrice,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          navigation.goBack()
        } else {
          alert("Something went wrong.")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const addProductIdToCart = (productId, price) => {
    AsyncStorage.getItem("key").then((retailerId) => {
      axios
        .get("http://10.0.2.2:5000/fetch/retailer_cart_details", {
          params: { retailerId: retailerId },
        })
        .then((response) => {
          check(response.data, retailerId, productId, price)
        })
        .catch(function (error) {
          console.log(error)
        })
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{
            uri:
              "https://i.insider.com/5c9d2e7909b60352005dc059?width=1100&format=jpeg&auto=webp",
          }}
          style={styles.background}
        >
          <View style={styles.product}>
            <Text style={styles.heading}>{product.name}</Text>
            <Text style={styles.text}>{product.description}</Text>
            <Text style={styles.text}>Brand :- {product.brand}</Text>
            <Text style={styles.text}>Price :- Rs.{product.price}</Text>
            <Text style={styles.text}>Quantity :- {product.quantity}</Text>
            <Button
              title="Add to Cart"
              onPress={() => addProductIdToCart(product._id, product.price)}
            />
            {/* <Image
              source={{
                uri:
                  "https://i.insider.com/5c9d2e7909b60352005dc059?width=1100&format=jpeg&auto=webp",
              }}
              style={{ width: 300, height: 300 }}
            /> */}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  product: {
    height: 500,
    margin: 15,
    marginBottom: 0,
    padding: 10,
    justifyContent: "center",
  },
  background: {
    resizeMode: "cover",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 5,
    color: "white",
  },
  text: { color: "white" },
})
