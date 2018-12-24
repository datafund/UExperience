import React, {Component} from "react";
import {View, TouchableHighlight, Text, AsyncStorage} from "react-native";

import styles from "./Styles.js";

const RNFS = require("react-native-fs");

class ReadFromFile extends Component {
    deleteFile = async () => {
        const path = RNFS.DocumentDirectoryPath + "/test.txt";
        let result = await RNFS.exists(path);
        if (result) {
            RNFS.unlink(path);
        }
    };

    render() {
        return (
            <View style={styles.background}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.deleteFile()}>
                    <Text>Delete File</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default ReadFromFile;
