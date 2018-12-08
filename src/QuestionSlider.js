import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    Slider,
} from "react-native";

import styles from "./Styles.js";

class QuestionSlider extends Component {
    static navigationOptions = {
        title: "Question",
    };

    state = {
        possibleAnswers: [],
        question: "",
        itemId: "",
        currentAnswer: 10,
    };

    saveAnswer = (id, question, type, value) => {
        let newAnswer = {
            id: id,
            question: question,
            type: type,
            answer: value,
        };
        AsyncStorage.getItem("answers").then(answers => {
            const a = answers ? JSON.parse(answers) : [];
            aNew = [];
            for (x in a) {
                if (!(a[x].id == id)) {
                    aNew.push(a[x]);
                }
            }
            aNew.push(newAnswer);
            AsyncStorage.setItem("answers", JSON.stringify(aNew));
        });
        this.props.navigation.goBack();
    };

    componentDidMount = () => {
        this.setState({itemId: this.props.navigation.getParam("id", "NO-ID")});
        this.setState({
            question: this.props.navigation.getParam("name", "no-question"),
        });
        this.setState({
            possibleAnswers: this.props.navigation.getParam(
                "possibleAnswers",
                "",
            ),
        });

        AsyncStorage.getItem("currenttime").then(value =>
            this.setState({currenttime: value}),
        );
    };

    render() {
        return (
            <View>
                <Text style={styles.button}>
                    {JSON.stringify(this.state.question)}
                </Text>

                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    value={10}
                    onValueChange={val => this.setState({currentAnswer: val})}
                />
                <Text>Current answer is : {this.state.currentAnswer}/100</Text>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.saveAnswer(
                            this.state.itemId,
                            this.state.question,
                            "Slider",
                            this.state.currentAnswer,
                        )
                    }>
                    <Text>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default QuestionSlider;
