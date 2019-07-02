import React, {Component} from "react";
import {View, Text, TouchableHighlight, ScrollView, Image} from "react-native";

import styles from "./Styles.js";

import {getDataFromStorage} from "./functions/data.js";

class Analitics extends Component {
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
        this.setState({password: password});
        let beeps = await getDataFromStorage("beeps", "");
        beeps = JSON.parse(beeps);
        this.setState({beeps: beeps});
        let tags = this.getVizualizationData(beeps, "");
        this.setState({tags: tags});
        this.props.navigation.setParams({
            handleSetting: this.goToSettings.bind(this),
        });
    };

    goToSettings() {
        this.props.navigation.navigate("Settings", {
            password: this.state.password,
        });
    }

    getVizualizationData = (beeps, filter) => {
        answers = [];
        for (idB in beeps) {
            let currentQuestions = beeps[idB].questions;
            let currentAnswers = [];
            for (idQ in currentQuestions) {
                if (
                    ["Tags", "TagsNoAdd", "MultipleChoiceQuestion"].includes(
                        currentQuestions[idQ].type,
                    )
                ) {
                    currentAnswers.push(currentQuestions[idQ].answer);
                }
            }
            currentAnswers = [].concat.apply([], currentAnswers);
            if (currentAnswers.includes(filter) || filter === "") {
                answers.push(currentAnswers);
            }
        }
        answers = [].concat.apply([], answers);
        data = this.getCountsOfElementsInArray(answers);
        valueArray = [];
        for (element in data) {
            valueArray.push(data[element].value);
        }
        max = Math.max(...valueArray);
        min = Math.min(...valueArray);

        finalResult = data.map(element => {
            let fontSize = 15 + (element.value - min) / ((max - min) / 15);
            return {
                fontSize: fontSize,
                value: element.value,
                label: element.label,
            };
        });
        return finalResult;
    };

    getCountsOfElementsInArray = arrayOfElements => {
        let counts = arrayOfElements.reduce(
            (counts, curr) => ((counts[curr] = ++counts[curr] || 1), counts),
            {},
        );
        allElements = [];
        for (id in counts) {
            allElements.push({label: id, value: counts[id]});
        }
        return allElements;
    };

    state = {
        beeps: [],
        currentTag: "",
        tags: [],
    };

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
                <ScrollView
                    style={{
                        flex: 1,
                    }}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            flex: 1,
                        }}>
                        {this.state.tags.map(element => {
                            return (
                                <TouchableHighlight
                                    style={{
                                        margin: 5,
                                    }}
                                    key={element.label}
                                    onPress={() => {
                                        this.setState({
                                            currentTag: element.label,
                                        });
                                        let tags = this.getVizualizationData(
                                            this.state.beeps,
                                            element.label,
                                        );
                                        this.setState({tags: tags});
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: element.fontSize,
                                        }}>
                                        {element.label}
                                    </Text>
                                </TouchableHighlight>
                            );
                        })}
                    </View>
                </ScrollView>

                <View
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 5,
                    }}
                />
                <View style={{flex: 0.1}}>
                    <TouchableHighlight
                        onPress={() => {
                            this.setState({currentTag: ""});
                            let tags = this.getVizualizationData(
                                this.state.beeps,
                                "",
                            );
                            this.setState({tags: tags});
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                alignSelf: "center",
                                justifyContent: "center",
                            }}>
                            {this.state.currentTag
                                ? "#" + this.state.currentTag.toUpperCase()
                                : null}
                        </Text>
                    </TouchableHighlight>
                </View>
                {this.getFooter()}
            </View>
        );
    }
}

export default Analitics;
