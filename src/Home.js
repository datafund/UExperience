import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    Image,
} from "react-native";

import styles from "./Styles.js";

import {getDataFromStorage} from "./functions/data.js";

class Home extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({password: password});
    };

    state = {
        questions: [],
        password: "",
    };

    render() {
        return (
            <View style={{flex: 1}}>
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
                </View>
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 50,
                        backgroundColor: "black",
                    }}>
                    <TouchableHighlight
                        style={{
                            alignSelf: "flex-end",
                        }}
                        onPress={() =>
                            this.props.navigation.navigate("Settings", {
                                password: this.state.password,
                            })
                        }>
                        <Image
                            source={require("./ui/settings.png")}
                            style={{height: 40, width: 40}}
                        />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default Home;
