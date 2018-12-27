import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    TextInput,
} from "react-native";

import styles from "./Styles.js";

const CryptoJS = require("crypto-js");

class LogIn extends Component {
    componentDidMount = async () => {
        let passwordHash = await AsyncStorage.getItem("password");
        if (passwordHash === "None") {
            this.props.navigation.navigate("Index", {
                password: "",
            });
        }
        this.setState({passwordHash: passwordHash});
    };

    state = {
        passwordHash: "",
        inputPassword: "",
        message: "",
    };

    savePassword = password => {
        const passwordHash = CryptoJS.SHA256(password).toString(
            CryptoJS.enc.Base64,
        );
        AsyncStorage.setItem("password", passwordHash);
        this.props.navigation.navigate("Index", {
            password: this.state.inputPassword,
        });
    };

    noEncryption = () => {
        AsyncStorage.setItem("password", "None");
        this.props.navigation.navigate("Index", {
            password: "",
        });
    };

    checkPassword = (inputedPassword, savedPassword) => {
        const passwordHash = CryptoJS.SHA256(inputedPassword).toString(
            CryptoJS.enc.Base64,
        );
        if (passwordHash === savedPassword) {
            this.props.navigation.navigate("Index", {
                password: inputedPassword,
            });
        } else {
            this.setState({message: "To ni pravilno geslo"});
        }
    };

    deletePassword = (inputedPassword, savedPassword) => {
        AsyncStorage.clear();
        AsyncStorage.setItem("currentIdQuestion", "0");
        this.setState({passwordHash: ""});
        this.setState({inputPassword: ""});
        this.setState({message: ""});
    };

    renderLogInScreen = () => {
        if (!this.state.passwordHash) {
            return (
                <View style={styles.background}>
                    <Text>
                        Zaradi potencialne zlorabe zbranih podatkov (pomisli
                        Cambridge Analyitica) prosim, da si spodaj izberete
                        geslo, z katerim bodo zavarovani vaši podatki:
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "black",
                            borderWidth: 1,
                            backgroundColor: "white",
                        }}
                        onChangeText={text =>
                            this.setState({inputPassword: text})
                        }
                    />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() =>
                            this.savePassword(this.state.inputPassword)
                        }>
                        <Text>Shrani geslo</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.noEncryption()}>
                        <Text>Želim nadeljevati brez enkripcije</Text>
                    </TouchableHighlight>
                </View>
            );
        } else if (this.state.passwordHash === "None") {
            return (
                <View style={styles.background}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() =>
                            this.props.navigation.navigate("Index", {
                                password: "",
                            })
                        }>
                        <Text>Pa Začnimo</Text>
                    </TouchableHighlight>
                </View>
            );
        } else {
            return (
                <View style={styles.background}>
                    <Text>Prosim, da vpišete svoje geslo</Text>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "black",
                            borderWidth: 1,
                            backgroundColor: "white",
                        }}
                        onChangeText={text =>
                            this.setState({inputPassword: text})
                        }
                    />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() =>
                            this.checkPassword(
                                this.state.inputPassword,
                                this.state.passwordHash,
                            )
                        }>
                        <Text>Vpiši se</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.deletePassword()}>
                        <Text>
                            Izbriši geslo (to bo izbrisalo vse vaše podatke)
                        </Text>
                    </TouchableHighlight>

                    <Text>{this.state.message}</Text>
                </View>
            );
        }
    };

    render() {
        return this.renderLogInScreen();
    }
}

export default LogIn;
