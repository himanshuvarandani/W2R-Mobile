import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"

import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import { LoginParamList } from "../types"

const LoginStack = createStackNavigator<LoginParamList>()

export default function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
      <LoginStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
    </LoginStack.Navigator>
  )
}
