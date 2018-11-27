import React, { Component } from 'react'
import { Text, View, TextInput, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';

import styles from './Styles.js'
   
class QuestionText extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };    

    state = {
        'text': ''
    };
    
    setName = (value) => {
        this.setState({"text": value});
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
                <TextInput
                    style={{height: 50, borderColor: 'black', borderWidth: 1,}}
                    onChangeText={(text) => this.setName(text)}
                />
                <Text>
                    Current beep is: {currenttime}
                </Text>
                <TouchableHighlight style={styles.button}>
                <Text>
                    Save
                </Text>
                </TouchableHighlight>

            </View>
      )
   }
}

const mapStateToProps = state2 => {
  return {
    currenttime: state2.currenttime
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionText);
