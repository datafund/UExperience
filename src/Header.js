import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

const ImageHeader = (props) => {
    return (
	  <View style={styles.appHeader}>
	    <Image style={styles.imageHeader} source =
	       {require('./img/header.png')} 
	    />
          </View>

    )
}

const styles = StyleSheet.create({
  appHeader: {
    flex: 1,
    backgroundColor: 'black',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageHeader: {
      height: 100,
      width: 300, 
  },
})


export default ImageHeader
