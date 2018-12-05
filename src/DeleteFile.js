import React, { Component } from "react";
import {View, TouchableHighlight, Text, AsyncStorage} from "react-native";

import styles from "./Styles.js";

const RNFS = require('react-native-fs');

class ReadFromFile extends Component {

    static navigationOptions = {
        title: "Delete File",
    };

    state = {
    };

    deleteFile = () => {
        const path = RNFS.DocumentDirectoryPath + '/test.txt';
        RNFS.unlink(path);
    };

    render() {
        
	return (
	    <View>
        <TouchableHighlight style={styles.button} 
            onPress = {() => this.deleteFile()}
        >
        <Text>
            Delete File
        </Text>
        </TouchableHighlight>
	    </View>
	);
    }
}

export default ReadFromFile;
