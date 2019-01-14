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
        personalInfo = personalInfo ? JSON.parse(personalInfo) : {};
        this.setState({
            email: personalInfo.email,
            time: personalInfo.time,
            passwordHash: personalInfo.passwordHash,
            emailPassword: personalInfo.emailPassword,
        });
        if (personalInfo.days) {
            this.setState({days: personalInfo.days});
        } else {
            this.setState({days: []});
        }
    };

    componentWillUnmount = async () => {
        let personalInfo = {
            email: this.state.email,
            time: this.state.time,
            passwordHash: this.state.passwordHash,
            days: this.state.days,
            emailPassword: this.state.emailPassword,
        };
        await setDataToStorage("personal", this.state.password, personalInfo);
    };

    state = {
        email: "",
        passwordHash: "",
        time: "",
        days: [],
        currentDay: new Date(),
        emailPassword: "",
    };

    showAndroidDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.selectedValue,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let newDate = new Date(year, month, day, 3, 30, 0, 0);
                this.addNewDate(newDate);
            }
        } catch ({code, message}) {
            console.warn("Cannot open date picker", message);
        }
    };

    addNewDate = date => {
        let newDate = date.toISOString().split("T")[0];
        let dates = this.state.days;
        dates.push(newDate);
        this.setState({days: dates});
    };

    datePickerBasedOnOS = platform => {
        if (platform === "ios") {
            return (
                <View>
                    <DatePickerIOS
                        date={this.state.currentDate}
                        onDateChange={this.addNewDate}
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
                        onChangeText={text => this.addNewDate(text)}
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
                    <Text>
                        Geslo za enkripcijo varnostne kopije, ki si jo lahko
                        pošlješ po emailu. Če pustiš prazno, potem datoteka ne
                        bo enkriptana.
                    </Text>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "black",
                            borderWidth: 1,
                            backgroundColor: "white",
                        }}
                        defaultValue={this.state.emailPassword}
                        onChangeText={text =>
                            this.setState({emailPassword: text})
                        }
                    />
                    <Text>Kateri so primerni dnevi za raziskovanje:</Text>
                    <Text>Trenutni Datumi:</Text>
                    {this.state.days.map((item, index) => (
                        <View key={index} style={{flexDirection: "row"}}>
                            <Text>{item}</Text>
                            <Switch
                                value={true}
                                onValueChange={() => {
                                    let currentDays = this.state.days;
                                    currentDays.splice(index, 1);
                                    this.setState({days: currentDays});
                                }}
                            />
                        </View>
                    ))}

                    <Text>Dodaj nov datum:</Text>
                    {this.datePickerBasedOnOS(Platform.OS)}
                </ScrollView>
            </View>
        );
    }
}
