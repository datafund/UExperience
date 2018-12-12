import React, {Component} from "react";
import {
    Text,
    View,
    Slider,
    TextInput,
    Platform,
    DatePickerIOS,
    DatePickerAndroid,
    TimePickerAndroid,
    TouchableOpacity,
    PushNotificationIOS,
} from "react-native";
import PushNotification from "react-native-push-notification";

import styles from "./Styles.js";

class Notification extends Component {
    static navigationOptions = {
        title: "Notifikacije",
    };

    showAndroidDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.selectedValue,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(
                    year,
                    month,
                    day,
                    this.state.konec.getHours(),
                    this.state.konec.getMinutes(),
                    0,
                    0,
                );
                this.setState({konec: date});
            }
        } catch ({code, message}) {
            console.warn("Cannot open date picker", message);
        }
    };

    showAndroidTimePicker = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                let time = new Date(
                    this.state.konec.getFullYear(),
                    this.state.konec.getMonth(),
                    this.state.konec.getDate(),
                    hour,
                    minute,
                    0,
                    0,
                );
                this.setState({
                    konec: time,
                });
            }
        } catch ({code, message}) {
            console.warn("Cannot open time picker", message);
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            konec: new Date(),
            numberOfNotifications: 0,
            currentTimes: [],
        };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({konec: newDate.toLocalDateString()});
    }

    createNotifications = (number, time, platform) => {
        const currentDate = new Date();
        max = time.getTime();
        min = currentDate.getTime();
        for (i = 0; i < number; i++) {
            let time = Math.floor(Math.random() * (max - min + 1)) + min;
            let date = new Date(time);
            if (platform === "ios") {
                PushNotificationIOS.scheduleLocalNotification({
                    fireDate: date,
                    alertBody: "Prosim shrani si novi bip",
                    alertTitle: "Nov bip",
                    silent: false,
                });
            } else if (platform === "android") {
                PushNotification.localNotificationSchedule({
                    date: date,
                    title: "Nov bip",
                    message: "Prosim shrani si nov bip",
                    sound: "default",
                });
            }
        }
    };

    datePickerBasedOnOS = platform => {
        if (platform === "ios") {
            return (
                <View>
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                        mode={datetime}
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.showAndroidTimePicker()}>
                        <Text>Izberi uro</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({endDate: text})}
                />
            );
        }
    };

    render() {
        return (
            <View>
                <Text>
                    Tukaj lahko določite, koliko notifikacij se vam bo pokazalo
                    v kolikšnem obdobju. Najprej na sliderju določite, koliko
                    notifikacij želite, da se vam pokaže v tem obdobju.
                </Text>
                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    value={0}
                    onValueChange={val =>
                        this.setState({numberOfNotifications: val})
                    }
                />
                <Text>
                    Nato določeti, kdaj želite, da se vam notifikacije končajo
                    prikazovati:
                </Text>
                {this.datePickerBasedOnOS(Platform.OS)}
                <Text>
                    Prejeli boste {this.state.numberOfNotifications}{" "}
                    notifikacij. Ki se bodo končale{" "}
                    {this.state.konec.toString()}.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        this.createNotifications(
                            this.state.numberOfNotifications,
                            this.state.konec,
                            Platform.OS,
                        )
                    }>
                    <Text>Ustvari Notifikacije</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        PushNotification.localNotification({
                            title: "Nov bip",
                            message: "Prosim shrani si nov bip",
                            sound: "default",
                        })
                    }>
                    <Text>Pokaži notifikacijo</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Notification;
