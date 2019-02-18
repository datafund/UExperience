import React, {Component} from "react";
import {AsyncStorage, View, Text} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage} from "./functions/data.js";

class Splash extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {personal: {}};

    componentDidMount = async () => {
        let passwordHash = await getDataFromStorage("passwordHash", "");
        if (!passwordHash) {
            this.props.navigation.navigate("LoadingNewUsers");
        } else if (passwordHash === "None") {
            this.props.navigation.navigate("Index", {
                password: "",
            });
        } else {
            this.props.navigation.navigate("LogIn");
        }
    };

    render() {
        return <View style={styles.backgroundStart} />;
    }
}

export default Splash;
