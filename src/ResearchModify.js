import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    Picker,
    TextInput,
    ScrollView,
    Image,
} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage, setDataToStorage} from "./functions/data.js";

export default class ResearchModify extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        let research = await getDataFromStorage("research", password);
        research = research ? JSON.parse(research) : [];
        this.setState({research: research});
    };

    getNextId = questions => {
        let allIds = [];
        for (key in questions) {
            allIds.push(questions[key].id);
        }
        this.setState({allIds: allIds});
        id = 0;
        let i = 0;
        while (id === 0) {
            i++;
            if (!allIds.includes(i)) {
                return i;
            }
        }
    };

    componentWillUnmount = async () => {
        await setDataToStorage(
            "research",
            this.state.password,
            this.state.research,
        );
    };

    state = {
        research: {},
        vprašanje: "",
        type: "",
        possibleAnswers: "",
        newQuestion: true,
        allIds: [],
    };

    changeChosenStatus = index => {
        let oldState = this.state.research.questions;
        if (oldState[index].current === 1) {
            oldState[index].current = 0;
        } else {
            oldState[index].current = 1;
        }
        this.setState({tags: oldState});
    };

    saveQuestion = async () => {
        let newQuestion = {
            id: this.getNextId(this.state.research.questions),
            question: this.state.vprašanje,
            type: this.state.type,
            current: 1,
        };
        if (["TagsNoAdd", "MultipleChoice"].includes(this.state.type)) {
            newQuestion["possibleAnswers"] = this.state.possibleAnswers;
        }
        this.setState({vprašanje: ""});
        this.setState({possibleAnswers: ""});
        this.setState({type: ""});
        this.textInput.clear();
        let q = this.state.research;
        q.questions.push(newQuestion);
        this.setState({research: q});
    };

    seperateTags = text => {
        let splitedTags = text.split(",");
        let allTags = splitedTags.map(tag => tag.trim());
        this.setState({possibleAnswers: allTags});
    };

    getFooter = () => {
        return (
            <View
                style={{
                    height: 50,
                    backgroundColor: "#4e4d4d",
                }}>
                <TouchableHighlight
                    style={{
                        position: "absolute",
                        alignSelf: "flex-end",
                        top: 0,
                    }}
                    onPress={() => {
                        if (this.state.newQuestion === true) {
                            this.setState({newQuestion: false});
                        } else {
                            this.setState({newQuestion: true});
                        }
                    }}>
                    <Image
                        source={require("./ui/memo.png")}
                        style={{height: 40, width: 40}}
                    />
                </TouchableHighlight>
            </View>
        );
    };

    render() {
        if (this.state.newQuestion === true) {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        <Text style={styles.textButton}>
                            Tukaj lahko dodaš dodatna vprašanja, ki jih želiš
                            spremljati pri raziskovanju svojega doživljanja.
                        </Text>
                        <Text style={styles.textButton}>
                            Izberi tip vprašanja:
                        </Text>
                        <Picker
                            selectedValue={this.state.type}
                            style={{height: 50}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({type: itemValue})
                            }>
                            <Picker.Item label="" value="" />
                            <Picker.Item label="Binarna" value="Binary" />
                            <Picker.Item
                                label="Vprašanja z več možnimi odgovori"
                                value="MultipleChoice"
                            />
                            <Picker.Item label="Slider" value="Slider" />
                            <Picker.Item
                                label="Vprašanja z tagi z novimi"
                                value="Tags"
                            />
                            <Picker.Item
                                label="Vprašanja z tagi brez novih"
                                value="TagsNoAdd"
                            />
                            <Picker.Item label="Prosto besedilo" value="Text" />
                        </Picker>
                        <Text style={styles.textButton}>
                            Spodaj napiši vprašanje:
                        </Text>
                        <TextInput
                            style={{
                                height: 50,
                                borderColor: "black",
                                borderWidth: 1,
                            }}
                            onChangeText={text =>
                                this.setState({vprašanje: text})
                            }
                            ref={input => {
                                this.textInput = input;
                            }}
                        />
                        {["TagsNoAdd", "MultipleChoice"].includes(
                            this.state.type,
                        ) ? (
                            <View>
                                <Text style={styles.textButton}>
                                    Tukaj dodaj možne odgovore, ločene z
                                    vejicami.
                                </Text>
                                <TextInput
                                    style={{
                                        height: 50,
                                        borderColor: "black",
                                        borderWidth: 1,
                                    }}
                                    onChangeText={text =>
                                        this.seperateTags(text)
                                    }
                                />
                            </View>
                        ) : null}
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.saveQuestion()}>
                            <Text style={styles.textButton}>Shrani</Text>
                        </TouchableHighlight>
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        } else {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        {this.state.research.questions.map((item, index) => (
                            <TouchableHighlight
                                key={index}
                                onPress={() => this.changeChosenStatus(index)}>
                                <Text
                                    style={
                                        item.current === 1
                                            ? styles.container2
                                            : styles.container
                                    }>
                                    {item.question}
                                </Text>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        }
    }
}
