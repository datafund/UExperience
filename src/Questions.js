import React, { Component } from 'react'
import { Text, View, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';

import styles from './Styles.js'
import { createNewBeep } from './reducer.js';
   
class Questions extends Component {

    componentDidMount() {
        this.props.createNewBeep();
    }
    
    static navigationOptions = {
        title: 'Questions',
    };

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


   }

   render() {

       const { currenttime } = this.props;
       
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

        <Text>
          Current beep is: {currenttime}
        </Text>
         </View>
      )
   }
}

const mapStateToProps = state => {
  return {
    currenttime: state.currenttime
  };
};

const mapDispatchToProps = {
  createNewBeep
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
