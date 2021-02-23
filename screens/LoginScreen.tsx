import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import * as React from "react"
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native"

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleEmail = (text) => {
    setEmail(text)
  }

  const handlePassword = (text) => {
    setPassword(text)
  }

  const login = async (email, pass) => {
    await axios
      .get("http://10.0.2.2:5000/auth/login", {
        params: { email: email, password: pass },
      })
      .then((response) => {
        if (response.data.length) {
          AsyncStorage.setItem("key", response.data[0].id).then(() => {
            if (response.data[0].type === "R") {
              AsyncStorage.setItem("type", "R").then(() => {
                navigation.replace("Retailer")
              })
            } else {
              AsyncStorage.setItem("type", "W").then(() => {
                navigation.replace("Wholesaler")
              })
            }
          })
        } else {
          alert("Invalid Email and Password")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => login(email, password)}
        >
          <Text style={styles.submitButtonText}> Login </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("RegisterScreen")}
        style={styles.link}
      >
        <Text style={styles.linkText}>
          If you don't have account, Register Here
        </Text>
      </TouchableOpacity>
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
