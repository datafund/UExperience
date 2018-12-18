import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    ScrollView,
} from "react-native";
import {
    QuestionBinary,
    QuestionMultipleChoice,
    QuestionSlider,
    QuestionTags,
    QuestionText,
    QuestionLocation,
} from "./QuestionTypes.js";
import ImagePicker from "react-native-image-picker";

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
        AsyncStorage.setItem("answer", JSON.stringify(newAnswer));
        this.props.navigation.goBack();
    };

    state = {
        question: "",
        id: "",
        possibleAnswers: [],
    };

    componentDidMount() {
        this.setState({id: this.props.navigation.getParam("id", "NO-ID")});
        this.setState({
            question: this.props.navigation.getParam("name", "no question"),
        });
        this.setState({type: this.props.navigation.getParam("type", null)});
        this.setState({
            password: this.props.navigation.getParam("password", ""),
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
    }

    render() {
        return (
            <View>
                <ScrollView>
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
                            password={this.state.password}
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
                    {this.state.type === "Location" ? (
                        <QuestionLocation
                            question={this.state.question}
                            id={this.state.id}
                            saveAnswer={this.saveAnswer}
                            type={this.state.type}
                        />
                    ) : null}
                    {this.state.type === "Camera" ? (
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() =>
                                ImagePicker.launchCamera(options, response => {
                                    const source = response.uri;
                                    this.saveAnswer(
                                        this.state.id,
                                        this.state.question,
                                        this.state.type,
                                        source,
                                    );
                                })
                            }>
                            <Text>{this.state.question}</Text>
                        </TouchableHighlight>
                    ) : null}
                </ScrollView>
            </View>
        );
    }
}

export default Question;
