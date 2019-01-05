import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    Picker,
    TextInput,
} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage, setDataToStorage} from "./functions/data.js";

class AddQuestion extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        let questions = await getDataFromStorage("questions", password);
        questions = questions ? JSON.parse(questions) : [];
        this.setState({questions: questions});
        let nextId = this.getNextId(this.state.questions);
        this.setState({nextId: nextId});
    };

    getNextId = questions => {
        let allIds = [];
        for (key in questions) {
            allIds.push(questions[key].id);
        }
        let id = 0;
        let i = 0;
        while (id === 0) {
            i++;
            if (!allIds.includes(i)) {
                id = i;
            }
        }
        return i;
    };

    componentWillUnmount = async () => {
        await setDataToStorage(
            "questions",
            this.state.password,
            this.state.questions,
        );
    };

    state = {
        vprašanje: "",
        type: "",
        possibleAnswers: "",
        questions: [],
    };

    saveQuestion = async () => {
        let newQuestion = {
            id: this.state.nextId,
            name: this.state.vprašanje,
            type: this.state.type,
            current: 1,
        };
        let newId = Number(this.state.currentId) + 1;
        await setDataToStorage("currentIdQuestion", this.state.password, newId);
        if (["TagsNoAdd", "MultipleChoice"].includes(this.state.type)) {
            newQuestion["possibleAnswers"] = this.state.possibleAnswers;
        }
        this.setState({vprašanje: ""});
        this.setState({possibleAnswers: ""});
        this.setState({type: ""});
        this.textInput.clear();
        let q = this.state.questions;
        q.push(newQuestion);
        this.setState({questions: q});
        let nextId = this.getNextId(this.state.questions);
        this.setState({nextId: nextId});
    };

    seperateTags = text => {
        let splitedTags = text.split(",");
        let allTags = splitedTags.map(tag => tag.trim());
        this.setState({possibleAnswers: allTags});
    };

    render() {
        return (
            <View style={styles.background}>
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
                        label="Vprašanja z tagi z možnostjo dodajanja novih tagov"
                        value="Tags"
                    />
                    <Picker.Item
                        label="Vprašanja z tagi brez možnosti dodajanja novih tagov"
                        value="TagsNoAdd"
                    />
                    <Picker.Item label="Lokacija" value="Location" />
                    <Picker.Item label="Prosto besedilo" value="Text" />
                    <Picker.Item label="Naredi sliko" value="Camera" />
                </Picker>
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({vprašanje: text})}
                    ref={input => {
                        this.textInput = input;
                    }}
                />
                {["TagsNoAdd", "MultipleChoice"].includes(this.state.type) ? (
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "black",
                            borderWidth: 1,
                        }}
                        onChangeText={text => this.seperateTags(text)}
                    />
                ) : null}
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.saveQuestion()}>
                    <Text>Shrani</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default AddQuestion;
