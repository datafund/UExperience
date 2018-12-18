import React, {Component} from "react";
import {Text, View, TouchableHighlight, PermissionsAndroid} from "react-native";

import styles from "./Styles.js";

class Premissions extends Component {
    state = {message: ""};

    requestPositionPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.ACCESS_FINE_LOCATION,
                {
                    title: "Lokacija",
                    message:
                        "Za shranjevanje lokacije pri bipih in" +
                        "za nastavljanje bipov glede na lokacijo.",
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({
                    message:
                        "Zdaj lahko uporabljate applikacijo tudi z lokacijo (za shranjevanje bipov in za nastavljanje bipov glede na lokacijo)",
                });
            } else {
                this.setState({
                    message:
                        "Razumemo, zakaj nekateri ne želijo dodati lokacije. Tudi brez lokacije lahko večino aplikacije uporabljate nemoteno.",
                });
            }
        } catch (err) {
            this.setState({
                message: "Prišlo je do napake.",
            });
        }
    };

    render() {
        return (
            <View>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.requestPositionPermission()}>
                    <Text>Lokacija</Text>
                </TouchableHighlight>
                <Text>{this.state.message}</Text>
            </View>
        );
    }
}

export default Premissions;
