import React from "react";
import {Platform} from "react-native";
import PushNotification from "react-native-push-notification";

import {getDataFromStorage, setDataToStorage} from "./data.js";

export const createNotification = (date = new Date()) => {
    let id = date.getTime();
    PushNotification.localNotificationSchedule({
        id: id,
        date: date,
        title: "Nov bip",
        message: "Prosim shrani si nov bip",
        sound: "default",
    });
    return {
        id: id,
        date: date.toISOString(),
    };
};

export const degreesToRadians = degrees => {
    return (degrees * Math.PI) / 180;
};

export const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
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

export const createNotificationBasedOnLocation = (
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
            this.createNotification();
        }
    }
};

export const locationNotifications = (langitude, longitude, notifications) => {
    let watchId = navigator.geolocation.watchPosition(
        position => {
            this.createNotificationBasedOnLocation(
                langitude,
                longitude,
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
    notifications["place"] = watchId;
    return notifications;
};

export const deleteLocationNotifications = id => {
    id = Number(id);
    navigator.geolocation.clearWatch(id);
    navigator.geolocation.stopObserving();
};

export const deleteTimeNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
};

export const deleteAllNotifications = async (password, notifications) => {
    if (!(notifications.place === "")) {
        deleteLocationNotifications(notifications.id);
    }
    deleteTimeNotifications();
};

/*export const createNotificationsBasedOnTime = (
    days,
    number,
    avalableIntervals,
) => {
    let currentDate = new Date();
    for (i = 0; i < days; i++) {
        let newDate = new Date();
        newDate.setDate(currentDate.getDate() + i);
        createDailyNotificationsBasedOnTime(number, newDate, avalableIntervals);
    }
};*/

export const createDailyNotificationsBasedOnTime = (
    number,
    day,
    avalableIntervals,
    notifications,
) => {
    //avalableIntervals = avalableIntervals.split(",");
    times = avalableIntervals[interval].split("-");
    notifications["time"] = [];
    /*let min = new Date(day.getTime());
    min = min.setHours(
        times[0].substring(0, 2),
        times[0].substring(2, 4),
        0,
        0,
    );
    let max = new Date(day.getTime());
    max = max.setHours(
        times[1].substring(0, 2),
        times[1].substring(2, 4),
        0,
        0,
    );
    for (i = 0; i < number; i++) {
        let time = Math.floor(Math.random() * (max - min + 1)) + min;
        date = new Date(time);
        let notification = createNotification(date);
        notifications.time.push(notification);*/
    /*let date = null;
        while (date === null) {
            let time = Math.floor(Math.random() * (max - min + 1)) + min;
            //time = new Date(time);
            for (interval in avalableIntervals) {
                let intervalMin = new Date(day.getTime());
                intervalMin = intervalMin.setHours(
                    times[0].substring(0, 2),
                    times[0].substring(2, 4),
                    0,
                    0,
                );
                let intervalMax = new Date(day.getTime());
                intervalMax = intervalMax.setHours(
                    times[1].substring(0, 2),
                    times[1].substring(2, 4),
                    0,
                    0,
                );
                if (time > intervalMin && time < intervalMax) {
                    date = new Date(time);
                    let notification = createNotification(date);
                    notifications.time.push(notification);
                }
            }
        }*/

    return notifications;
};

export const getNotificationsForThisResearchProject = (
    research,
    avalableIntervals,
) => {
    let notifications = {};
    if (research.beeps.importantMomentsOnly === true) {
        return notifications;
    }
    if (research.beeps.dailyBeeps > 0) {
        notifications["time"] = [];
        /*let currentDate = new Date();
        for (i = 0; i < research.days; i++) {
            let newDate = new Date();
            newDate.setDate(currentDate.getDate() + i);
            notifications = createDailyNotificationsBasedOnTime(
                research.beeps.dailyBeeps,
                newDate,
                avalableIntervals,
                notifications,
            );

        }*/
        let notification = createNotification();
        notifications.time.push(notification);
    }

    /*if (research.place === true) {
        notifications = locationNotifications(
            research.beeps.location[0],
            research.beeps.location[1],
            notifications,
        );
    }*/
    return notifications;
};
