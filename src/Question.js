import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    ScrollView,
    Image,
} from "react-native";
import {
    QuestionBinary,
    QuestionMultipleChoice,
    QuestionSlider,
    QuestionTags,
    QuestionText,
    QuestionLocation,
} from "./QuestionTypes.js";

import styles from "./Styles.js";
import {setDataToStorage} from "./functions/data.js";

class Question extends Component {
    saveAnswer = async (id, question, type, value) => {
        let newAnswer = {
            id: id,
            question: question,
            type: type,
            answer: value,
        };
        await setDataToStorage("answer", this.state.password, newAnswer);
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
            question: this.props.navigation.getParam("question", "no question"),
        });
        this.setState({type: this.props.navigation.getParam("type", null)});
        const password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });

        this.setState({
            possibleAnswers: this.props.navigation.getParam(
                "possibleAnswers",
                "",
            ),
        });
    }

    getFooter = () => {
        return (
            <View
                style={{
                    height: 50,
                    backgroundColor: "black",
                }}>
                <TouchableHighlight
                    style={{
                        position: "absolute",
                        alignSelf: "center",
                        top: 0,
                    }}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Image
                        source={require("./ui/save.png")}
                        style={{height: 40, width: 40}}
                    />
                </TouchableHighlight>
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.background}>
                    <ScrollView>
                        <Text style={styles.question}>
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
                    </ScrollView>
                    {this.getFooter()}
                </View>
            </View>
        );
    }
}

export default Question;
