import React, {Component} from "react";
import {Text, View, TouchableHighlight, AsyncStorage} from "react-native";
import moment from "moment";

import styles from "./Styles.js";

const CryptoJS = require("crypto-js");

class RemoveQuestion extends Component {
    static navigationOptions = {
        title: "Odstrani Vprašanje",
    };

    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        this.parseJSONString();
    }

    parseJSONString = async () => {
        try {
            value = await AsyncStorage.getItem("questions");
            if (!(this.state.password === "")) {
                value = CryptoJS.AES.decrypt(
                    value,
                    this.state.password,
                ).toString(CryptoJS.enc.Utf8);
            }
        } catch {
            value = "";
        }
        const questions = value ? JSON.parse(value) : [];
        this.setState({questions: questions});
    };

    state = {
        questions: [],
    };

    changeChosenStatus = index => {
        let oldState = this.state.questions;
        if (this.state.questions[index].current === 1) {
            oldState[index].current = 0;
        } else {
            oldState[index].current = 1;
        }
        this.setState({tags: oldState});
    };

    saveQuestions = questions => {
        questions = JSON.stringify(questions);
        if (!(this.state.password === "")) {
            questions = CryptoJS.AES.encrypt(
                questions,
                this.state.password,
            ).toString();
        }
        AsyncStorage.setItem("questions", questions);
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View>
                {this.state.questions.map((item, index) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => this.changeChosenStatus(index)}>
                        <Text
                            style={
                                item.current === 1
                                    ? styles.container2
                                    : styles.container
                            }>
                            {item.name}
                        </Text>
                    </TouchableHighlight>
                ))}

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.saveQuestions(this.state.questions)}>
                    <Text>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default RemoveQuestion;
