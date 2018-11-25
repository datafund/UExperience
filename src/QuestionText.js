import React, { Component } from 'react'
import { Text, View, TextInput, AsyncStorage} from 'react-native'
import styles from './Styles.js'
   
class QuestionText extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };    

    state = {
        'text': ''
    };
    
    componentDidMount = () => 
        AsyncStorage.getItem("text").then((value) => 
            this.setState({"text": value}))

    setName = (value) => {
        AsyncStorage.setItem("text", value);
        this.setState({"text": value});
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
                    style={{height: 50, borderColor: 'black', borderWidth: 1,}}
                    onChangeText={(text) => this.setName(text)}
                />
                <Text>
                    {this.state.text}
                </Text>
            </View>
      )
   }
}
export default QuestionText;
