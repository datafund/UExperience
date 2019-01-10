import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    TextInput,
    ScrollView,
    FlatList,
    Image,
} from "react-native";

import styles from "./Styles.js";
import {setDataToStorage} from "./functions/data.js";

export default class ResearchChoice extends Component {
    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
    }

    state = {
        success: "You did not try it yet",
        url: "",
        password: "",
        researchFromApi: true,
        researchPlans: [
            {
                id: 1,
                name: "Raziskovanje Spolnih Fantazij",
                description:
                    "Ta raziskava te prosi da raziskuješ svoje doživljanje spolnih fantazij",
                organization: "Univerza v Ljubljani",
                days: 10,
                start: "2019-01-08",
                end: "2019-05-31",
                privacy: "",
                researcher: "Katja",
                email: "Katja@example.com",
                subjectId: null,
                share: false,
                beeps: {
                    aditionalCriteria: true,
                    importantMomentsOnly: false,
                    dailyBeeps: 20,
                },
                audio: false,
                place: false,
                picture: false,
                descriptive: true,
                questions: [
                    {
                        id: 1,
                        question: "S kom si?",
                        context: true,
                        type: "Tags",
                        current: 1,
                    },
                    {
                        id: 2,
                        question: "Kakšen je tvoj nivo vzburjenosti?",
                        context: false,
                        type: "Slider",
                        current: 1,
                    },
                ],
            },
            {
                id: 2,
                name: "Raziskovanje Stresa",
                description:
                    "Ta raziskava raziskuje povezavo med stresom in različnimi dejavnostmi",
                organization: "None",
                days: 30,
                start: "2019-01-08",
                end: "2019-12-31",
                privacy: "",
                researcher: "Sara Jakša",
                email: "sarajaksa@sarajaksa.eu",
                subjectId: null,
                share: false,
                beeps: {
                    aditionalCriteria: true,
                    importantMomentsOnly: false,
                    dailyBeeps: 3,
                },
                audio: false,
                place: false,
                picture: false,
                descriptive: true,
                questions: [
                    {
                        id: 1,
                        question: "Kaj trenutno počneš?",
                        context: true,
                        type: "Tags",
                        current: 1,
                    },
                    {
                        id: 2,
                        question: "Koliko stresa doživljaš?",
                        context: false,
                        type: "Slider",
                        current: 1,
                    },
                ],
            },
        ],
    };

    getQuestions = async url => {
        try {
            var questions = await fetch(url);
        } catch (err) {
            this.setState({
                success:
                    "Something went wrong. Is the internet connection working?",
            });
            return;
        }
        questions = questions._bodyInit;
        try {
            questions = JSON.parse(questions);
        } catch {
            this.setState({
                success: "Something went wrong. Is you put in the right url?",
            });
            return;
        }
        await setDataToStorage("research", this.state.password, questions);
        this.setState({success: "No problems"});
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
                        alignSelf: "flex-end",
                        top: 0,
                    }}
                    onPress={() => {
                        if (this.state.researchFromApi === true) {
                            this.setState({researchFromApi: false});
                        } else {
                            this.setState({researchFromApi: true});
                        }
                    }}>
                    <Image
                        source={require("./ui/world.png")}
                        style={{height: 40, width: 40}}
                    />
                </TouchableHighlight>
            </View>
        );
    };

    render() {
        if (this.state.researchFromApi === true) {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        <FlatList
                            data={this.state.researchPlans}
                            renderItem={({item}) => (
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "ResearchDescription",
                                            {
                                                research: item,
                                                password: this.state.password,
                                            },
                                        )
                                    }>
                                    <Text>{item.name}</Text>
                                </TouchableHighlight>
                            )}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        } else {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        <Text>
                            Če želiš uporabiti drug raziskovalni načrt, potem si
                            ga lahko naložiš iz interneta. Raziskovalni načrt
                            mora biti v skladu z podatkovno strukturo, ki jo
                            uporablja program. Le ta je napisana v
                            dokumentaciji.
                        </Text>
                        <TextInput
                            style={{
                                height: 50,
                                borderColor: "black",
                                borderWidth: 1,
                            }}
                            onChangeText={text => this.setState({url: text})}
                        />
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.getQuestions(this.state.url)}>
                            <Text>Get Questions</Text>
                        </TouchableHighlight>
                        <Text>{JSON.stringify(this.state.success)}</Text>
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        }
    }
}
