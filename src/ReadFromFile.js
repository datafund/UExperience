import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    TextInput,
    ScrollView,
} from "react-native";

import styles from "./Styles.js";

const RNFS = require("react-native-fs");
const CryptoJS = require("crypto-js");

class ReadFromFile extends Component {
    state = {
        beeps: [],
        fileContent: "You did not read the file yet",
        password: "",
    };

    readFromFile = async () => {
        const path = RNFS.DocumentDirectoryPath + "/test.txt";
        let files = await RNFS.readdir(RNFS.DocumentDirectoryPath);
        this.setState({files: files});
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
            <View style={styles.background}>
                <ScrollView>
                    <Text>
                        Če je bila datoteka zaščitena z enkripcijo, prosim da
                        tukaj napišete svoje geslo:
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "black",
                            borderWidth: 1,
                        }}
                        onChangeText={text => this.setState({password: text})}
                    />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.readFromFile()}>
                        <Text>Read File</Text>
                    </TouchableHighlight>
                    <Text>{this.state.success}</Text>
                    <Text>{JSON.stringify(this.state.fileContent)}</Text>
                </ScrollView>
            </View>
        );
    }
}

export default ReadFromFile;
