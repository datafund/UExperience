import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage, TextInput} from 'react-native'

import styles from './Styles.js'
   
class QuestionTags extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };    

    state = {
        tags: [
            {tag: "Eobard Thawne", chosen: 0},
            {tag: "Barry Allen", chosen: 0},
            {tag: "Cisco Ramon", chosen: 0},
            {tag: "Catlin Snow", chosen: 0},
            {tag: "Harrison Wells", chosen: 0},
            {tag: "Hartley Rataway", chosen: 0},
        ],
        currentTag: "",
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
        const newTag = {"tag": addedTag, "chosen": 0};
        const newTags = [...this.state.tags, newTag];
        this.setState({"tags": newTags});
        this.textInput.clear();
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
                <TextInput
                    style={{height: 40, borderColor: 'black', borderWidth: 1,}}
                    onSubmitEditing={(event) => this.updateTags(event.nativeEvent.text)}
                    ref={input => { this.textInput = input }}
                />
            

                {
                    this.state.tags.map((item, index) => (
                        <TouchableHighlight
                            key = {index}
                        >
		                    <View style = {styles.container}>
			                    <Text>
			                        {item.tag}
			                    </Text>
		                    </View>
                        </TouchableHighlight>
            ))
            }

                <TouchableHighlight style={styles.button} 
                    //onPress = {() => this.saveAnswer(itemId, question, "Tags", this.state.tagsChosen )}
                >
                <Text>
                    Save
                </Text>

                </TouchableHighlight>
                <Text>
                    {JSON.stringify(this.state.tags)}
                </Text>

            </View>
      )
   }
}

export default QuestionTags;
