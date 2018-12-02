import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage} from 'react-native'

import styles from './Styles.js'
 
class QuestionMultipleChoice extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };

    state = {
        possibleAnswers: [],
        question: "",
        itemId: "",

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

    componentDidMount = () => {
        this.setState({"itemId" : this.props.navigation.getParam("id", "NO-ID")});
        this.setState({"question" : this.props.navigation.getParam("name", "no-question")});
        this.setState({"possibleAnswers" : this.props.navigation.getParam("possibleAnswers", "")});

        AsyncStorage.getItem("currenttime").then((value) => 
            this.setState({"currenttime": value}))

        };
    
    render() {
        
        return (
            <View>
                <Text style={styles.button}>
                    {JSON.stringify(this.state.question)}
                </Text>
            {
             this.state.possibleAnswers.map((item, index) => (
               <TouchableHighlight style={styles.button}
                    key = {index}
                    onPress = {() => this.saveAnswer(this.state.itemId, this.state.question, "MultipleChoice", item)}
                >
                    <Text>
                     {item}
                    </Text>
                </TouchableHighlight>

            ))
            } 
            </View>
      )
   }
}

export default QuestionMultipleChoice;
