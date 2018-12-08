import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    TextInput,
} from "react-native";

import styles from "./Styles.js";

class LoadQuestionsFromNet extends Component {
    static navigationOptions = {
        title: "Get Questions",
    };

    state = {
        beeps: [],
        success: "You did not try it yet",
        url: "",
    };

    getQuestions = async url => {
        this.setState({success: "No problems"});
        let questions = await fetch(url);
        questions = questions._bodyInit;
        questions = JSON.parse(questions);
        questions = questions.questions;
        AsyncStorage.setItem("questions", JSON.stringify(questions));
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
