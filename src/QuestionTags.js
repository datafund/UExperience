import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage, List, FlatList} from 'react-native'

import styles from './Styles.js'
   
class QuestionTags extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };    

    state = {
        tagsOld: [
            {tag: "Eobard Thawne"},
            {tag: "Barry Allen"},
            {tag: "Cisco Ramon"},
            {tag: "Catlin Snow"},
            {tag: "Harrison Wells"},
            {tag: "Hartley Rataway"},
        ],
        tagsChosen: [],
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

    render() {
        
        const { navigation } = this.props;
        const itemId = navigation.getParam('id', 'NO-ID');
        const question = navigation.getParam('name', 'no question');
        
        return (
            <View>
                <Text style={styles.button}>
                    {JSON.stringify(question)}
                </Text>
                {
                    this.state.tagsOld.map((item, index) => (
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

                <TouchableHighlight style={styles.button} onPress = {() => this.saveAnswer(itemId, question, "Tags", this.state.tagsChosen )}>
                <Text>
                    Save
                </Text>
                </TouchableHighlight>

            </View>
      )
   }
}

export default QuestionTags;
