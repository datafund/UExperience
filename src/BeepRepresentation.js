import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, Image} from "react-native";

import styles from "./Styles.js";

class List extends Component {
    componentDidMount = async () => {
        let beep = this.props.navigation.getParam("beep", []);
        this.setState({
            time: beep.time,
            longitude: beep.longitude,
            latitude: beep.latitude,
            questions: beep.questions,
            picture: beep.picture,
        });
    };

    state = {
        time: "",
        longitude: "",
        latitude: "",
        questions: [],
        picture: "",
    };

    render() {
        return (
            <View style={styles.background}>
                <ScrollView>
                    {this.state.time ? (
                        <Text>Time: {this.state.time}</Text>
                    ) : null}
                    {this.state.longitude ? (
                        <Text>Longitude: {this.state.longitude}</Text>
                    ) : null}
                    {this.state.latitude ? (
                        <Text>Latitude: {this.state.latitude}</Text>
                    ) : null}
                    <Text>Questions:</Text>
                    {this.state.questions.map((item, index) => (
                        <View key={index}>
                            <Text>
                                Question: {item.question} ({item.type})
                            </Text>
                            <Text>
                                Answer:{" "}
                                {["TagsNoAdd", "Tags"].includes(item.type)
                                    ? item.answer.join(", ")
                                    : item.answer}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default List;