import React from "react";
import {AsyncStorage} from "react-native";

const CryptoJS = require("crypto-js");

export const getDataFromStorage = async (database, password) => {
    //It takes the value out of the database and if in encryption mode, it decryptes it
    try {
        var value = await AsyncStorage.getItem(database);
    } catch (err) {
        var value = [];
    }
    if (!(password.length === 0)) {
        value = CryptoJS.AES.decrypt(value, password).toString(
            CryptoJS.enc.Utf8,
        );
    }
    return value;
};

export const setDataToStorage = async (database, password, value) => {
    //It takes the data, change it into a string, if in encryption mode encrypt it and save it to database
    if (!(typeof value === "string" || value instanceof String)) {
        value = JSON.stringify(value);
    }
    if (!(password.length === 0)) {
        value = CryptoJS.AES.encrypt(value, password).toString();
    }
    AsyncStorage.setItem(database, value);
};

export const createNewProfile = async password => {
    //it creates a new profile - so far it just deletes the data and puts empty data to some fields
    AsyncStorage.clear();
    setDataToStorage("Answer", password, JSON.stringify([]));
    setDataToStorage("answer", password, JSON.stringify([]));
    setDataToStorage("answers", password, JSON.stringify([]));
    setDataToStorage("beeps", password, JSON.stringify([]));
    setDataToStorage("questions", password, JSON.stringify([]));
};
