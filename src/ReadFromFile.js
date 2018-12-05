import React, { Component } from "react";
import {View, TouchableHighlight, Text, AsyncStorage} from "react-native";

import styles from "./Styles.js";

const RNFS = require('react-native-fs');

class ReadFromFile extends Component {

    static navigationOptions = {
        title: "Reading From File",
    };

    state = {
      beeps: [],
      files: [],
      fileContent: "You did not read the file yet",
    };

    readFromFile = () => {

        const path = RNFS.DocumentDirectoryPath + '/test.txt';
        RNFS.readdir(RNFS.DocumentDirectoryPath).then((result) => this.setState({files: result}));
        RNFS.readFile(path, "utf8").then((result) => this.setState({fileContent: result})).catch((error) => this.setState({fileContent: "This file does not exist"}));
    };

    render() {
        
	return (
	    <View>
        <TouchableHighlight style={styles.button} 
            onPress = {() => this.readFromFile()}
        >
        <Text>
            Read File
        </Text>
        </TouchableHighlight>
        <Text>{this.state.success}</Text>
        <Text>
        {this.state.fileContent}
        </Text>
	    </View>
	);
    }
}

export default ReadFromFile;
