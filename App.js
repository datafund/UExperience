import React, {Component} from "react";
import {Image, StyleSheet, View, Header} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";

import Home from "./src/Home.js";
import List from "./src/List.js";
import Questions from "./src/Questions.js";
import Question from "./src/Question.js";
import Settings from "./src/Settings.js";
import LogIn from "./src/LogIn.js";
import Splash from "./src/Splash.js";
import BeepRepresentation from "./src/BeepRepresentation.js";
import ResearchChoice from "./src/ResearchChoice.js";
import ResearchModify from "./src/ResearchModify.js";
import ResearchDescription from "./src/ResearchDescription.js";
import PersonalInfo from "./src/PersonalInfo.js";
import LoadingNewUsers from "./src/LoadingNewUsers.js";

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
        LogIn: LogIn,
        Splash: Splash,
        BeepRepresentation: BeepRepresentation,
        ResearchChoice: ResearchChoice,
        ResearchModify: ResearchModify,
        ResearchDescription: ResearchDescription,
        PersonalInfo: PersonalInfo,
        LoadingNewUsers: LoadingNewUsers,
    },
    {
        initialRouteName: "Splash",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#4e4d4d",
                color: "white",
                shadowColor: "transparent",
                elevation: 0,
            },
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
