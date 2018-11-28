import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage} from 'react-native'
import moment from "moment";

import styles from './Styles.js'
   
class Questions extends Component {

    static navigationOptions = {
        title: 'Questions',
    };

    componentDidMount() {
        AsyncStorage.setItem("currenttime", moment().utcOffset('+02').format('YYYY-MM-DD-HH-mm-ss') );
    }

   state = {
      questionsbinary: [
         {
            id: 0,
            name: 'Ali si sam?',
         },
         {
            id: 1,
            name: 'Ali si bil prisoten v trenutku?',
         },
         {
            id: 2,
            name: 'Ali si se zavedal svojega telesa?',
         }

      ],
      questionstext: [
         {
            id: 3,
            name: 'Kaj trenutno doživljaš?',
         },
      ],
    'answers': "",
    'currenttime': "",

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


   render() {

      return (
         <View>
            {
             this.state.questionsbinary.map((item, index) => (
                  <TouchableHighlight
                     key = {item.id}
                     onPress = {() => this.props.navigation.navigate("QuestionBinary", item)}>
		     <View style = {styles.button}>
			<Text>
			    {item.name}
			</Text>
		     </View>
                  </TouchableHighlight>
            ))
            }

            {
             this.state.questionstext.map((item, index) => (
                  <TouchableHighlight
                     key = {item.id}
                     onPress = {() => this.props.navigation.navigate("QuestionText", item)}>
		     <View style = {styles.button}>
			<Text>
			    {item.name}
			</Text>
		     </View>
                  </TouchableHighlight>
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
