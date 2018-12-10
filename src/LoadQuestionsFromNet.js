import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    TextInput,
} from "react-native";

import styles from "./Styles.js";

const CryptoJS = require("crypto-js");

class LoadQuestionsFromNet extends Component {
    static navigationOptions = {
        title: "Get Questions",
    };

    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
    }

    state = {
        beeps: [],
        success: "You did not try it yet",
        url: "",
        password: "",
    };

    getQuestions = async url => {
        try {
            var questions = await fetch(url);
        } catch (err) {
            this.setState({
                success:
                    "Something went wrong. Is the internet connection working?",
            });
            return;
        }
        questions = questions._bodyInit;
        try {
            questions = JSON.parse(questions);
        } catch {
            this.setState({
                success: "Something went wrong. Is you put in the right url?",
            });
            return;
        }
        questions = questions.questions;
        questions = JSON.stringify(questions);
        if (!(this.state.password === "")) {
            questions = CryptoJS.AES.encrypt(
                questions,
                this.state.password,
            ).toString();
        }
        AsyncStorage.setItem("questions", questions);
        this.setState({success: "No problems"});
    };

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({url: text})}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.getQuestions(this.state.url)}>
                    <Text>Get Questions</Text>
                </TouchableHighlight>
                <Text>{JSON.stringify(this.state.success)}</Text>
            </View>
        );
    }
}

export default LoadQuestionsFromNet;
