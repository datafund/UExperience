import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    Slider,
    TextInput,
    AsyncStorage,
} from "react-native";

import styles from "./Styles.js";

export class QuestionBinary extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.saveAnswer(
                            this.props.id,
                            this.props.question,
                            this.props.type,
                            1,
                        )
                    }>
                    <Text>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.saveAnswer(
                            this.props.id,
                            this.props.question,
                            this.props.type,
                            0,
                        )
                    }>
                    <Text>No</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export class QuestionMultipleChoice extends Component {
    render() {
        return (
            <View>
                {this.props.possibleAnswers.map((item, index) => (
                    <TouchableHighlight
                        style={styles.button}
                        key={index}
                        onPress={() =>
                            this.props.saveAnswer(
                                this.props.id,
                                this.props.question,
                                this.props.type,
                                item,
                            )
                        }>
                        <Text>{item}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        );
    }
}

export class QuestionSlider extends Component {
    state = {currentAnswer: 50};

    render() {
        return (
            <View>
                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    value={50}
                    onValueChange={val => this.setState({currentAnswer: val})}
                />
                <Text>Current answer is : {this.state.currentAnswer}/100</Text>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.saveAnswer(
                            this.props.id,
                            this.props.question,
                            this.props.type,
                            this.state.currentAnswer,
                        )
                    }>
                    <Text>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export class QuestionTags extends Component {
    componentDidMount() {
        const CryptoJS = require("crypto-js");
        if (this.props.type === "Tags") {
            AsyncStorage.getItem("beeps")
                .then(value => {
                    if (!(this.props.password === "")) {
                        value = CryptoJS.AES.decrypt(
                            value,
                            this.props.password,
                        ).toString(CryptoJS.enc.Utf8);
                    }
                    allBeeps = value ? JSON.parse(value) : [];
                    var allTags = [];
                    for (beepIndex in allBeeps) {
                        var allQuestions = allBeeps[beepIndex].questions;
                        for (questionIndex in allQuestions) {
                            if (allQuestions[questionIndex]) {
                                if (
                                    allQuestions[questionIndex].id ==
                                    this.props.id
                                ) {
                                    for (tagIndex in allQuestions[questionIndex]
                                        .answer) {
                                        let newTag =
                                            allQuestions[questionIndex].answer[
                                                tagIndex
                                            ];
                                        allTags.findIndex(
                                            x => x.tag === newTag,
                                        ) === -1
                                            ? allTags.push({
                                                  tag: newTag,
                                                  chosen: 0,
                                              })
                                            : null;
                                    }
                                }
                            }
                        }
                    }
                    this.setState({tags: allTags, loading: false});
                })
                .catch(err => this.setState({tags: [], loading: false}));
        } else if (this.props.type === "TagsNoAdd") {
            let possibleAnswers = this.props.possibleAnswers;
            let allTags = [];
            for (tag in possibleAnswers) {
                allTags.push({tag: possibleAnswers[tag], chosen: 0});
            }
            this.setState({tags: allTags, loading: false});
        }
        this.setState({loading: false});
    }

    state = {
        tags: [],
        currentTag: "",
        loading: true,
    };

    updateTags = addedTag => {
        const newTag = {tag: addedTag, chosen: 1};
        const newTags = [...this.state.tags, newTag];
        this.setState({tags: newTags});
        this.textInput.clear();
    };

    changeChosenStatus = index => {
        let oldState = this.state.tags;
        if (this.state.tags[index].chosen === 1) {
            oldState[index].chosen = 0;
        } else {
            oldState[index].chosen = 1;
        }
        this.setState({tags: oldState});
    };

    getAllChosenTags = value => {
        let newValue = [];
        for (v in value) {
            if (value[v].chosen === 1) {
                newValue.push(value[v].tag);
            }
        }
        return newValue;
    };

    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>Please wait a bit</Text>
                </View>
            );
        } else {
            return (
                <View>
                    {this.props.type === "Tags" ? (
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "black",
                                borderWidth: 1,
                            }}
                            onSubmitEditing={event =>
                                this.updateTags(event.nativeEvent.text)
                            }
                            ref={input => {
                                this.textInput = input;
                            }}
                        />
                    ) : null}

                    {this.state.tags.map((item, index) => (
                        <TouchableHighlight
                            key={index}
                            onPress={() => this.changeChosenStatus(index)}>
                            <View
                                style={
                                    item.chosen === 1
                                        ? styles.container2
                                        : styles.container
                                }>
                                <Text>{item.tag}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}

                    <TouchableHighlight
                        style={styles.button}
                        onPress={() =>
                            this.props.saveAnswer(
                                this.props.id,
                                this.props.question,
                                this.props.type,
                                this.getAllChosenTags(this.state.tags),
                            )
                        }>
                        <Text>Save</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }
}

export class QuestionText extends Component {
    static navigationOptions = {
        title: "Question",
    };

    state = {
        text: "",
    };

    setName = value => {
        this.setState({text: value});
    };

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 200, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setName(text)}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.saveAnswer(
                            this.props.id,
                            this.props.question,
                            this.props.type,
                            this.state.text,
                        )
                    }>
                    <Text>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export class QuestionLocation extends Component {
    static navigationOptions = {
        title: "Question",
    };

    state = {
        place: "",
    };

    componentDidMount = async () => {
        navigator.geolocation.getCurrentPosition(position =>
            this.props.saveAnswer(
                this.props.id,
                this.props.question,
                this.props.type,
                position,
            ),
        );
    };

    render() {
        return null;
    }
}
