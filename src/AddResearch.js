import React, { Component } from 'react'
import { Text, View, TouchableHighlight} from 'react-native'

import styles from './Styles.js'
   
class AddResearch extends Component {

    static navigationOptions = {
        title: 'Določi Beep',
    };

   render() {

      return (
         <View>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('AddQuestion')} >
		        <Text>Dodaj novo vprašanje</Text>
		    </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('RemoveQuestion')} >
		        <Text>Določi vprašanja, ki se prikažejo</Text>
		    </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => AsyncStorage.clear()} >
		        <Text>Izbriši AsyncStorage</Text>
		    </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => AsyncStorage.setItem("currentIdQuestion", "0")} >
		        <Text>Dodaj id 0 v AsyncStorage</Text>
		    </TouchableHighlight>
         </View>
      )
   }
}

export default AddResearch;
