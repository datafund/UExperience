import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage} from "./functions/data.js";

export default class List extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        let beeps = await getDataFromStorage("beeps", password);
        beeps = beeps ? JSON.parse(beeps) : [];
        this.setState({beeps: beeps});
    };

    state = {
        beeps: [],
    };

    render() {
        return (
            <View style={styles.background}>
                <ScrollView>
                    {this.state.beeps.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.button}
                            onPress={() =>
                                this.props.navigation.navigate(
                                    "BeepRepresentation",
                                    {
                                        beep: item,
                                    },
                                )
                            }>
                            <Text style={styles.textButton}>{item.time}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}
