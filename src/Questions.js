import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    ScrollView,
} from "react-native";
import moment from "moment";

import styles from "./Styles.js";

const CryptoJS = require("crypto-js");

class Questions extends Component {
    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener("didFocus", () => {
                this.componentDidFocus();
            }),
        ];
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        AsyncStorage.getItem("questions")
            .then(value => this.parseJSONString(value))
            .catch(err => this.setState({questions: []}));
        this.setState({
            time: moment()
                .utcOffset("+02")
                .format("YYYY-MM-DD-HH-mm-ss"),
        });
        navigator.geolocation.getCurrentPosition(
            position =>
                this.setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                }),
            error =>
                this.setState({
                    longitude: "None",
                    latitude: "None",
                }),
            {
                maximumAge: 60000,
                distanceFilter: 0,
            },
        );
    }
    componentDidFocus = () => {
        AsyncStorage.getItem("answer").then(newAnswer => {
            if (!(newAnswer === null || newAnswer === "")) {
                newAnswer = JSON.parse(newAnswer);
                allAnswers = this.state.answers;
                allAnswers[newAnswer.id] = newAnswer;
                this.setState({answers: allAnswers});
                this.setState({newAnswer: newAnswer});
                AsyncStorage.setItem("answer", "");
            }
        });
    };
    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
        this.saveBeep();
    }

    parseJSONString = value => {
        if (!(this.state.password === "")) {
            value = CryptoJS.AES.decrypt(value, this.state.password).toString(
                CryptoJS.enc.Utf8,
            );
        }
        const questions = value ? JSON.parse(value) : [];
        this.setState({questions: questions});
    };

    state = {
        answers: [],
        time: "",
        questions: [],
        newAnswer: "",
    };

    saveBeep = async () => {
        if (!(this.state.answers.length === 0)) {
            let newBeep = {
                time: this.state.time,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                questions: this.state.answers,
            };
            try {
                beeps = await AsyncStorage.getItem("beeps");
                if (!(this.state.password === "")) {
                    beeps = CryptoJS.AES.decrypt(
                        beeps,
                        this.state.password,
                    ).toString(CryptoJS.enc.Utf8);
                }
            } catch (err) {
                beeps = "";
            }
            let b = beeps ? JSON.parse(beeps) : [];
            b.push(newBeep);
            b = JSON.stringify(b);
            if (!(this.state.password === "")) {
                b = CryptoJS.AES.encrypt(b, this.state.password).toString();
            }
            AsyncStorage.setItem("beeps", b);
        }
        AsyncStorage.setItem("answers", "");
    };

    createQuestionButton = (item, index) => {
        if (item.current === 1) {
            item["password"] = this.state.password;
            return (
                <TouchableHighlight
                    key={item.id}
                    onPress={() =>
                        this.props.navigation.navigate(item.type, item)
                    }>
                    <View>
                        <Text style={styles.button}>{item.name}</Text>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.questions.map((item, index) =>
                        this.createQuestionButton(item, index),
                    )}

                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.props.navigation.goBack()}>
                        <Text>Save Beep</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}

export default Questions;
