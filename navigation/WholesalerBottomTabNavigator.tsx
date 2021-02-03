import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"
import { Text } from "react-native"

import Colors from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import AddProductScreen from "../screens/AddProductScreen"
import ProductScreen from "../screens/ProductScreen"
import SettingsScreen from "../screens/SettingsScreen"
import WholesalerScreen from "../screens/WholesalerScreen"
import {
  WholesalerBottomTabParamList,
  WholesalerParamList,
  SettingsParamList,
} from "../types"

const WholesalerBottomTab = createBottomTabNavigator<WholesalerBottomTabParamList>()

export default function WholesalerNavigator() {
  const colorScheme = useColorScheme()

  return (
    <WholesalerBottomTab.Navigator
      initialRouteName="Shop"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <WholesalerBottomTab.Screen
        name="Shop"
        component={ShopNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <WholesalerBottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </WholesalerBottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ShopStack = createStackNavigator<WholesalerParamList>()

function ShopNavigator() {
  const navigation = useNavigation()
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="WholesalerScreen"
        component={WholesalerScreen}
        options={{
          headerTitle: "Shop",
          headerRight: () => (
            <Text
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              }
            >
              Logout
            </Text>
          ),
        }}
      />
      <ShopStack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          headerTitle: "New Product",
          headerRight: () => (
            <Text
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              }
            >
              Logout
            </Text>
          ),
        }}
      />
      <ShopStack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerTitle: "Product",
          headerRight: () => (
            <Text
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              }
            >
              Logout
            </Text>
          ),
        }}
      />
    </ShopStack.Navigator>
  )
}

const SettingsStack = createStackNavigator<SettingsParamList>()

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: "Settings Title" }}
      />
    </SettingsStack.Navigator>
  )
}
