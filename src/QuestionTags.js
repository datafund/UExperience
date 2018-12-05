import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage, TextInput} from 'react-native'

import styles from './Styles.js'
   
class QuestionTags extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };

   componentWillMount() {
       
        this.setState({"itemId" : this.props.navigation.getParam("id", "NO-ID")});
        this.setState({"question" : this.props.navigation.getParam("name", "no-question")});

        AsyncStorage.getItem("beeps").then((value) => {
            const allBeeps = value ? JSON.parse(value) : [];
            let allTags = [];
            for (beepIndex in allBeeps) {
                var currentBeep = allBeeps[beepIndex];
                var allQuestions = currentBeep.questions;
                for (questionIndex in allQuestions) {
                    var currentQuestion = allQuestions[questionIndex];
                    if (currentQuestion.id === this.state.itemId) {
                        for (tagIndex in currentQuestion.answer) {
                            allTags.findIndex(x => x.tag === currentQuestion.answer[tagIndex]) === -1 ? allTags.push({tag: currentQuestion.answer[tagIndex], chosen: 0}) : null;
                        }
                    } 
                }
            }
            this.setState({tags: allTags, loading: false});
        }
        );
        };

    state = {
        tags: [],
        currentTag: "",
        loading: true,
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

    updateTags = (addedTag) => {
        const newTag = {"tag": addedTag, "chosen": 1};
        const newTags = [...this.state.tags, newTag];
        this.setState({"tags": newTags});
        this.textInput.clear();
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

         if(this.state.loading){
          return(
            <View>
                <Text>Please wait a bit</Text> 
            </View>
          )
      }
      else {

        
        
        return (
            <View>
                <Text style={styles.button}>
                    {this.state.question}
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'black', borderWidth: 1,}}
                    onSubmitEditing={(event) => this.updateTags(event.nativeEvent.text)}
                    ref={input => { this.textInput = input }}
                />

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
}

export default QuestionTags;
