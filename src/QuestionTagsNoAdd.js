import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage, TextInput} from 'react-native'

import styles from './Styles.js'
   
class QuestionTagsNoAdd extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };

   componentWillMount() {
       
        this.setState({"itemId" : this.props.navigation.getParam("id", "NO-ID")});
        this.setState({"question" : this.props.navigation.getParam("name", "no-question")});
        let possibleAnswers = this.props.navigation.getParam("possibleAnswers", []);
        let allTags = [];
        for (tag in possibleAnswers) {
            allTags.push({tag: possibleAnswers[tag], chosen: 0})
        };
        this.setState({"tags" : allTags});
        };

    state = {
        tags: [],
        currentTag: "",
        itemId: "",

    };

    changeChosenStatus = (index) => {
        let oldState = this.state.tags
        if (this.state.tags[index].chosen === 1) {
            oldState[index].chosen = 0
        } else {
            oldState[index].chosen = 1
        }
        this.setState({"tags": oldState})
    };

    saveAnswer = (id, question, type, value) => {
        let newValue = [];
        for (v in value) {
            if (value[v].chosen === 1) {
                newValue.push(value[v].tag) 
            } 
        }
        let newAnswer = {
            id: id,
            question: question,
            type: type, 
            answer: newValue,
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


    render() {

        
        
        return (
            <View>
                <Text style={styles.button}>
                    {this.state.question}
                </Text>

            {
             this.state.tags.map((item, index) => (
                  <TouchableHighlight
                     key = {index}
                    onPress = {() => this.changeChosenStatus(index)}
                 >
		     <View style = {item.chosen === 1 ? styles.container2 : styles.container}>
			<Text>
			    {item.tag}
			</Text>
		     </View>
                  </TouchableHighlight>
            ))
            } 

                <TouchableHighlight style={styles.button} 
                    onPress = {() => this.saveAnswer(this.state.itemId, this.state.question, "Tags", this.state.tags )}
                >
                <Text>
                    Save
                </Text>

                </TouchableHighlight>
            </View>
      )
   }
}

export default QuestionTagsNoAdd;
