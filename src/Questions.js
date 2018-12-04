import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage} from 'react-native'
import moment from "moment";

import styles from './Styles.js'
   
class Questions extends Component {

    static navigationOptions = {
        title: 'Questions',
    };

    componentWillMount(){
        AsyncStorage.getItem("questions").then((value) => this.parseJSONString(value));
        AsyncStorage.getItem("currentIdQuestion").then((value) => this.setState({id: value}));
    }

    parseJSONString = (value) => {
        const questions = value ? JSON.parse(value) : [];
        this.setState({questions: questions});
    }

    componentDidMount() {
        AsyncStorage.setItem("currenttime", moment().utcOffset('+02').format('YYYY-MM-DD-HH-mm-ss') );
    }

   state = {
    'answers': "",
    'currenttime': "",
    "questions": [],
    "id": "",

   }

    saveBeep = async() => {
        let newBeep = {
            time: await AsyncStorage.getItem("currenttime"),
            questions: await AsyncStorage.getItem("answers"),
        }
        AsyncStorage.getItem('beeps').then((beeps) => {
            const b = beeps ? JSON.parse(beeps) : [];
            b.push(newBeep);
            AsyncStorage.setItem('beeps', JSON.stringify(b));
        });
        AsyncStorage.setItem("currenttime", "");
        AsyncStorage.setItem("answers", "");
        this.props.navigation.goBack();
    };

    createQuestionButton = (item, index) => {
        if (item.current === 1) {
            return <TouchableHighlight key = {item.id}  onPress = {() => this.props.navigation.navigate(item.type, item)}><View><Text style = {styles.button}>{item.name}</Text></View></TouchableHighlight> 
        } else {
            return null
        }
    };

   render() {

      return (
         <View>
            {
             this.state.questions.map((item, index) => (
                 this.createQuestionButton(item, index)
            ))
            }

          <TouchableHighlight style = {styles.button} onPress = {() => this.saveBeep()}>
            <Text>
            Save Beep
            </Text>
          </TouchableHighlight>

         </View>
      )
   }
}

export default Questions;
