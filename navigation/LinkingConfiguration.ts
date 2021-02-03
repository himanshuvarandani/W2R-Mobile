import * as Linking from "expo-linking"

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Login: {
        screens: {
          LoginScreen: "one",
          RegisterScreen: "two",
        },
      },
      Retailer: {
        screens: {
          Shops: {
            screens: {
              RetailerScreen: "three",
              ShopsScreen: "four",
              ProductScreen: "five",
            },
          },
          Settings: {
            screens: {
              SettingsScreen: "six",
            },
          },
        },
      },
      Wholesaler: {
        screens: {
          Shop: {
            screens: {
              WholesalerScreen: "seven",
              AddProductScreen: "eight",
              ProductScreen: "nine",
            },
          },
          Settings: {
            screens: {
              SettingsScreen: "ten",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
}
