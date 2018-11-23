import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/Home.js";
import List from "./src/List.js";
import Questions from "./src/Questions.js";

const AppNavigator = createStackNavigator(
  {
    Index: Home,
    NewBeep: Questions,
    Beeps: List,
  },
  {
    initialRouteName: "Index",
      defaultNavigationOptions: {
          headerStyle: {
              backgroundColor: 'darkgray',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
      },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
