import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import * as React from "react"
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [type, setType] = React.useState("R")
  const [name, setName] = React.useState("")
  const [shopName, setShopName] = React.useState("")
  const [shopAddress, setShopAddress] = React.useState("")

  const handleEmail = (text) => {
    setEmail(text)
  }

  const handlePassword = (text) => {
    setPassword(text)
  }

  const handleType = (item) => {
    setType(item.value)
  }

  const handleName = (text) => {
    setName(text)
  }

  const handleShopName = (text) => {
    setShopName(text)
  }

  const handleShopAddress = (text) => {
    setShopAddress(text)
  }

  const add = (email, pass, id, type) => {
    axios
      .post("http://10.0.2.2:5000/auth/register", {
        email: email,
        password: pass,
        id: id,
        type: type,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          AsyncStorage.setItem("key", id).then(() => {
            if (type === "R") {
              navigation.replace("Retailer")
            } else {
              navigation.replace("Wholesaler")
            }
          })
        } else {
          alert("Something went wrong.")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const register = async (email, pass, type, name, shopName, shopAddress) => {
    if (type === "R") {
      await axios
        .post("http://10.0.2.2:5000/add/add_retailer", {
          email: email,
          name: name,
          shopName: shopName,
          shopAddress: shopAddress,
        })
        .then((response) => {
          if (response.data.status == "ok") {
            add(email, pass, response.data.id, type)
          } else {
            alert("Something went wrong.")
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      await axios
        .post("http://10.0.2.2:5000/add/add_wholesaler", {
          email: email,
          name: name,
          shopName: shopName,
          shopAddress: shopAddress,
        })
        .then((response) => {
          if (response.data.status == "ok") {
            add(email, pass, response.data.id, type)
          } else {
            alert("Something went wrong.")
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={handleEmail}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={handlePassword}
          />
          <DropDownPicker
            items={[
              {
                label: "Retailer",
                value: "R",
              },
              {
                label: "Wholesaler",
                value: "W",
              },
            ]}
            defaultValue={"R"}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={handleType}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Full Name"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={handleName}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Shop Name"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={handleShopName}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Shop Address"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={handleShopAddress}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              register(email, password, type, name, shopName, shopAddress)
            }
          >
            <Text style={styles.submitButtonText}> Register </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.link}
        >
          <Text style={styles.linkText}>
            Already have an account!, Login Here
          </Text>
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
