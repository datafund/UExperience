import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'

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
        const questions = item.questions ? JSON.parse(item.questions) : [];
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
              {
                  this.state.beeps.map((item, index) => (
                      <TouchableOpacity
                          key = {index}
                          style = {styles.container}
                          onPress = {() => this.alertItemName(item)}>
                            <Text style = {styles.text}>
                                {item.time}
                            </Text>
                      </TouchableOpacity>
                  ))
              }

              </View>
          )
          }
      }
}


export default List

const styles = StyleSheet.create ({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    }
})
