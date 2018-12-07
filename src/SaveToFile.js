import React, { Component } from "react";
import {View, TouchableHighlight, Text, AsyncStorage, TextInput} from "react-native";

import styles from "./Styles.js";

const RNFS = require('react-native-fs');
const CryptoJS = require("crypto-js");

class SaveToFile extends Component {

    componentWillMount(){
        AsyncStorage.getItem("beeps").then((value) => this.parseJSONString(value));
    };

    parseJSONString = (value) => {
        const questions = value ? JSON.parse(value) : [];
        this.setState({beeps: questions});
    };
    
    static navigationOptions = {
        title: "Saving to File",
    };

    state = {
      beeps: [],
      success: "You did not try it yet",
      password: "",
    };

    saveAnswerToFile = (beeps) => {
        const path = RNFS.DocumentDirectoryPath + '/test.txt';
        let finalFileContent = "";
        finalFileContent += "Time\tQuestionId\tQuestion\tTypeOfQuestion\tAnswer\t\n"
        for (beepIndex in this.state.beeps) {
            let beep = this.state.beeps[beepIndex];
            finalFileContent += beep.time + "\t";
            if (!(beep.questions === "null")) {
                for (questionIndex in beep.questions) {
                    let question = beep.questions[questionIndex];
                    finalFileContent += question.id + "\t";
                    finalFileContent += question.question + "\t";
                    finalFileContent += question.type + "\t";
                    finalFileContent += question.answer + "\t";
                    finalFileContent += "\n";
                };
            };
        };
        if (this.state.password) {
            finalFileContent = CryptoJS.AES.encrypt(finalFileContent, this.state.password).toString()
        };
        RNFS.writeFile(path, finalFileContent, 'utf8').then((success) => this.setState({success: "It worked"})).catch((err) => this.setState({success: "It did not work"}))
    };

    render() {
        
	return (
	    <View>
        <Text>Če želite zaščititi svojo datoteko z enkripcijo, prosim da spodaj napišete geslo</Text>
        <TextInput
            style={{height: 50, borderColor: 'black', borderWidth: 1,}}
            onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight style={styles.button} 
            onPress = {() => this.saveAnswerToFile(this.state.beeps)}
        >
        <Text>
            Save File
        </Text>
        </TouchableHighlight>
        <Text>{this.state.success}</Text>
	    </View>
	);
    }
}

export default SaveToFile;
