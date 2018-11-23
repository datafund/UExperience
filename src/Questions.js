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


   //this.state.names.push(test)

   render() {

        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');

      
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
         <Text>{JSON.stringify(itemId)} </Text>
         <Text>{JSON.stringify(otherParam)} </Text>
         </View>
      )
   }
}
export default Questions;
