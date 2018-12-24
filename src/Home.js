import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    Image,
} from "react-native";

import styles from "./Styles.js";

class Home extends Component {
    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
    }

    state = {password: ""};
    render() {
        return (
            <View style={styles.background}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("NewBeep", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Začni nov beep</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("Beeps", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Preglej svoje beep-e</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("AddResearch", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Dodaj vprašanja za Beepe</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Home;
