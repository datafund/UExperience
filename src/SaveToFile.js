import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    TextInput,
} from "react-native";

import styles from "./Styles.js";

const RNFS = require("react-native-fs");
const CryptoJS = require("crypto-js");

class SaveToFile extends Component {
    componentDidMount = async () => {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        try {
            let beeps = await AsyncStorage.getItem("beeps");
            this.parseJSONString(beeps);
        } catch (err) {
            this.setState({beeps: []});
        }
    };

    parseJSONString = value => {
        if (!(this.state.password === "")) {
            value = CryptoJS.AES.decrypt(value, this.state.password).toString(
                CryptoJS.enc.Utf8,
            );
        }
        const questions = value ? JSON.parse(value) : [];
        this.setState({beeps: questions});
    };

    state = {
        beeps: [],
        password: "",
        filePassowrd: "",
    };

    saveAnswerToFile = async beeps => {
        const path = RNFS.DocumentDirectoryPath + "/test.txt";
        let finalFileContent = "";
        finalFileContent +=
            "Time\tQuestionId\tQuestion\tTypeOfQuestion\tAnswer\t\n";
        for (beepIndex in this.state.beeps) {
            let beep = this.state.beeps[beepIndex];
            finalFileContent += beep.time + "\t";
            if (!(beep.questions === "null")) {
                for (questionIndex in beep.questions) {
                    let question = beep.questions[questionIndex];
                    if (!(question === null)) {
                        finalFileContent += question.id + "\t";
                        finalFileContent += question.question + "\t";
                        finalFileContent += question.type + "\t";
                        finalFileContent += question.answer + "\t";
                        finalFileContent += "\n";
                    }
                }
            }
        }
        if (this.state.filePassword) {
            finalFileContent = CryptoJS.AES.encrypt(
                finalFileContent,
                this.state.filePassword,
            ).toString();
        }
        let worked = await RNFS.writeFile(path, finalFileContent, "utf8");
    };

    render() {
        return (
            <View style={styles.background}>
                <Text>
                    Če želite zaščititi svojo datoteko z enkripcijo, prosim da
                    spodaj napišete geslo
                </Text>
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({filePassword: text})}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.saveAnswerToFile(this.state.beeps)}>
                    <Text>Save File</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default SaveToFile;
