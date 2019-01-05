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
import {getDataFromStorage, setDataToStorage} from "./functions/data.js";

class Questions extends Component {
    componentDidMount = async () => {
        this.subs = [
            this.props.navigation.addListener("didFocus", () => {
                this.componentDidFocus();
            }),
        ];
        const password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });

        let questions = await getDataFromStorage("questions", password);

        questions = questions ? JSON.parse(questions) : [];
        this.setState({questions: questions});

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
    };

    componentDidFocus = async () => {
        let newAnswer = await getDataFromStorage("answer", this.state.password);
        if (!(newAnswer === null || newAnswer === [])) {
            newAnswer = JSON.parse(newAnswer);
            this.state.answers.push(newAnswer);
            await setDataToStorage(
                "answer",
                this.state.password,
                JSON.stringify([]),
            );
        }
    };

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
        this.saveBeep();
    }

    state = {
        answers: [],
        time: "",
        questions: [],
        password: "",
    };

    saveBeep = async () => {
        if (!(this.state.answers.length === 0)) {
            let newBeep = {
                time: this.state.time,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                questions: this.state.answers.filter(x => x),
            };
            let beeps = await getDataFromStorage("beeps", this.state.password);
            let b = beeps ? JSON.parse(beeps) : [];
            b.push(newBeep);
            await setDataToStorage("beeps", this.state.password, b);
        }
        await setDataToStorage("answers", "", "");
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
            <View style={styles.background}>
                <ScrollView>
                    {this.state.questions.map((item, index) =>
                        this.createQuestionButton(item, index),
                    )}
                </ScrollView>
            </View>
        );
    }
}

export default Questions;
