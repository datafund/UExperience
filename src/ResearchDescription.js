import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    TextInput,
    ScrollView,
    FlatList,
    Image,
    Switch,
} from "react-native";

import styles from "./Styles.js";
import {setDataToStorage, getDataFromStorage} from "./functions/data.js";

export default class ResearchDescription extends Component {
    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        this.setState({
            research: this.props.navigation.getParam("research", {}),
        });
    }

    state = {research: {share: false}, inputedPassword: ""};

    render() {
        return (
            <View style={styles.background}>
                {this.state.research.id ? (
                    <Text>ID: {this.state.research.id}</Text>
                ) : null}
                {this.state.research.name ? (
                    <Text>Raziskava: {this.state.research.name}</Text>
                ) : null}
                {this.state.research.description ? (
                    <Text>Opis: {this.state.research.description}</Text>
                ) : null}
                {this.state.research.researcher ? (
                    <Text>Raziskovalec: {this.state.research.researcher}</Text>
                ) : null}
                {this.state.research.name ? (
                    <Text>
                        Elektronska pošta raziskovalca:{" "}
                        {this.state.research.email}
                    </Text>
                ) : null}
                {this.state.research.start ? (
                    <Text>Začetek raziskave: {this.state.research.start}</Text>
                ) : null}
                {this.state.research.end ? (
                    <Text>Konec raziskave: {this.state.research.end}</Text>
                ) : null}
                {this.state.research.dailyBeeps ? (
                    <Text>
                        Število dnevnih beepov: {this.state.research.dailyBeeps}
                    </Text>
                ) : null}
                <View style={{flexDirection: "row"}}>
                    <Text>Svoje podatke želim deliti z raziskovalcem</Text>
                    <Switch
                        style={{
                            position: "absolute",
                            right: 0,
                            alignSelf: "flex-end",
                        }}
                        value={this.state.research.share}
                        onValueChange={() => {
                            let researchPlan = this.state.research;
                            researchPlan.share = !researchPlan.share;
                            this.setState({research: researchPlan});
                        }}
                    />
                </View>
                {this.state.research.share ? (
                    <View>
                        <Text>
                            Če želiš, da se podatki pred pošiljanjem kriptirajo,
                            potem prosim vnesi geslo, ki bo potrebno, da se
                            vidijo vaši podatki. Ne pozabite tega gesla deliti z
                            raziskovalcem.
                        </Text>
                        <TextInput
                            style={{
                                height: 50,
                                borderColor: "black",
                                borderWidth: 1,
                                backgroundColor: "white",
                            }}
                            onChangeText={text =>
                                this.setState({inputedPassword: text})
                            }
                        />
                    </View>
                ) : null}

                <TouchableHighlight
                    style={styles.button}
                    onPress={async () => {
                        let researchPlan = this.state.research;
                        researchPlan.password = this.state.inputedPassword;
                        let oldResearchPlans = await getDataFromStorage(
                            "oldResearchPlans",
                            this.state.password,
                        );
                        let currentResearchPlan = await getDataFromStorage(
                            "research",
                            this.state.password,
                        );
                        oldResearchPlans = oldResearchPlans
                            ? JSON.parse(oldResearchPlans)
                            : [];
                        currentResearchPlan = currentResearchPlan
                            ? JSON.parse(currentResearchPlan)
                            : {};
                        oldResearchPlans.push(currentResearchPlan);
                        setDataToStorage(
                            "research",
                            this.state.password,
                            researchPlan,
                        );
                        setDataToStorage(
                            "oldResearchPlans",
                            this.state.password,
                            oldResearchPlans,
                        );
                        this.props.navigation.goBack();
                    }}>
                    <Text>Želim sodelovati v tej raziskavi</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Text>Ne želim sodelovati v tej raziskavi</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
