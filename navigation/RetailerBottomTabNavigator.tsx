import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"
import { Text } from "react-native"

import Colors from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import ProductScreen from "../screens/retailers/ProductScreen"
import RetailerScreen from "../screens/retailers/RetailerScreen"
import SettingsScreen from "../screens/SettingsScreen"
import ShopScreen from "../screens/retailers/ShopScreen"
import {
  RetailerBottomTabParamList,
  RetailerParamList,
  SettingsParamList,
} from "../types"

const RetailerBottomTab = createBottomTabNavigator<RetailerBottomTabParamList>()

export default function RetailerNavigator() {
  const colorScheme = useColorScheme()

  return (
    <RetailerBottomTab.Navigator
      initialRouteName="Shops"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <RetailerBottomTab.Screen
        name="Shops"
        component={ShopsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <RetailerBottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </RetailerBottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ShopsStack = createStackNavigator<RetailerParamList>()

function ShopsNavigator() {
  const navigation = useNavigation()
  return (
    <ShopsStack.Navigator>
      <ShopsStack.Screen
        name="RetailerScreen"
        component={RetailerScreen}
        options={{
          headerTitle: "Shops",
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
      <ShopsStack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{ headerTitle: "Shop" }}
      />
      <ShopsStack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerTitle: "Product" }}
      />
    </ShopsStack.Navigator>
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
