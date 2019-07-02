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
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        try {
            var researchPlans = await fetch(
                    "https://testing.sarajaksa.eu/all_research_projects.json",
                ),
                researchPlans = researchPlans._bodyInit,
                researchPlans = JSON.parse(researchPlans);
        } catch (err) {
            researchPlans = [];
        }
        let currentResearchPlan = await getDataFromStorage(
            "research",
            password,
        );
        let oldResearchPlans = await getDataFromStorage(
            "oldResearchPlans",
            password,
        );
        currentResearchPlan = JSON.parse(currentResearchPlan);
        oldResearchPlans = JSON.parse(oldResearchPlans);
        oldResearchPlans.push(currentResearchPlan);
        this.setState({existingResearchPlans: oldResearchPlans});
        this.setState({researchPlans: researchPlans});
    };

    state = {
        success: "Nisi še poskusil",
        url: "",
        password: "",
        currentScreen: "api",
        researchPlans: [],
        existingResearchPlans: [],
        updatePlans: [],
    };

    getQuestions = async url => {
        try {
            var questions = await fetch(url);
        } catch (err) {
            this.setState({
                success:
                    "Nekaj je šlo narobe. Ali je kaj narobe z internetno povezavo?",
            });
            return;
        }
        questions = questions._bodyInit;
        try {
            questions = JSON.parse(questions);
        } catch {
            this.setState({
                success:
                    "Nekaj je šlo narobe. Ali je bil notri dan pravilen URL?",
            });
            return;
        }
        await newResearch(questions, this.state.password);
        this.setState({success: "Ni bilo zaznanih problemov"});
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
                    onPress={() => {
                        this.setState({currentScreen: "api"});
                    }}>
                    <Image
                        source={require("./ui/list.png")}
                        style={{flex: 0.9, aspectRatio: 1}}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({currentScreen: "internet"});
                    }}>
                    <Image
                        source={require("./ui/world.png")}
                        style={{flex: 0.9, aspectRatio: 1}}
                    />
                </TouchableHighlight>
            </View>
        );
    };

    render() {
        if (this.state.currentScreen === "api") {
            return (
                <View style={styles.background}>
                    <ScrollView
                        style={{
                            flex: 1,
                        }}>
                        <FlatList
                            data={this.state.updatePlans}
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
                                    <Text style={styles.textButton}>
                                        {item.name} (Nova verzija)
                                    </Text>
                                </TouchableHighlight>
                            )}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
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
                                    <Text style={styles.textButton}>
                                        {item.name} (Internet)
                                    </Text>
                                </TouchableHighlight>
                            )}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                        <FlatList
                            data={this.state.existingResearchPlans}
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
                                    <Text style={styles.textButton}>
                                        {item.name} (Shranjen)
                                    </Text>
                                </TouchableHighlight>
                            )}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        } else if ((this.state.currentScreen = "internet")) {
            return (
                <View style={styles.background}>
                    <ScrollView
                        style={{
                            flex: 1,
                        }}>
                        <Text style={styles.textButton}>
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
                                backgroundColor: "white",
                            }}
                            onChangeText={text => this.setState({url: text})}
                        />
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.getQuestions(this.state.url)}>
                            <Text style={styles.textButton}>
                                Pridobi raziskovalni načrt
                            </Text>
                        </TouchableHighlight>
                        <Text style={styles.textButton}>
                            {this.state.success}
                        </Text>
                    </ScrollView>
                    {this.getFooter()}
                </View>
            );
        }
    }
}
