import React, {Component} from "react";
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
} from "react-native";

import styles from "./Styles.js";

class QuestionText extends Component {
    static navigationOptions = {
        title: "Question",
    };

    state = {
        text: "",
    };

    setName = value => {
        this.setState({text: value});
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

    render() {
        const {navigation} = this.props;
        const itemId = navigation.getParam("id", "NO-ID");
        const question = navigation.getParam("name", "no question");

        return (
            <View>
                <Text style={styles.button}>{JSON.stringify(question)}</Text>
                <TextInput
                    style={{height: 200, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setName(text)}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.saveAnswer(
                            itemId,
                            question,
                            "Text",
                            this.state.text,
                        )
                    }>
                    <Text>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default QuestionText;
