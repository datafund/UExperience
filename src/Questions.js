import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    ScrollView,
    Image,
    TextInput,
} from "react-native";
import moment from "moment";
import ImagePicker from "react-native-image-picker";

import styles from "./Styles.js";
import {getDataFromStorage, setDataToStorage} from "./functions/data.js";

class Questions extends Component {
    componentDidMount = async () => {
        this.subs = [
            this.props.navigation.addListener("didFocus", () => {
                this.componentDidFocus();
            }),
        ];
        const password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });

        let questions = await getDataFromStorage("questions", password);

        questions = questions ? JSON.parse(questions) : [];
        this.setState({questions: questions});

        this.setState({
            time: moment()
                .utcOffset("+02")
                .format("YYYY-MM-DD-HH-mm-ss"),
        });
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
    };

    componentDidFocus = async () => {
        let newAnswer = await getDataFromStorage("answer", this.state.password);
        if (!(newAnswer === null || newAnswer === [])) {
            newAnswer = JSON.parse(newAnswer);
            this.state.answers.push(newAnswer);
            await setDataToStorage(
                "answer",
                this.state.password,
                JSON.stringify([]),
            );
        }
    };

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
        this.saveBeep();
    }

    state = {
        answers: [],
        time: "",
        questions: [],
        password: "",
        picture: "",
        primaryDescriptive: true,
        text: "",
        showText: 1,
    };

    saveBeep = async () => {
        if (!(this.state.answers.length === 0)) {
            let newBeep = {
                time: this.state.time,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                picture: this.state.picture,
                experience: this.state.experience,
                questions: this.state.answers.filter(x => x),
            };
            let beeps = await getDataFromStorage("beeps", this.state.password);
            let b = beeps ? JSON.parse(beeps) : [];
            b.push(newBeep);
            await setDataToStorage("beeps", this.state.password, b);
        }
        await setDataToStorage("answers", "", "");
    };

    createQuestionButton = (item, index) => {
        if (item.current === 1) {
            item["password"] = this.state.password;
            return (
                <TouchableHighlight
                    key={item.id}
                    onPress={() =>
                        this.props.navigation.navigate(item.type, item)
                    }>
                    <View>
                        <Text style={styles.button}>{item.name}</Text>
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
                    height: 50,
                    backgroundColor: "black",
                }}>
                <TouchableHighlight
                    style={{
                        position: "absolute",
                        alignSelf: "flex-start",
                        top: 0,
                    }}
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
                        style={{height: 40, width: 40}}
                    />
                </TouchableHighlight>

                <TouchableHighlight
                    style={{
                        position: "absolute",
                        alignSelf: "center",
                        top: 0,
                    }}
                    onPress={() => {
                        this.saveBeep();
                        this.props.navigation.goBack();
                    }}>
                    <Image
                        source={require("./ui/save.png")}
                        style={{height: 40, width: 40}}
                    />
                </TouchableHighlight>

                {this.state.primaryDescriptive ? (
                    <TouchableHighlight
                        style={{
                            position: "absolute",
                            alignSelf: "flex-end",
                            top: 0,
                        }}
                        onPress={() => {
                            if (this.state.showText === 0) {
                                this.setState({showText: 1});
                            } else {
                                this.setState({showText: 0});
                            }
                        }}>
                        <Image
                            source={require("./ui/memo.png")}
                            style={{height: 40, width: 40}}
                        />
                    </TouchableHighlight>
                ) : null}
            </View>
        );
    };

    render() {
        if (this.state.showText) {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        {this.state.primaryDescriptive ? (
                            <TextInput
                                style={{
                                    height: 400,
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
                        ) : null}
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        } else {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        {this.state.questions.map((item, index) =>
                            this.createQuestionButton(item, index),
                        )}
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        }
    }
}

export default Questions;
