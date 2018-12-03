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
		        <Text>Dodaj vprašanje</Text>
		    </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('RemoveQuestion')} >
		        <Text>Odstrani Vprašanja</Text>
		    </TouchableHighlight>
         </View>
      )
   }
}

export default AddResearch;
