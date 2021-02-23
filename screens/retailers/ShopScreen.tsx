import axios from "axios"
import * as React from "react"
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export default function ShopScreen({ navigation, route }) {
  const [products, setProducts] = React.useState([])
  const wholesalerId = route.params.wholesalerId

  React.useEffect(() => {
    async function myAsyncFunction() {
      await axios
        .get("http://10.0.2.2:5000/fetch/all_wholesaler_products", {
          params: { wholesalerId: wholesalerId },
        })
        .then((response) => {
          setProducts(response.data)
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
        {products.map((element: any) => {
          return (
            <TouchableOpacity
              style={styles.shop}
              onPress={() => {
                navigation.navigate("ProductScreen", {
                  product: element,
                  wholesalerId: wholesalerId,
                })
              }}
              key={element._id}
            >
              <View>
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  shop: {
    height: 120,
    margin: 15,
    marginBottom: 0,
    padding: 10,
    backgroundColor: "dodgerblue",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  image: { width: 100, height: 100 },
})
