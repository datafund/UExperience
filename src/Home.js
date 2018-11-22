import React, { Component } from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import styles from './Styles.js';
import ImageHeader from './Header.js';

class Home extends Component {
    
    render() {
	return (
	    <View>
            <ImageHeader />
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('NewBeep')} >
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
