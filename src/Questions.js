import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    ScrollView,
    Image,
    TextInput,
    AppState,
} from "react-native";
import ImagePicker from "react-native-image-picker";

import styles from "./Styles.js";
import {
    getDataFromStorage,
    setDataToStorage,
    saveBeep,
} from "./functions/data.js";

class Questions extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <TouchableHighlight
                onPress={() => {
                    navigation.state.params.handleSave();
                }}>
                <Image
                    source={require("./ui/folder.png")}
                    style={{flex: 0.8}}
                />
            </TouchableHighlight>
        ),
    });

    componentDidMount = async () => {
        this.subs = [
            this.props.navigation.addListener("didFocus", () => {
                this.componentDidFocus();
            }),
        ];
        AppState.addEventListener("change", state => {
            if (state === "background") {
                saveBeep(
                    this.state.password,
                    this.state.answers,
                    this.state.text,
                    this.state.research,
                    this.state.time,
                    this.state.longitude,
                    this.state.latitude,
                    this.state.picture,
                );
                this.prepareForNewBeep();
            }
        });
        const password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        this.prepareForNewBeep();
        this.props.navigation.setParams({
            handleSave: this.saveDetails.bind(this),
        });
    };

    saveDetails() {
        this.saveNewBeep();
        this.prepareForNewBeep();
        this.props.navigation.navigate("Analitics", {
            password: this.state.password,
        });
    }

    saveNewBeep = () => {
        saveBeep(
            this.state.password,
            this.state.answers,
            this.state.text,
            this.state.research,
            this.state.time,
            this.state.longitude,
            this.state.latitude,
            this.state.picture,
        );
    };

    prepareForNewBeep = async () => {
        this.setState({
            answers: [],
            time: "",
            questions: [],
            picture: "",
            primaryDescriptive: true,
            text: "",
            showText: 1,
            newAnswer: {},
        });
        await setDataToStorage(
            "answer",
            this.state.password,
            JSON.stringify([]),
        );
        let research = await getDataFromStorage(
            "research",
            this.state.password,
        );
        research = research ? JSON.parse(research) : [];
        this.setState({research: research});
        this.setState({
            time: new Date()
                .toISOString()
                .split(".")[0]
                .split("T")
                .join("-")
                .split(":")
                .join("-"),
        });

        if (research.descriptive) {
            this.setState({primaryDescriptive: true, showText: 0});
        } else {
            this.setState({primaryDescriptive: false, showText: 0});
        }
        if (research.place) {
            navigator.geolocation.getCurrentPosition(
                position =>
                    this.setState({
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    }),
                error =>
                    this.setState({
                        longitude: "None",
                        latitude: "None",
                    }),
                {
                    maximumAge: 60000,
                    distanceFilter: 0,
                },
            );
        }
    };

    componentDidFocus = async () => {
        let newAnswer = await getDataFromStorage("answer", this.state.password);
        if (!(newAnswer === "[]")) {
            newAnswer = JSON.parse(newAnswer);
            let allAnswers = this.state.answers;
            allAnswers.push(newAnswer);
            this.setState({answers: allAnswers});
            await setDataToStorage(
                "answer",
                this.state.password,
                JSON.stringify([]),
            );
            this.setState({newAnswer: newAnswer});
        } else {
            if (!this.state.answers) {
                this.prepareForNewBeep();
            }
        }
        let research = await getDataFromStorage(
            "research",
            this.state.password,
        );
        research = JSON.parse(research);
        if (!(research.id === this.state.research.id)) {
            this.prepareForNewBeep();
        }
    };

    componentWillUnmount = () => {
        this.subs.forEach(sub => sub.remove());
        saveBeep(
            this.state.password,
            this.state.answers,
            this.state.text,
            this.state.research,
            this.state.time,
            this.state.longitude,
            this.state.latitude,
            this.state.picture,
        );
        AppState.removeEventListener("change", state => {
            if (state === "background") {
                saveBeep(
                    this.state.password,
                    this.state.answers,
                    this.state.text,
                    this.state.research,
                    this.state.time,
                    this.state.longitude,
                    this.state.latitude,
                    this.state.picture,
                );
                this.prepareForNewBeep();
            }
        });
    };

    state = {
        answers: [],
        time: "",
        questions: [],
        password: "",
        picture: "",
        primaryDescriptive: true,
        text: "",
        showText: 1,
        newAnswer: {},
    };

    createQuestionButton = (item, index) => {
        if (item.current === 1) {
            item["password"] = this.state.password;
            let currentAnswer = "";
            for (idA in this.state.answers) {
                if (this.state.answers[idA].id === item.id) {
                    if (
                        this.state.answers[idA].type === "Tags" ||
                        this.state.answers[idA].type === "TagsNoAdd"
                    ) {
                        currentAnswer = JSON.stringify(
                            this.state.answers[idA].answer,
                        )
                            .replace("[", "")
                            .replace("]", "")
                            .replace(/[\\"]+/g, "")
                            .replace(/["]+/g, "")
                            .replace(",", ", ");
                    } else if (this.state.answers[idA].type === "Binary") {
                        if (this.state.answers[idA].answer === 1) {
                            currentAnswer = "Da";
                        } else {
                            currentAnswer = "Ne";
                        }
                    } else if (this.state.answers[idA].type === "Slider") {
                        currentAnswer =
                            String(this.state.answers[idA].answer) + "/100";
                    } else if (
                        this.state.answers[idA].type === "MultipleChoice"
                    ) {
                        currentAnswer = this.state.answers[idA].answer;
                    } else if (this.state.answers[idA].type === "Text") {
                        if (this.state.answers[idA].answer.length > 20) {
                            currentAnswer =
                                this.state.answers[idA].answer.substring(
                                    0,
                                    15,
                                ) + " ...";
                        } else {
                            currentAnswer = this.state.answers[idA].answer;
                        }
                    } else {
                        currentAnswer = JSON.stringify(
                            this.state.answers[idA].answer,
                        );
                    }
                }
            }
            return (
                <TouchableHighlight
                    key={item.id}
                    onPress={() =>
                        this.props.navigation.navigate(item.type, item)
                    }>
                    <View style={styles.buttonQuestion}>
                        <Text style={styles.textButton}>
                            {item.question.toUpperCase()}
                        </Text>
                        <Text style={styles.textButton}>{currentAnswer}</Text>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
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
                    onPress={() =>
                        ImagePicker.launchCamera(null, response => {
                            if (
                                response.didCancel ||
                                response.error ||
                                response.customButton
                            ) {
                            } else {
                                const source = response.uri;
                                this.setState({picture: source});
                            }
                        })
                    }>
                    <Image
                        source={require("./ui/camera.png")}
                        style={{flex: 0.9, aspectRatio: 1}}
                    />
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        if (this.state.showText === 0) {
                            this.setState({showText: 1});
                        } else {
                            this.setState({showText: 0});
                        }
                    }}>
                    <Image
                        source={require("./ui/memo.png")}
                        style={{flex: 0.9, aspectRatio: 1}}
                    />
                </TouchableHighlight>
            </View>
        );
    };

    render() {
        if (this.state.showText) {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.background}>
                        <ScrollView style={{flex: 0.9}}>
                            <TextInput
                                style={{
                                    height: 350,
                                    borderColor: "black",
                                    borderWidth: 1,
                                    backgroundColor: "#f5f5f5",
                                    alignItems: "flex-start",
                                    textAlignVertical: "top",
                                }}
                                onChangeText={text =>
                                    this.setState({text: text})
                                }
                                multiline={true}
                            />
                        </ScrollView>
                        {this.getFooter()}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.background}>
                        <ScrollView style={{flex: 0.9}}>
                            {this.state.research.questions.map((item, index) =>
                                this.createQuestionButton(item, index),
                            )}
                        </ScrollView>
                        {this.getFooter()}
                    </View>
                </View>
            );
        }
    }
}

export default Questions;
