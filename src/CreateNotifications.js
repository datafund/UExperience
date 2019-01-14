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
import {getDataFromStorage, setDataToStorage} from "./functions/data.js";
import {
    createNotification,
    createNotificationsInOneDay,
    modificationOfIntervals,
    createNotificationsForResearch,
    locationNotifications,
} from "./functions/notifications.js";

class Notification extends Component {
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
            test: {},
        };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({konec: newDate.toLocalDateString()});
    }

    degreesToRadians = degrees => {
        return (degrees * Math.PI) / 180;
    };

    distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
        var earthRadiusKm = 6371;

        var dLat = this.degreesToRadians(lat2 - lat1);
        var dLon = this.degreesToRadians(lon2 - lon1);

        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);

        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
                Math.sin(dLon / 2) *
                Math.cos(lat1) *
                Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    };

    createNotificationBasedOnLocation = (
        lan,
        log,
        currentPosition,
        maxDistance,
        propability,
    ) => {
        let currentDistance = this.distanceInKmBetweenEarthCoordinates(
            lan,
            log,
            currentPosition.latitude,
            currentPosition.longitude,
        );
        if (currentDistance < maxDistance) {
            if (Math.random() < propability) {
                this.createNotification(Platform.OS);
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
            <View style={styles.background}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        let notifications = createNotificationsForResearch(
                            2,
                            2,
                            modificationOfIntervals(
                                "0800-1200,1300-1500,1800-2100",
                            ),
                            new Date(2020, 9, 13, 0, 0, 0, 0),
                        );
                        this.setState({test: notifications});
                    }}>
                    <Text>Ustvari Notifikacije</Text>
                </TouchableOpacity>
                <Text>{JSON.stringify(this.state.test)}</Text>
                <Text>Latitude</Text>
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({lan: text})}
                />
                <Text>Longitude</Text>
                <TextInput
                    style={{height: 50, borderColor: "black", borderWidth: 1}}
                    onChangeText={text => this.setState({log: text})}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        /*let watchId = navigator.geolocation.watchPosition(
                            position => {
                                this.createNotificationBasedOnLocation(
                                    this.state.lan,
                                    this.state.log,
                                    position,
                                    0.2,
                                    0.5,
                                );
                            },
                            error => error,
                            {
                                maximumAge: 60000,
                                distanceFilter: 0,
                            },
                        );
                        await setDataToStorage(
                            "positionID",
                            this.state.password,
                            watchId,
                        );*/
                        let id = locationNotifications(
                            this.state.lan,
                            this.state.log,
                        );
                        this.setState({test: id});
                    }}>
                    <Text>Notifikacije glede na pozicijo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        let watchId = await getDataFromStorage("positionID");
                        watchId = Number(watchId);
                        navigator.geolocation.clearWatch(watchId);
                        navigator.geolocation.stopObserving();
                    }}>
                    <Text>Ustavi notifikacije glede na pozicijo</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Notification;
