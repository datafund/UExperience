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
    componentDidMount = async () => {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        try {
            var beeps = await AsyncStorage.getItem("beeps");
        } catch (err) {
            var beeps = [];
        }
        if (!(this.state.password === "")) {
            beeps = CryptoJS.AES.decrypt(beeps, this.state.password).toString(
                CryptoJS.enc.Utf8,
            );
        }
        this.setState({beeps: beeps ? JSON.parse(beeps) : [], loading: false});
    };

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
                <View style={styles.background}>
                    <Text>Please wait a bit</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.background}>
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
