import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    TextInput,
} from "react-native";

import styles from "./Styles.js";
import {setDataToStorage} from "./functions/data.js";

class LoadQuestionsFromNet extends Component {
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
        await setDataToStorage("questions", this.state.password, questions);
        this.setState({success: "No problems"});
    };

    render() {
        return (
            <View style={styles.background}>
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
