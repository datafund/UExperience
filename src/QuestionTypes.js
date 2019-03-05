import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    Slider,
    TextInput,
    AsyncStorage,
    Platform,
    TouchableNativeFeedback,
} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage} from "./functions/data.js";

export class QuestionBinary extends Component {
    render() {
        return (
            <View style={styles.background}>
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
                    <Text style={{fontSize: 20}}>Yes</Text>
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
                    <Text style={{fontSize: 20}}>No</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export class QuestionMultipleChoice extends Component {
    render() {
        return (
            <View style={styles.background}>
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
                        <Text style={{fontSize: 20}}>{item}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        );
    }
}

export class QuestionSlider extends Component {
    state = {currentAnswer: 50};

    componentWillUnmount = () => {
        this.props.saveAnswer(
            this.props.id,
            this.props.question,
            this.props.type,
            this.state.currentAnswer,
        );
    };

    render() {
        return (
            <View style={styles.background}>
                <Text style={{flex: 0.1}} />
                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    value={50}
                    onValueChange={val => this.setState({currentAnswer: val})}
                />
                <Text style={{fontSize: 20}}>
                    Current answer is : {this.state.currentAnswer}/100
                </Text>
            </View>
        );
    }
}

export class QuestionTags extends Component {
    componentDidMount = async () => {
        if (this.props.type === "Tags") {
            let password = this.props.password;
            let research = await getDataFromStorage("research", password);
            research = research ? JSON.parse(research) : [];
            let value = await getDataFromStorage("beeps", password);
            allBeeps = value ? JSON.parse(value) : [];
            var allTags = [];
            for (beepIndex in allBeeps) {
                if (allBeeps[beepIndex].researchId === research.id) {
                    var allQuestions = allBeeps[beepIndex].questions;
                    for (questionIndex in allQuestions) {
                        if (allQuestions[questionIndex]) {
                            if (
                                allQuestions[questionIndex].id == this.props.id
                            ) {
                                for (tagIndex in allQuestions[questionIndex]
                                    .answer) {
                                    let newTag =
                                        allQuestions[questionIndex].answer[
                                            tagIndex
                                        ];
                                    allTags.findIndex(x => x.tag === newTag) ===
                                    -1
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
            }
            if (this.props.possibleAnswers) {
                let possibleAnswers = this.props.possibleAnswers;
                for (tag in possibleAnswers) {
                    allTags.push({tag: possibleAnswers[tag], chosen: 0});
                }
                let uniq = {};
                allTags = allTags.filter(
                    obj => !uniq[obj.tag] && (uniq[obj.tag] = true),
                );
            }
            this.setState({tags: allTags});
        } else if (this.props.type === "TagsNoAdd") {
            let possibleAnswers = this.props.possibleAnswers;
            let allTags = [];
            for (tag in possibleAnswers) {
                allTags.push({tag: possibleAnswers[tag], chosen: 0});
            }
            this.setState({tags: allTags});
        }
    };

    componentWillUnmount = () => {
        this.props.saveAnswer(
            this.props.id,
            this.props.question,
            this.props.type,
            this.getAllChosenTags(this.state.tags),
        );
    };

    state = {
        tags: [],
        currentTag: "",
        loading: true,
    };

    updateTags = addedTag => {
        const newTag = {tag: addedTag, chosen: 1};
        const newTags = [...this.state.tags, newTag];
        this.textInput.clear();
        this.setState({tags: newTags});
        this.setState({currentTag: ""});
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

    showTag = (item, index) => {
        if (item.tag.includes(this.state.currentTag)) {
            return (
                <TouchableHighlight
                    key={index}
                    onPress={() => {
                        this.changeChosenStatus(index);
                        this.setState({currentTag: ""});
                        this.textInput.clear();
                    }}>
                    <View
                        style={
                            item.chosen === 1
                                ? styles.container2
                                : styles.container
                        }>
                        <Text
                            style={
                                item.chosen === 1
                                    ? styles.textTags2
                                    : styles.textTags
                            }>
                            {item.tag}
                        </Text>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <View style={styles.background}>
                {this.props.type === "Tags" ? (
                    <View
                        style={{
                            backgroundColor: "gray",
                            flexDirection: "row",
                            height: 60,
                        }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "black",
                                borderWidth: 1,
                                backgroundColor: "white",
                                width: "80%",
                                alignSelf: "flex-start",
                                borderRadius: 10,
                                top: 10,
                                left: 5,
                            }}
                            placeholder="Poišči ali dodaj"
                            onChangeText={text =>
                                this.setState({currentTag: text})
                            }
                            onSubmitEditing={event =>
                                this.updateTags(event.nativeEvent.text)
                            }
                            ref={input => {
                                this.textInput = input;
                            }}
                        />
                        <TouchableHighlight
                            style={{
                                alignSelf: "flex-end",
                                margin: 15,
                            }}
                            onPress={() =>
                                this.updateTags(this.state.currentTag)
                            }>
                            <Text
                                style={{
                                    textAlign: "right",
                                    fontSize: 20,
                                    color: "#f5f5f5",
                                }}>
                                Dodaj
                            </Text>
                        </TouchableHighlight>
                    </View>
                ) : null}

                {this.state.tags.map((item, index) =>
                    this.showTag(item, index),
                )}
            </View>
        );
    }
}

export class QuestionText extends Component {
    componentWillUnmount = () => {
        this.props.saveAnswer(
            this.props.id,
            this.props.question,
            this.props.type,
            this.state.text,
        );
    };

    state = {
        text: "",
    };

    render() {
        return (
            <View style={styles.background}>
                <TextInput
                    style={{
                        height: 200,
                        borderColor: "black",
                        borderWidth: 1,
                        backgroundColor: "#f5f5f5",
                        alignItems: "flex-start",
                    }}
                    onChangeText={text => this.setState({text: text})}
                    multiline={true}
                />
            </View>
        );
    }
}
