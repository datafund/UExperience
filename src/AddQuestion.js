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

const CryptoJS = require("crypto-js");

class AddQuestion extends Component {
    static navigationOptions = {
        title: "Dodaj Vprašanje",
    };

    componentDidMount() {
        AsyncStorage.getItem("currentIdQuestion").then(value =>
            this.setState({currentId: value}),
        );
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
    }

    state = {
        vprašanje: "",
        type: "",
        possibleAnswers: "",
        currentId: "",
    };

    saveQuestion = async () => {
        let newQuestion = {
            id: this.state.currentId,
            name: this.state.vprašanje,
            type: this.state.type,
            current: 1,
        };
        let newId = Number(this.state.currentId) + 1;
        AsyncStorage.setItem("currentIdQuestion", String(newId));
        if (["TagsNoAdd", "MultipleChoice"].includes(this.state.type)) {
            newQuestion["possibleAnswers"] = this.state.possibleAnswers;
        }
        try {
            questions = await AsyncStorage.getItem("questions");

            if (!(this.state.password === "")) {
                questions = CryptoJS.AES.decrypt(
                    questions,
                    this.state.password,
                ).toString(CryptoJS.enc.Utf8);
            }
        } catch (err) {
            questions = "";
        }
        q = questions ? JSON.parse(questions) : [];
        q.push(newQuestion);
        q = JSON.stringify(q);
        if (!(this.state.password === "")) {
            q = CryptoJS.AES.encrypt(q, this.state.password).toString();
        }
        AsyncStorage.setItem("questions", q);
        this.props.navigation.goBack();
    };

    seperateTags = text => {
        let splitedTags = text.split(",");
        let allTags = splitedTags.map(tag => tag.trim());
        this.setState({possibleAnswers: allTags});
    };

    render() {
        return (
            <View>
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
                    <Picker.Item label="Prosto besedilo" value="Text" />
                </Picker>
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({vprašanje: text})}
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
