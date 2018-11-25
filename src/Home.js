import React, { Component } from "react";
import {View, TouchableHighlight, Text} from "react-native";
import moment from "moment";

import styles from "./Styles.js";

class Home extends Component {
    
    static navigationOptions = {
        title: "Home",
    };

    state = {
        "keys": "test",
        "currenttime" : "",
    };

    
    yourFunction(){
        var datetime = moment().utcOffset('+02').format('YYYY-MM-DD-HH-mm-ss');
        this.setState({ "currenttime":  datetime});
        this.props.navigation.navigate('NewBeep', {
              itemId: 86,
              time: this.state.currenttime},
        )
    }

    render() {
	return (
	    <View>
            <TouchableHighlight style={styles.button} onPress={this.yourFunction.bind(this)}>
		        <Text>Začni nov beep</Text>
		    </TouchableHighlight>
		    <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Beeps', {
              itemId: 86,
              otherParam: 'Lets test this',
            })} >
		        <Text>Preglej svoje beep-e</Text>
		    </TouchableHighlight>
            <Text>
                {this.state.keys}
            </Text>
            <Text>
                {this.state.currenttime}
            </Text>
	    </View>
	);
    }
}

export default Home;
