import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Image,
} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage} from "./functions/data.js";

export default class List extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <TouchableHighlight
                onPress={() => {
                    navigation.state.params.handleSetting();
                }}>
                <Image
                    source={require("./ui/settings.png")}
                    style={{flex: 0.8}}
                />
            </TouchableHighlight>
        ),
    });

    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        let beeps = await getDataFromStorage("beeps", password);
        beeps = beeps ? JSON.parse(beeps) : [];
        this.setState({beeps: beeps});
        this.props.navigation.setParams({
            handleSetting: this.goToSettings.bind(this),
        });
    };

    state = {
        beeps: [],
    };

    goToSettings() {
        this.props.navigation.navigate("Settings", {
            password: this.state.password,
        });
    }

    getFooter = () => {
        return (
            <View
                style={{
                    flex: 0.1,
                    backgroundColor: "#4e4d4d",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <TouchableHighlight
                    onPress={async () =>
                        this.props.navigation.navigate("Analitics", {
                            password: this.state.password,
                        })
                    }>
                    <Image
                        source={require("./ui/tags.png")}
                        style={{flex: 0.9, aspectRatio: 1}}
                    />
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={async () =>
                        this.props.navigation.navigate("Beeps", {
                            password: this.state.password,
                        })
                    }>
                    <Image
                        source={require("./ui/list.png")}
                        style={{flex: 0.9, aspectRatio: 1}}
                    />
                </TouchableHighlight>

                <TouchableHighlight onPress={async () => {}}>
                    <Image
                        source={require("./ui/gallery.png")}
                        style={{flex: 0.9, aspectRatio: 1}}
                    />
                </TouchableHighlight>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.background}>
                <ScrollView style={{flex: 0.9}}>
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
                            <Text style={styles.textButton}>
                                {(item.time.slice(8) === "0"
                                    ? item.time.slice(8, 10)
                                    : item.time.slice(9, 10)) +
                                    ". " +
                                    (item.time.slice(5) === "0"
                                        ? item.time.slice(5, 7)
                                        : item.time.slice(6, 7)) +
                                    ". " +
                                    item.time.slice(0, 4) +
                                    "  " +
                                    item.time.slice(11, 13) +
                                    ":" +
                                    item.time.slice(14, 16)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {this.getFooter()}
            </View>
        );
    }
}
