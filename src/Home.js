import React, { Component } from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import styles from './Styles.js';

class Home extends Component {
    
    static navigationOptions = {
        title: 'Home',
    };
    
    render() {
	return (
	    <View>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('NewBeep', {
              itemId: 86,
              otherParam: 'Lets test this',
            })} >
		        <Text>Začni nov beep</Text>
		    </TouchableHighlight>
		    <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Beeps', {
              itemId: 86,
              otherParam: 'Let us test this as well',
            })} >
		        <Text>Preglej svoje beep-e</Text>
		    </TouchableHighlight>
	    </View>
	);
    }
}

export default Home;
