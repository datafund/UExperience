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

export default class ResearchSwitch extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
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
        this.setState({researchPlans: oldResearchPlans});
    };

    state = {
        password: "",
        researchPlans: [],
    };

    render() {
        return (
            <View style={styles.background}>
                <ScrollView>
                    <FlatList
                        data={this.state.researchPlans}
                        renderItem={({item}) => (
                            <TouchableHighlight
                                style={styles.button}
                                onPress={() => {
                                    newResearch(item, this.state.password);
                                    this.props.navigation.goBack();
                                }}>
                                <Text style={styles.textButton}>
                                    {item.name}
                                </Text>
                            </TouchableHighlight>
                        )}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                </ScrollView>
            </View>
        );
    }
}
