import React from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";

import Home from "./src/Home.js";
import List from "./src/List.js";
import Questions from "./src/Questions.js";
import Question from "./src/Question.js";
import AddResearch from "./src/AddResearch.js";
import AddQuestion from "./src/AddQuestion.js";
import RemoveQuestion from "./src/RemoveQuestion.js";
import SaveToFile from "./src/SaveToFile.js";
import ReadFromFile from "./src/ReadFromFile.js";
import DeleteFile from "./src/DeleteFile.js";
import LoadQuestionsFromNet from "./src/LoadQuestionsFromNet.js";
import LogIn from "./src/LogIn.js";
import Notification from "./src/CreateNotifications.js";
import Premissions from "./src/Premissions.js";

const AppNavigator = createStackNavigator(
    {
        Index: Home,
        NewBeep: Questions,
        Beeps: List,
        Binary: Question,
        Text: Question,
        Tags: Question,
        TagsNoAdd: Question,
        Location: Question,
        MultipleChoice: Question,
        Slider: Question,
        AddResearch: AddResearch,
        AddQuestion: AddQuestion,
        RemoveQuestion: RemoveQuestion,
        SaveToFile: SaveToFile,
        ReadFromFile: ReadFromFile,
        DeleteFile: DeleteFile,
        LoadQuestionsFromNet: LoadQuestionsFromNet,
        LogIn: LogIn,
        Notification: Notification,
        Premissions: Premissions,
    },
    {
        initialRouteName: "LogIn",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "darkgray",
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        },
    },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
