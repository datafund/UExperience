import React, { Component } from "react";
import {View, TouchableHighlight, Text, AsyncStorage} from "react-native";

import styles from "./Styles.js";

class Home extends Component {
    
    static navigationOptions = {
        title: "Home",
    };

    render() {
        
	return (
	    <View>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('NewBeep')}>
		        <Text>Začni nov beep</Text>
		    </TouchableHighlight>
		    <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Beeps')} >
		        <Text>Preglej svoje beep-e</Text>
		    </TouchableHighlight>
	    </View>
	);
    }
}

export default Home;
