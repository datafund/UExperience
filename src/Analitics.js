import React, {Component} from "react";
import {View, Text, TouchableHighlight, ScrollView} from "react-native";

import styles from "./Styles.js";

import {getDataFromStorage} from "./functions/data.js";

class Analitics extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({password: password});
        let beeps = await getDataFromStorage("beeps", "");
        beeps = JSON.parse(beeps);
        this.setState({beeps: beeps});
        let tags = this.getVizualizationData(beeps, "");
        this.setState({tags: tags});
    };

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

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.background}>
                    <View style={{flex: 0.1}} />
                    <ScrollView style={{flex: 1}}>
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                flexWrap: "wrap",
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
                    <View style={{flex: 0.2}}>
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
                                    fontSize: 30,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                }}>
                                {this.state.currentTag
                                    ? "#" + this.state.currentTag.toUpperCase()
                                    : null}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

export default Analitics;
