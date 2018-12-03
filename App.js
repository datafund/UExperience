import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./src/Home.js";
import List from "./src/List.js";
import Questions from "./src/Questions.js";
import QuestionBinary from "./src/QuestionBinary.js";
import QuestionText from "./src/QuestionText.js";
import QuestionTags from "./src/QuestionTags.js";
import QuestionTagsNoAdd from "./src/QuestionTagsNoAdd.js";
import QuestionMultipleChoice from "./src/QuestionMultipleChoice.js";
import QuestionSlider from "./src/QuestionSlider.js"
import AddResearch from "./src/AddResearch.js"
import AddQuestion from "./src/AddQuestion.js"
import RemoveQuestion from "./src/RemoveQuestion.js"

const AppNavigator = createStackNavigator(
  {
    Index: Home,
    NewBeep: Questions,
    Beeps: List,
    QuestionBinary: QuestionBinary,
    QuestionText: QuestionText,
    QuestionTags: QuestionTags,
    QuestionTagsNoAdd: QuestionTagsNoAdd,
    QuestionMultipleChoice: QuestionMultipleChoice,
    QuestionSlider: QuestionSlider,
    AddResearch: AddResearch,
    AddQuestion: AddQuestion,
    RemoveQuestion: RemoveQuestion,
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
