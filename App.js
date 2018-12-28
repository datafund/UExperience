import React, {Component} from "react";
import {Image, StyleSheet, View, Header} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";

import Home from "./src/Home.js";
import List from "./src/List.js";
import Questions from "./src/Questions.js";
import Question from "./src/Question.js";
import Settings from "./src/Settings.js";
import AddQuestion from "./src/AddQuestion.js";
import RemoveQuestion from "./src/RemoveQuestion.js";
import LoadQuestionsFromNet from "./src/LoadQuestionsFromNet.js";
import LogIn from "./src/LogIn.js";
import Notification from "./src/CreateNotifications.js";
import Splash from "./src/Splash.js";
import BeepRepresentation from "./src/BeepRepresentation.js";
import File from "./src/File.js";

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
        Settings: Settings,
        AddQuestion: AddQuestion,
        RemoveQuestion: RemoveQuestion,
        File: File,
        LoadQuestionsFromNet: LoadQuestionsFromNet,
        LogIn: LogIn,
        Notification: Notification,
        Splash: Splash,
        BeepRepresentation: BeepRepresentation,
    },
    {
        initialRouteName: "Splash",
        defaultNavigationOptions: {
            headerStyle: {backgroundColor: "black", color: "white"},
            headerTintColor: "white",
            headerBackground: (
                <Image
                    style={{
                        position: "absolute",
                        top: 0,
                        botton: 0,
                        alignSelf: "center",
                    }}
                    source={require("./src/ui/header.png")}
                />
            ),
        },
    },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
