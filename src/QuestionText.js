import React, { Component } from 'react'
import { Text, View, TextInput} from 'react-native'
import styles from './Styles.js'
   
class QuestionText extends Component {
    
    static navigationOptions = {
        title: 'Question',
    };
    
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    
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
                    style={{height: 300, borderColor: 'black', borderWidth: 1,}}
                    onChangeText={(text) => this.setState({text})}
                />
            </View>
      )
   }
}
export default QuestionText;
