import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage, ScrollView } from 'react-native'

import styles from './Styles.js'

class List extends Component {

    static navigationOptions = {
        title: 'List of Beeps',
    };

    componentWillMount() {
        AsyncStorage.getItem("beeps").then((value) => 
            this.setState({beeps: value ? JSON.parse(value) : [], loading: false}));
    }

  state = {
      beeps: "",
      loading: true,
 }

    alertItemName = (item) => {
        text = "";
        const questions = item.questions;
        for (id in questions) {
            text += questions[id].question
            text += "\n"
            text += questions[id].answer
            text += "\n---\n"
        }
        alert(text)
    }

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
              <ScrollView>
              {
                  this.state.beeps.map((item, index) => (
                      <TouchableOpacity
                          key = {index}
                          style = {styles.container}
                          onPress = {() => this.alertItemName(item)}>
                            <Text>
                                {item.time}
                            </Text>
                      </TouchableOpacity>
                  ))
              }
                </ScrollView>
              </View>

          )
          }
      }
}


export default List;
