import React, {Component} from "react";
import {Text, View, TouchableHighlight, AsyncStorage} from "react-native";
import moment from "moment";

import styles from "./Styles.js";
import {getDataFromStorage, setDataToStorage} from "./functions/data.js";

class RemoveQuestion extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({password: password});
        let value = await getDataFromStorage("questions", password);
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

    saveQuestions = async (questions, password) => {
        await setDataToStorage("questions", password, questions);
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.background}>
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
                    onPress={() =>
                        this.saveQuestions(
                            this.state.questions,
                            this.state.password,
                        )
                    }>
                    <Text>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default RemoveQuestion;
