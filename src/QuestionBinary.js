import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage} from 'react-native'

import styles from './Styles.js'
 
class QuestionBinary extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };

    saveAnswer = (id, question, type, value) => {
        let newAnswer = {
            id: id,
            question: question,
            type: type, 
            answer: value,
        }
        AsyncStorage.getItem('answers').then((answers) => {
            const a = answers ? JSON.parse(answers) : [];
            aNew = [];
            for (x in a) {
                if (!(a[x].id == id)) {
                    aNew.push(a[x]) 
                } 
            }
            aNew.push(newAnswer);
            AsyncStorage.setItem('answers', JSON.stringify(aNew));
        });
        this.props.navigation.goBack();
    };

    componentDidMount = () => 
        AsyncStorage.getItem("currenttime").then((value) => 
            this.setState({"currenttime": value}))

    
    render() {
        
        const { navigation } = this.props;
        const itemId = navigation.getParam('id', 'NO-ID');
        const question = navigation.getParam('name', 'no question');
        
        return (
            <View>
                <Text style={styles.button}>
                    {JSON.stringify(question)}
                </Text>
                <TouchableHighlight style={styles.button} 
                    onPress = {() => this.saveAnswer(itemId, question, "Binary", 1)}
                >
                    <Text>
                        Yes
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} 
                    onPress = {() => this.saveAnswer(itemId, question, "Binary", 0)}
                >
                    <Text>
                        No
                    </Text>
                </TouchableHighlight>
            </View>
      )
   }
}

export default QuestionBinary;
