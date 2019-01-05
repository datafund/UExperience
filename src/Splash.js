import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage} from "./functions/data.js";

class Splash extends Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount = async () => {
        let passwordHash = await getDataFromStorage("password", "");
        if (passwordHash === "None") {
            this.props.navigation.navigate("Index", {
                password: "",
            });
        } else {
            this.props.navigation.navigate("LogIn");
        }
    };

    render() {
        return <View style={styles.background} />;
    }
}

export default Splash;
