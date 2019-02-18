import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    TextInput,
    AsyncStorage,
    Alert,
} from "react-native";

import PushNotification from "react-native-push-notification";

import styles from "./Styles.js";
import {
    getDataFromStorage,
    setDataToStorage,
    createNewProfile,
} from "./functions/data.js";

const CryptoJS = require("crypto-js");

class LogIn extends Component {
    componentDidMount = async () => {
        let passwordHash = await getDataFromStorage("passwordHash", "");
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

    deleteProfileAlert = () => {
        Alert.alert(
            "TO BO IZBRISALO VSE VAŠE PODATKE IZ TELEFONA",
            "Če se kasneje premislite, in želite katere vaše podatke, jih ne bo več na telefonu. Podatke, ki jih nistve izvozili ali poslali raziskovalcem bodo izgubljeni za vedno. Ali ste prepričani, da želite izbrisati svoje podatke:",
            [
                {
                    text: "Ne izbriši",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Izbriši",
                    onPress: () => {
                        PushNotification.cancelAllLocalNotifications();
                        AsyncStorage.clear();
                        this.setState({passwordHash: ""});
                        this.setState({inputPassword: ""});
                        this.setState({message: ""});
                    },
                },
                {onDismiss: () => {}},
            ],
        );
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

    renderLogInScreen = () => {
        return (
            <View style={styles.backgroundStart}>
                <Text style={{flex: 0.1}} />
                <Text
                    style={{
                        flex: 0.1,
                        fontSize: 20,
                        textAlign: "center",
                        color: "white",
                    }}>
                    Prosim, da vpišete svoje geslo
                </Text>
                <Text style={{flex: 0.1}} />
                <TextInput
                    style={{
                        height: 50,
                        borderColor: "black",
                        borderWidth: 1,
                        backgroundColor: "white",
                        width: "90%",
                        alignSelf: "center",
                    }}
                    onChangeText={text => this.setState({inputPassword: text})}
                />
                <Text style={{flex: 0.1}} />
                <View style={{flex: 0.1}}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            flex: 1,
                        }}>
                        <TouchableHighlight
                            style={{
                                backgroundColor: "#4e9363",
                                padding: 30,
                                height: 40,
                                justifyContent: "center",
                                alignSelf: "center",
                                flex: 0.4,
                            }}
                            onPress={() =>
                                this.checkPassword(
                                    this.state.inputPassword,
                                    this.state.passwordHash,
                                )
                            }>
                            <Text
                                style={{
                                    fontSize: 20,
                                    justifyContent: "center",
                                    textAlign: "center",
                                    color: "white",
                                }}>
                                Vpiši se
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{
                                backgroundColor: "#4e9363",
                                padding: 30,
                                height: 40,
                                justifyContent: "center",
                                alignSelf: "center",
                                flex: 0.4,
                            }}
                            onPress={() => this.deleteProfileAlert()}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    justifyContent: "center",
                                    textAlign: "center",
                                    color: "white",
                                }}>
                                Izbriši geslo
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <Text style={{flex: 0.1}} />

                <Text>{this.state.message}</Text>
            </View>
        );
    };

    render() {
        return this.renderLogInScreen();
    }
}

export default LogIn;
