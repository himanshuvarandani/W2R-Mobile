import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import * as React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

export default function AddProductScreen({ navigation }) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [tags, setTags] = React.useState([])
  const [imageUrls, setImageUrls] = React.useState([])
  const [brand, setBrand] = React.useState("")
  const [price, setPrice] = React.useState(Number)
  const [quantity, setQuantity] = React.useState(Number)

  const handleName = (text) => {
    setName(text)
  }

  const handleDescription = (text) => {
    setDescription(text)
  }

  const handleTags = (text) => {
    setTags(text.split(","))
  }

  const handleBrand = (text) => {
    setBrand(text)
  }

  const handlePrice = (text) => {
    setPrice(text)
  }

  const handleQuantity = (text) => {
    setQuantity(text)
  }

  const add = async (
    name,
    description,
    tags,
    imageUrls,
    brand,
    price,
    quantity
  ) => {
    AsyncStorage.getItem("key").then((id) => {
      axios
        .post("http://10.0.2.2:5000/add/add_wholesaler_product", {
          wholesalerId: id,
          name: name,
          description: description,
          tags: tags,
          imageUrls: imageUrls,
          brand: brand,
          price: price,
          quantity: quantity,
        })
        .then((response) => {
          if (response.data.status === "ok") {
            navigation.navigate("WholesalerScreen")
          } else {
            alert("Something went wrong.")
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Product Name"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleName}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Description"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleDescription}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Tags"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleTags}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Brand"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleBrand}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Price"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          keyboardType="number-pad"
          onChangeText={handlePrice}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Quantity"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          keyboardType="number-pad"
          onChangeText={handleQuantity}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            add(name, description, tags, imageUrls, brand, price, quantity)
          }
        >
          <Text style={styles.submitButtonText}> Add </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
})
