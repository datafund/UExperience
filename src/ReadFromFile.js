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

class ReadFromFile extends Component {
    static navigationOptions = {
        title: "Reading From File",
    };

    state = {
        beeps: [],
        fileContent: "You did not read the file yet",
        password: "",
    };

    readFromFile = async () => {
        const path = RNFS.DocumentDirectoryPath + "/test.txt";
        RNFS.readdir(RNFS.DocumentDirectoryPath).then(result =>
            this.setState({files: result}),
        );
        try {
            var result = await RNFS.readFile(path, "utf8");
            this.setState({fileContent: result});
        } catch (error) {
            this.setState({fileContent: "This file does not exist"});
        } finally {
            if (this.state.password) {
                try {
                    result = CryptoJS.AES.decrypt(
                        result,
                        this.state.password,
                    ).toString(CryptoJS.enc.Utf8);
                    this.setState({fileContent: result});
                } catch (error) {
                    this.setState({fileContent: "Wrong password"});
                }
            }
        }
    };

    render() {
        return (
            <View>
                <Text>
                    Če je bila datoteka zaščitena z enkripcijo, prosim da tukaj
                    napišete svoje geslo:
                </Text>
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({password: text})}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.readFromFile()}>
                    <Text>Read File</Text>
                </TouchableHighlight>
                <Text>{this.state.success}</Text>
                <Text>{JSON.stringify(this.state.fileContent)}</Text>
            </View>
        );
    }
}

export default ReadFromFile;
