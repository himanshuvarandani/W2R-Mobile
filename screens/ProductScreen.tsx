import React from "react"
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

export default function ProductScreen({ route }) {
  const product = route.params.product

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
