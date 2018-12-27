import React, {Component} from "react";
import {Image, AsyncStorage, View, Dimensions} from "react-native";

class Splash extends Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount = async () => {
        let passwordHash = await AsyncStorage.getItem("password");
        if (passwordHash === "None") {
            this.props.navigation.navigate("Index", {
                password: "",
            });
        } else {
            this.props.navigation.navigate("LogIn");
        }
    };

    render() {
        return (
            <View style={{}}>
                <Image
                    source={require("./ui/splash.png")}
                    style={{
                        resizeMode: "stretch",
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                    }}
                />
            </View>
        );
    }
}

export default Splash;
