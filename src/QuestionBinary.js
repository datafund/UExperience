import React, { Component } from 'react'
import { Text, View, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';

import styles from './Styles.js'
import { saveAnswer } from './reducer.js';
   
class QuestionBinary extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };
    
    render() {
        
        const { navigation } = this.props;
        const itemId = navigation.getParam('id', 'NO-ID');
        const question = navigation.getParam('name', 'no question');
        const { currenttime } = this.props;
        
        return (
            <View>
                <Text style={styles.button}>
                    {JSON.stringify(question)}
                </Text>
                <TouchableHighlight style={styles.button} 
                    onPress = {this.props.saveAnswer(itemId, "1", { currenttime })}
                >
                    <Text>
                        Yes
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} 
                    //onPress = {this.props.saveAnswer(itemId, "0", { currenttime })}
                >
                    <Text>
                        No
                    </Text>
                </TouchableHighlight>
            <Text>
                Current beep is: {currenttime}
            </Text>
            </View>
      )
   }
}

const mapStateToProps = state => {
  return {
    currenttime: state.currenttime
  };
};

const mapDispatchToProps = {
    saveAnswer
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBinary);
