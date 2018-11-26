import React, { Component } from "react";
import {View, TouchableHighlight, Text} from "react-native";
import moment from "moment";
import { connect } from 'react-redux';

import styles from "./Styles.js";
import { createNewBeep } from './reducer.js';

class Home extends Component {
    
    static navigationOptions = {
        title: "Home",
    };
    
    componentDidMount() {
        this.props.createNewBeep();
    }

    getCurrentTime(){
        return moment().utcOffset('+02').format('YYYY-MM-DD-HH-mm-ss');
    }

    render() {
        const { beeps } = this.props;
	return (
	    <View>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('NewBeep')}>
		        <Text>Začni nov beep</Text>
		    </TouchableHighlight>
		    <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Beeps')} >
		        <Text>Preglej svoje beep-e</Text>
		    </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('GitHubRepositories')} >
		        <Text>Testing Storage</Text>
		    </TouchableHighlight>
        <Text>
            {beeps}
        </Text>
	    </View>
	);
    }
}

const mapStateToProps = state => {
  return {
    beeps: state.beeps
  };
};

const mapDispatchToProps = {
  createNewBeep
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
