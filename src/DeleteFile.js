import React, {Component} from "react";
import {View, TouchableHighlight, Text, AsyncStorage} from "react-native";

import styles from "./Styles.js";

const RNFS = require("react-native-fs");

class ReadFromFile extends Component {
    state = {
        currentStatus: "",
    };

    deleteFile = () => {
        const path = RNFS.DocumentDirectoryPath + "/test.txt";

        RNFS.exists(path).then(result => {
            if (result) {
                RNFS.unlink(path)
                    .then(value =>
                        this.setState({
                            currentStatus: "Datoteka je bila izbrisana",
                        }),
                    )
                    .catch(err =>
                        this.setState({
                            currentStatus: "Ta datoteka ne obstaja",
                        }),
                    );
            }
        });
    };

    render() {
        return (
            <View style={styles.background}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.deleteFile()}>
                    <Text>Delete File</Text>
                </TouchableHighlight>
                <Text>{JSON.stringify(this.state.currentStatus)}</Text>
            </View>
        );
    }
}

export default ReadFromFile;
