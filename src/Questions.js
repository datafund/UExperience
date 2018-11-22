import React, { Component } from 'react'
import { Text, View, TouchableHighlight} from 'react-native'
import styles from './Styles.js'
   
class Questions extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Ben',
         },
         {
            id: 1,
            name: 'Susan',
         },
         {
            id: 2,
            name: 'Robert',
         },
         {
            id: 3,
            name: 'Mary',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View>
            {
               this.state.names.map((item, index) => (
                  <TouchableHighlight
                     key = {item.id}
                     onPress = {() => this.alertItemName(item)}>
		     <View style = {styles.button}>
			<Text>
			    {item.name}
			</Text>
		     </View>
                  </TouchableHighlight>
               ))
            }
         </View>
      )
   }
}
export default Questions;
