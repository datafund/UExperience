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
            experience: beep.experience,
        });
    };

    state = {
        time: "",
        longitude: "",
        latitude: "",
        questions: [],
        picture: "",
        experience: "",
        days: {
            0: "nedelja",
            1: "ponedeljek",
            2: "torek",
            3: "sreda",
            4: "četrtek",
            5: "petek",
            6: "sobota",
            7: "nedelja",
        },
    };

    render() {
        return (
            <View style={styles.background}>
                <ScrollView>
                    {this.state.time ? (
                        <Text>
                            <Text style={styles.textBeepHeader}>Čas: </Text>
                            <Text style={styles.textBeep}>
                                {(this.state.time.slice(8) === "0"
                                    ? this.state.time.slice(8, 10)
                                    : this.state.time.slice(9, 10)) +
                                    ". " +
                                    (this.state.time.slice(5) === "0"
                                        ? this.state.time.slice(5, 7)
                                        : this.state.time.slice(6, 7)) +
                                    ". " +
                                    this.state.time.slice(0, 4) +
                                    " " +
                                    this.state.time.slice(11, 13) +
                                    ":" +
                                    this.state.time.slice(14, 16) +
                                    " (" +
                                    this.state.days[
                                        new Date(
                                            this.state.time.slice(0, 10),
                                        ).getDay()
                                    ] +
                                    ")"}
                            </Text>
                        </Text>
                    ) : null}
                    {this.state.longitude ? (
                        <Text>
                            <Text stlye={styles.textBeepHeader}>
                                Longitude:{" "}
                            </Text>
                            <Text style={styles.textBeep}>
                                {this.state.longitude}
                            </Text>
                        </Text>
                    ) : null}
                    {this.state.latitude ? (
                        <Text>
                            <Text stlye={styles.textBeepHeader}>
                                Latitude:{" "}
                            </Text>
                            <Text style={styles.textBeep}>
                                {this.state.latitude}
                            </Text>
                        </Text>
                    ) : null}
                    {this.state.experience ? (
                        <Text>
                            <Text style={styles.textBeepHeader}>
                                Doživljanje:{" "}
                            </Text>
                            <Text style={styles.textBeep}>
                                {this.state.experience}
                            </Text>
                        </Text>
                    ) : null}

                    {this.state.questions.map((item, index) => (
                        <View key={index}>
                            <Text style={styles.textBeepHeader}>
                                {item.question} ({item.type})
                            </Text>
                            <Text style={styles.textBeep}>
                                {["TagsNoAdd", "Tags"].includes(item.type)
                                    ? item.answer.join(", ")
                                    : item.answer}
                            </Text>
                            {this.state.picture ? (
                                <Image
                                    source={this.state.picture}
                                    style={{height: 200}}
                                />
                            ) : null}
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default List;
