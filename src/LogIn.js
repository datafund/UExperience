import React, { Component } from "react";
import {View, TouchableHighlight, Text, AsyncStorage, TextInput} from "react-native";

import styles from "./Styles.js";

const CryptoJS = require("crypto-js");

class LogIn extends Component {
    
    static navigationOptions = {
        title: "Home",
    };

    componentWillMount(){
        AsyncStorage.getItem("password").then((value) => this.setState({password: value}));
    };

   state = {
    'password': "",
    'inputPassword': "",
    'message': "",
   };

    savePassword = (password) => {
        const passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64)
        AsyncStorage.setItem('password', passwordHash)
        this.props.navigation.navigate('Index')
    };

    checkPassword = (inputedPassword, savedPassword) => {
        const passwordHash = CryptoJS.SHA256(inputedPassword).toString(CryptoJS.enc.Base64)
        if (passwordHash === savedPassword) {
            this.props.navigation.navigate('Index')
        } else {
            this.setState({message: "To ni pravilno geslo"})
        }
    };

    deletePassword = (inputedPassword, savedPassword) => {
        AsyncStorage.clear()
        AsyncStorage.setItem("currentIdQuestion", "0")
        this.setState({password: ""})
        this.setState({inputPassword: ""})
        this.setState({message: ""})
    };



    render() {
        
        if (!(this.state.password)){
          return(
              <View>
              <Text>Zaradi potencialne zlorabe zbranih podatkov (pomisli Cambridge Analyitica) prosim, da si spodaj izberete geslo, z katerim bodo zavarovani vaši podatki:</Text>
              <TextInput
                  style={{height: 50, borderColor: 'black', borderWidth: 1,}}
                  onChangeText={(text) => this.setState({inputPassword: text })}            
              />
              <TouchableHighlight style={styles.button} onPress={() => this.savePassword(this.state.inputPassword)} >
		        <Text>Shrani geslo</Text>
		      </TouchableHighlight>
              </View>
          )
      } else {
          return (
              <View>
                <Text>Prosim, da vpišete svoje geslo</Text>
                <TextInput
                  style={{height: 50, borderColor: 'black', borderWidth: 1,}}
                  onChangeText={(text) => this.setState({inputPassword: text })}            
                />
              <TouchableHighlight style={styles.button} onPress={() => this.checkPassword(this.state.inputPassword, this.state.password)} >
		        <Text>Vpiši se</Text>
		      </TouchableHighlight>
              <TouchableHighlight style={styles.button} onPress={() => this.deletePassword()} >
		        <Text>Izbriši geslo (to bo izbrisalo vse vaše podatke)</Text>
		      </TouchableHighlight>

                <Text>{this.state.message}</Text>
                
              </View>
          )
          }
      }

        
}

export default LogIn;
