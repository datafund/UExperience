import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider, connect } from 'react-redux';

import Home from "./src/Home.js";
import List from "./src/List.js";
import Questions from "./src/Questions.js";
import QuestionBinary from "./src/QuestionBinary.js";
import QuestionText from "./src/QuestionText.js";

import { createStore, combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './src/reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistantReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistantReducer);
export const persistor = persistStore(store);

const AppNavigator = createStackNavigator(
  {
    Index: Home,
    NewBeep: Questions,
    Beeps: List,
    QuestionBinary: QuestionBinary,
    QuestionText: QuestionText,
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
    return <Provider store={store}><AppContainer /></Provider>;
  }
}
