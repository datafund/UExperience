import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    ScrollView,
} from "react-native";

import styles from "./Styles.js";

const CryptoJS = require("crypto-js");

class List extends Component {
    static navigationOptions = {
        title: "List of Beeps",
    };

    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        AsyncStorage.getItem("beeps")
            .then(value => {
                if (!(this.state.password === "")) {
                    value = CryptoJS.AES.decrypt(
                        value,
                        this.state.password,
                    ).toString(CryptoJS.enc.Utf8);
                }
                this.setState({
                    beeps: value ? JSON.parse(value) : [],
                    loading: false,
                });
            })
            .catch(err =>
                this.setState({
                    beeps: [],
                    loading: false,
                }),
            );
    }

    state = {
        beeps: "",
        loading: true,
    };

    alertItemName = item => {
        text = "";
        const questions = item.questions;
        for (id in questions) {
            if (!(questions[id] === null)) {
                text += questions[id].question;
                text += "\n";
                text += JSON.stringify(questions[id].answer);
                text += "\n---\n";
            }
        }
        alert(text);
    };

    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>Please wait a bit</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <ScrollView>
                        {this.state.beeps.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.container}
                                onPress={() => this.alertItemName(item)}>
                                <Text>{item.time}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            );
        }
    }
}

export default List;
