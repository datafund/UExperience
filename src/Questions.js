import React, { Component } from 'react'
import { Text, View, TouchableHighlight} from 'react-native'
import styles from './Styles.js'
   
class Questions extends Component {

    static navigationOptions = {
        title: 'Questions',
    };

   state = {
      names: [
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
            name: 'Ali si doživljal kaj pozitivnega?',
         },
         {
            id: 3,
            name: 'Ali si doživljal kaj negativnega?',
         },
         {
            id: 4,
            name: 'Ali si se zavedal svojega telesa?',
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
