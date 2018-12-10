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
        this.setState({success: "No problems"});
        let questions = await fetch(url);
        questions = questions._bodyInit;
        questions = JSON.parse(questions);
        questions = questions.questions;
        questions = JSON.stringify(questions);
        if (!(this.state.password === "")) {
            questions = CryptoJS.AES.encrypt(
                questions,
                this.state.password,
            ).toString();
        }
        AsyncStorage.setItem("questions", questions);
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
