import React, {Component} from "react";
import {Text, View, TouchableHighlight, AsyncStorage} from "react-native";
import {
    QuestionBinary,
    QuestionMultipleChoice,
    QuestionSlider,
    QuestionTags,
    QuestionText,
} from "./QuestionTypes.js";

import styles from "./Styles.js";

class Question extends Component {
    static navigationOptions = {
        title: "Question",
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

    state = {
        question: "",
        id: "",
        possibleAnswers: [],
    };

    componentWillMount() {
        this.setState({id: this.props.navigation.getParam("id", "NO-ID")});
        this.setState({
            question: this.props.navigation.getParam("name", "no question"),
        });
        this.setState({type: this.props.navigation.getParam("type", null)});
        this.setState({
            possibleAnswers: this.props.navigation.getParam(
                "possibleAnswers",
                "",
            ),
        });
        AsyncStorage.getItem("currenttime").then(value =>
            this.setState({currenttime: value}),
        );
    }

    render() {
        return (
            <View>
                <Text style={styles.button}>
                    {JSON.stringify(this.state.question)}
                </Text>

                {this.state.type === "Binary" ? (
                    <QuestionBinary
                        question={this.state.question}
                        id={this.state.id}
                        saveAnswer={this.saveAnswer}
                        possibleAnswers={this.state.possibleAnswers}
                        type={this.state.type}
                    />
                ) : null}
                {this.state.type === "MultipleChoice" ? (
                    <QuestionMultipleChoice
                        question={this.state.question}
                        id={this.state.id}
                        saveAnswer={this.saveAnswer}
                        possibleAnswers={this.state.possibleAnswers}
                        type={this.state.type}
                    />
                ) : null}
                {this.state.type === "Slider" ? (
                    <QuestionSlider
                        question={this.state.question}
                        id={this.state.id}
                        saveAnswer={this.saveAnswer}
                        possibleAnswers={this.state.possibleAnswers}
                        type={this.state.type}
                    />
                ) : null}
                {this.state.type === "Tags" ||
                this.state.type === "TagsNoAdd" ? (
                    <QuestionTags
                        question={this.state.question}
                        id={this.state.id}
                        saveAnswer={this.saveAnswer}
                        possibleAnswers={this.state.possibleAnswers}
                        type={this.state.type}
                    />
                ) : null}
                {this.state.type === "Text" ? (
                    <QuestionText
                        question={this.state.question}
                        id={this.state.id}
                        saveAnswer={this.saveAnswer}
                        possibleAnswers={this.state.possibleAnswers}
                        type={this.state.type}
                    />
                ) : null}
            </View>
        );
    }
}

export default Question;
