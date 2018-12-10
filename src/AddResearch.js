import React, {Component} from "react";
import {Text, View, TouchableHighlight, AsyncStorage} from "react-native";

import styles from "./Styles.js";

class AddResearch extends Component {
    static navigationOptions = {
        title: "Določi Beep",
    };

    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
    }

    render() {
        return (
            <View>
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
                        this.props.navigation.navigate("SaveToFile", {
                            password: this.state.password,
                        })
                    }>
                    <Text>Shrani Datoteko</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("ReadFromFile")
                    }>
                    <Text>Preberi Shranjeno Datoteko</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("DeleteFile")
                    }>
                    <Text>Izbriši datoteko</Text>
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
                    onPress={() => AsyncStorage.clear()}>
                    <Text>Izbriši AsyncStorage</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        AsyncStorage.setItem("currentIdQuestion", "1000")
                    }>
                    <Text>Dodaj id 0 v AsyncStorage</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => AsyncStorage.setItem("beeps", "")}>
                    <Text>Delete Beeps</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default AddResearch;
