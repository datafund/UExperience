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
import {setDataToStorage, getDataFromStorage} from "./functions/data.js";
import {newResearch} from "./functions/notifications.js";

export default class ResearchChoice extends Component {
    componentDidMount = async () => {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        try {
            var researchPlans = await fetch(
                "https://testing.sarajaksa.eu/all_research_projects.json",
            );
        } catch (err) {
            this.setState({
                success:
                    "Something went wrong. Is the internet connection working?",
            });
            return;
        }
        researchPlans = researchPlans._bodyInit;
        try {
            researchPlans = JSON.parse(researchPlans);
        } catch {
            this.setState({
                success: "Something went wrong. Is you put in the right url?",
            });
            return;
        }
        this.setState({researchPlans: researchPlans});
    };

    state = {
        success: "You did not try it yet",
        url: "",
        password: "",
        researchFromApi: true,
        researchPlans: [],
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
        await newResearch(questions, this.state.password);
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
