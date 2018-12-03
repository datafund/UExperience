import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage} from 'react-native'
import moment from "moment";

import styles from './Styles.js'
   
class Questions extends Component {

    static navigationOptions = {
        title: 'Questions',
    };

    componentWillMount(){
        AsyncStorage.getItem("questions").then((value) => this.setState({questions: value}));
        AsyncStorage.getItem("currentIdQuestion").then((value) => this.setState({id: value}));
    }


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
      questionstags: [
         {
            id: 4,
            name: 'Kakšna so tvoja trenutna čustva?',
         },        
      ],
      questionstags2: [
         {
            id: 5,
            name: 'Kakšna so tvoja trenutna temeljna čustva?',
         },        
      ],
      questionsmultiplechoice: [
         {
            id: 6,
            name: 'Kje si trenutno?',
            possibleAnswers: [
                "Doma",
                "Služba/Šola",
                "Zunaj",
                "Ostalo",
            ]
         },        
      ],
      questionsslider: [
         {
            id: 7,
            name: 'Kako ekstrovertno se počutiš?',
            possibleAnswers: [
                "ekstrovertno",
                "introvertno",
            ],
         },        
      ],

    'answers': "",
    'currenttime': "",
    "questions": "",
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
             this.state.questionstags.map((item, index) => (
                  <TouchableHighlight
                     key = {item.id}
                     onPress = {() => this.props.navigation.navigate("QuestionTags", item)}>
		     <View style = {styles.button}>
			<Text>
			    {item.name}
			</Text>
		     </View>
                  </TouchableHighlight>
            ))
            }

            {
             this.state.questionstags2.map((item, index) => (
                  <TouchableHighlight
                     key = {item.id}
                     onPress = {() => this.props.navigation.navigate("QuestionTagsNoAdd", item)}>
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

            {
             this.state.questionsmultiplechoice.map((item, index) => (
                  <TouchableHighlight
                     key = {item.id}
                     onPress = {() => this.props.navigation.navigate("QuestionMultipleChoice", item)}>
		     <View style = {styles.button}>
			<Text>
			    {item.name}
			</Text>
		     </View>
                  </TouchableHighlight>
            ))
            }

            {
             this.state.questionsslider.map((item, index) => (
                  <TouchableHighlight
                     key = {item.id}
                     onPress = {() => this.props.navigation.navigate("QuestionSlider", item)}>
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

          {!(this.state.questions === "") ? <Text>{this.state.questions }</Text> : <Text>Still loading</Text>}

         </View>
      )
   }
}

export default Questions;
