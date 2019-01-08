import React, {Component} from "react";
import {Text, View, TouchableHighlight, AsyncStorage} from "react-native";

import styles from "./Styles.js";
import {createNewProfile} from "./functions/data.js";

class Settings extends Component {
    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
    }

    state = {
        questions: [],
    };

    render() {
        return (
            <View style={styles.background}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("PersonalInfo", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Spremeni osebne podatke</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("ResearchChoice", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Izberi Raziskovalni Načrt</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("ResearchModify", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Spremeni Raziskovalni Načrt</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("File", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Pošlji Datoteko</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => AsyncStorage.clear()}>
                    <Text>Izbriši vse podatke</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Settings;
