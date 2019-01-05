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
        this.setState({beeps: beeps ? JSON.parse(beeps) : [], loading: false});
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
                            <Text>{item.time}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}
