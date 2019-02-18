import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    Alert,
    AsyncStorage,
} from "react-native";

import PushNotification from "react-native-push-notification";

import styles from "./Styles.js";
import {
    createNewProfile,
    exportAllData,
    sendEmailToResearcher,
    getDataFromStorage,
} from "./functions/data.js";

class Settings extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        let research = await getDataFromStorage("research", password);
        research = research ? JSON.parse(research) : [];
        let share = research.share;
        this.setState({share: share});
        this.setState({research: research});
        let personal = await getDataFromStorage("personal", password);
        personal = personal ? JSON.parse(personal) : {};
        this.setState({personal: personal});
    };

    state = {
        questions: [],
        share: true,
        research: {},
        keys: "",
    };

    deleteProfileAlert = password => {
        Alert.alert(
            "TO BO IZBRISALO VSE VAŠE PODATKE IZ TELEFONA",
            "Če se kasneje premislite, in želite katere vaše podatke, jih ne bo več na telefonu. Podatke, ki jih nistve izvozili ali poslali raziskovalcem bodo izgubljeni za vedno. Ali ste prepričani, da želite izbrisati svoje podatke:",
            [
                {
                    text: "Ne izbriši",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Izbriši",
                    onPress: () => {
                        PushNotification.cancelAllLocalNotifications();
                        AsyncStorage.clear();
                    },
                },
                {onDismiss: () => {}},
            ],
        );
    };

    render() {
        return (
            <View style={styles.background}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("PersonalInfo", {
                            password: this.state.password,
                        })
                    }>
                    <Text style={styles.textButton}>
                        Spremeni osebne podatke
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        this.props.navigation.navigate("ResearchChoice", {
                            password: this.state.password,
                        })
                    }>
                    <Text style={styles.textButton}>
                        Izberi Raziskovalni Načrt
                    </Text>
                </TouchableHighlight>
                {!this.state.share ? (
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() =>
                            this.props.navigation.navigate("ResearchModify", {
                                password: this.state.password,
                            })
                        }>
                        <Text style={styles.textButton}>
                            Spremeni Raziskovalni Načrt
                        </Text>
                    </TouchableHighlight>
                ) : (
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() =>
                            sendEmailToResearcher(
                                this.state.password,
                                this.state.research.password,
                            )
                        }>
                        <Text style={styles.textButton}>
                            Pošlji beepe raziskovalcu
                        </Text>
                    </TouchableHighlight>
                )}
                <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                        exportAllData(
                            this.state.password,
                            this.state.personal.emailPassword,
                        )
                    }>
                    <Text style={styles.textButton}>
                        Izvozi vse svoje podatke
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.deleteProfileAlert()}>
                    <Text style={styles.textButton}>Izbriši vse podatke</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Settings;
