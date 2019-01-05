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
                        this.props.navigation.navigate("AddQuestion", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Dodaj novo vprašanje</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("RemoveQuestion", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Določi vprašanja, ki se prikažejo</Text>
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
                    onPress={() =>
                        this.props.navigation.navigate("LoadQuestionsFromNet", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Naloži vprašanja iz interneta</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("Notification")
                    }>
                    <Text>Notifikacije</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => AsyncStorage.clear()}>
                    <Text>Izbriši AsyncStorage</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Settings;
