import React from "react";
import PushNotification from "react-native-push-notification";

import {getDataFromStorage, setDataToStorage} from "./data.js";

// Time based notifications

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
        date: date.toISOString().split("T")[0],
        time: date
            .toISOString()
            .split("T")[1]
            .split(".")[0],
    };
};

export const modificationOfIntervals = interval => {
    if (!(interval == "")) {
        let allIntervals = [];
        interval = interval.split(",");
        for (index in interval) {
            allIntervals.push(interval[index].split("-"));
        }
        return allIntervals;
    } else {
        return [["0000", "2400"]];
    }
};

export const createNotificationsOne = (day, avalableIntervals) => {
    max = new Date(day.getTime()).setHours(0, 0, 0, 0);
    min = new Date(day.getTime()).setHours(24, 0, 0, 0);
    current = new Date();
    let date = null;
    while (date === null) {
        let time = Math.floor(Math.random() * (max - min + 1)) + min;
        for (index in avalableIntervals) {
            let interval = avalableIntervals[index];
            let minInterval = new Date(day.getTime()).setHours(
                parseInt(interval[0].substring(0, 2)),
                interval[0].substring(2, 4),
                0,
                0,
            );
            let maxInterval = new Date(day.getTime()).setHours(
                parseInt(interval[1].substring(0, 2)),
                interval[1].substring(2, 4),
                0,
                0,
            );
            if (time > minInterval && time < maxInterval) {
                date = new Date(time);
                let notification = createNotification(date);
                return notification;
            }
        }
    }
};

export const createNotificationsForResearch = (
    numberPerDay,
    numberOfDays,
    avalableIntervals,
    startDate = new Date(),
) => {
    let notifications = [];
    for (i = 0; i < numberOfDays; i++) {
        let newDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + i,
        );
        for (j = 0; j < numberPerDay; j++) {
            notification = createNotificationsOne(newDate, avalableIntervals);
            notifications.push(notification);
        }
    }
    return notifications;
};

// Deleting Notifications

export const deleteLocationNotifications = id => {
    id = Number(id);
    navigator.geolocation.clearWatch(id);
    navigator.geolocation.stopObserving();
};

export const deleteTimeNotifications = notifications => {
    for (index in notifications.time) {
        PushNotification.cancelLocalNotifications({
            id: notifications.time[index].id,
        });
    }
    PushNotification.cancelAllLocalNotifications();
};

export const deleteAllNotifications = notifications => {
    if (!notifications.place) {
        deleteLocationNotifications(notifications.id);
    }
    deleteTimeNotifications(notifications);
};

// Location Notifications

const degreesToRadians = degrees => {
    return (degrees * Math.PI) / 180;
};

const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

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
    let currentDistance = distanceInKmBetweenEarthCoordinates(
        lan,
        log,
        currentPosition.latitude,
        currentPosition.longitude,
    );
    if (currentDistance < maxDistance) {
        if (Math.random() < propability) {
            createNotification();
        }
    }
};

export const locationNotifications = (langitude, longitude) => {
    let watchId = navigator.geolocation.watchPosition(
        position => {
            createNotificationBasedOnLocation(
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
    return watchId;
};

// Methods for manipulating the whole research

export const newResearch = async (researchPlan, password) => {
    let oldResearchPlans = await getDataFromStorage(
        "oldResearchPlans",
        password,
    );
    let currentResearchPlan = await getDataFromStorage("research", password);
    oldResearchPlans = oldResearchPlans ? JSON.parse(oldResearchPlans) : [];
    currentResearchPlan = currentResearchPlan
        ? JSON.parse(currentResearchPlan)
        : {};
    oldResearchPlans.push(currentResearchPlan);
    setDataToStorage("research", password, researchPlan);
    setDataToStorage("oldResearchPlans", password, oldResearchPlans);
    let notifications = await getDataFromStorage("notifications", password);
    notifications = notifications ? JSON.parse(notifications) : {};
    deleteAllNotifications(password, notifications);
    let personal = await getDataFromStorage("personal", password);
    personal = personal ? JSON.parse(personal) : {};
    avalableIntervals = modificationOfIntervals(personal.time);
    if (!(researchPlan.beeps.importantMomentsOnly === true)) {
        newNotifications = {};
        if (researchPlan.place === true) {
            if (researchPlan.location) {
                idLocation = locationNotifications();
                newNotifications["place"] = idLocation;
            }
        }
        if (researchPlan.beeps.dailyBeeps > 0) {
            idTime = createNotificationsForResearch(
                researchPlan.beeps.dailyBeeps,
                researchPlan.days,
                avalableIntervals,
                new Date(),
            );
            newNotifications["time"] = idTime;
        }
        await setDataToStorage("notifications", password, newNotifications);
    }
};
