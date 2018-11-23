import React, { Component } from 'react'
import { Text, View, TouchableHighlight} from 'react-native'
import styles from './Styles.js'
   
class QuestionBinary extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };
    
    render() {
        
        const { navigation } = this.props;
        const itemId = navigation.getParam('id', 'NO-ID');
        const question = navigation.getParam('name', 'no question');
        
        return (
            <View>
                <Text style={styles.button}>
                    {JSON.stringify(question)}
                </Text>
                <TouchableHighlight style={styles.button}>
                    <Text>
                        Yes
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}>
                    <Text>
                        No
                    </Text>
                </TouchableHighlight>
            </View>
      )
   }
}
export default QuestionBinary;
