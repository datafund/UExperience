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
import {newResearch} from "./functions/notifications.js";

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
                    <Text style={styles.textButton}>
                        ID: {this.state.research.id}
                    </Text>
                ) : null}
                {this.state.research.name ? (
                    <Text style={styles.textButton}>
                        Raziskava: {this.state.research.name}
                    </Text>
                ) : null}
                {this.state.research.description ? (
                    <Text style={styles.textButton}>
                        Opis: {this.state.research.description}
                    </Text>
                ) : null}
                {this.state.research.researcher ? (
                    <Text style={styles.textButton}>
                        Raziskovalec: {this.state.research.researcher}
                    </Text>
                ) : null}
                {this.state.research.name ? (
                    <Text style={styles.textButton}>
                        Elektronska pošta raziskovalca:{" "}
                        {this.state.research.email}
                    </Text>
                ) : null}
                {this.state.research.start ? (
                    <Text style={styles.textButton}>
                        Začetek raziskave: {this.state.research.start}
                    </Text>
                ) : null}
                {this.state.research.end ? (
                    <Text style={styles.textButton}>
                        Konec raziskave: {this.state.research.end}
                    </Text>
                ) : null}
                {this.state.research.dailyBeeps ? (
                    <Text style={styles.textButton}>
                        Število dnevnih beepov: {this.state.research.dailyBeeps}
                    </Text>
                ) : null}
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.textButton}>
                        Svoje podatke želim deliti z raziskovalcem
                    </Text>
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
                        <Text style={styles.textButton}>
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
                        await newResearch(researchPlan, this.state.password);
                        this.props.navigation.goBack();
                    }}>
                    <Text style={styles.textButton}>
                        Želim sodelovati v tej raziskavi
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Text style={styles.textButton}>
                        Ne želim sodelovati v tej raziskavi
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
