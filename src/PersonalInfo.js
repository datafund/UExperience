import React, {Component} from "react";
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
    Picker,
    TextInput,
    ScrollView,
    Image,
    Switch,
    Platform,
    TouchableOpacity,
    DatePickerAndroid,
} from "react-native";

import styles from "./Styles.js";
import {getDataFromStorage, setDataToStorage} from "./functions/data.js";

export default class PersonalInfo extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({
            password: password,
        });
        let personalInfo = await getDataFromStorage("personal", password);
        this.setState({
            email: personalInfo.email,
            time: personalInfo.time,
            passwordHash: personalInfo.passwordHash,
            //days: personalInfo.days,
        });
    };

    componentWillUnmount = async () => {
        let personalInfo = {
            email: this.state.email,
            time: this.state.time,
            passwordHash: this.state.passwordHash,
        };
        await setDataToStorage("personal", this.state.password, personalInfo);
    };

    state = {
        email: "",
        passwordHash: "",
        time: "",
        days: ["2018-01-10", "2018-01-11", "2018-01-12", "2018-01-13"],
    };

    showAndroidDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.selectedValue,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day, 0, 0, 0, 0);
                this.setState({konec: date});
            }
        } catch ({code, message}) {
            console.warn("Cannot open date picker", message);
        }
    };

    datePickerBasedOnOS = platform => {
        if (platform === "ios") {
            return (
                <View>
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                        mode={date}
                    />
                </View>
            );
        } else if (platform === "android") {
            return (
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.showAndroidDatePicker()}>
                        <Text>Izberi datum</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Dodaj datum v ISO obliki (YYYY-MM-DD)</Text>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "black",
                            borderWidth: 1,
                        }}
                        onChangeText={text => this.setState({endDate: text})}
                    />
                </View>
            );
        }
    };

    render() {
        return (
            <View style={styles.background}>
                <ScrollView>
                    <Text>Email: </Text>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "black",
                            borderWidth: 1,
                            backgroundColor: "white",
                        }}
                        defaultValue={this.state.email}
                        onChangeText={text => this.setState({email: text})}
                    />
                    <Text>Časi za beep-e:</Text>
                    <Text>
                        (Napiši čas v vojaškem načinu. Če želiš, da te beep-i
                        motijo samo med službo, torej med 8. in 16., potem
                        napiši 0800-1600)
                    </Text>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "black",
                            borderWidth: 1,
                            backgroundColor: "white",
                        }}
                        defaultValue={this.state.time}
                        onChangeText={text => this.setState({time: text})}
                    />
                    <Text>Kateri so primerni dnevi za raziskovanje:</Text>
                    <Text>Trenutni Datumi:</Text>
                    {this.state.days.map((item, index) => (
                        <View key={index} style={{flexDirection: "row"}}>
                            <Text>{item}</Text>
                            <Switch value={true} />
                        </View>
                    ))}

                    <Text>Dodaj nov datum:</Text>
                    {this.datePickerBasedOnOS(Platform.OS)}
                </ScrollView>
            </View>
        );
    }
}
