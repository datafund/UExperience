import React from "react";
import {AsyncStorage, Platform} from "react-native";
import Mailer from "react-native-mail";
import PushNotification from "react-native-push-notification";

const CryptoJS = require("crypto-js");
const RNFS = require("react-native-fs");

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
    PushNotification.cancelAllLocalNotifications();
    AsyncStorage.clear();
    setDataToStorage("answer", password, JSON.stringify(""));
    setDataToStorage("beeps", password, JSON.stringify([]));
    setDataToStorage("research", password, JSON.stringify({}));
    setDataToStorage(
        "personal",
        password,
        JSON.stringify({
            email: "",
            passwordHash: "",
            time: "",
            days: [],
            emailPassword: "",
        }),
    );
    setDataToStorage("oldResearchPlans", password, JSON.stringify([]));
};

export const exportAllData = async (password, password2) => {
    let pathToFile = getPathToSaveFilesAccessable(Platform.OS) + "/backup.txt";
    allVariables = [];
    let personal = await getDataFromStorage("personal", password);
    personal = personal ? JSON.parse(personal) : {};
    let research = await getDataFromStorage("research", password);
    research = research ? JSON.parse(research) : {};
    let beeps = await getDataFromStorage("beeps", password);
    beeps = beeps ? JSON.parse(beeps) : {};
    let oldResearchPlans = await getDataFromStorage(
        "oldResearchPlans",
        password,
    );
    oldResearchPlans = oldResearchPlans ? JSON.parse(oldResearchPlans) : [];
    let notifications = await getDataFromStorage("notifications", password);
    notifications = notifications ? JSON.parse(notifications) : notifications;
    allVariables.push(personal);
    allVariables.push(research);
    allVariables.push(beeps);
    allVariables.push(oldResearchPlans);
    allVariables.push(notifications);
    allVariables = JSON.stringify(allVariables);
    await saveDataToFile(allVariables, pathToFile, password2);
    await sendEmail(
        personal.email,
        "BackUp from UExperience",
        "",
        pathToFile,
        "txt",
    );
    //await deleteFile(pathToFile);
};

export const saveDataToFile = async (data, path, publicKey) => {
    if (!(publicKey === "")) {
        data = CryptoJS.AES.encrypt(data, publicKey).toString();
    }
    let worked = await RNFS.writeFile(path, data, "utf8");
    return worked;
};

export const getPathToSaveFilesAccessable = platform => {
    if (platform === "android") {
        return RNFS.ExternalCachesDirectoryPath;
    } else if (platform == "ios") {
        return RNFS.DocumentDirectoryPath;
    } else {
        return "";
    }
};

export const sendEmail = async (email, subject, body, pathToFile, type) => {
    Mailer.mail(
        {
            subject: subject,
            recipients: [email],
            body: body,
            isHTML: false,
            attachment: {
                path: pathToFile,
                type: type,
                name: "",
            },
        },
        (error, event) => {},
    );
};

export const movePictures = async (pictures, folder) => {
    for (pictureIndex in pictures) {
        let picture = pictures[pictureIndex];
        let currentPicture = new File(picture.getPath());
        let finalPath = folder + "/" + picture;
        let worked = await RNFS.writeFile(finalPath, currentPicture, "base64");
    }
};

export const sendEmailToResearcher = async (password, publicKey) => {
    let path = getPathToSaveFilesAccessable(Platform.OS);
    let pathToFile = path + "/beeps.csv";
    let time = new Date();
    time = time.toISOString();
    let research = await getDataFromStorage("research", password);
    research = research ? JSON.parse(research) : {};
    let beeps = await getDataFromStorage("beeps", password);
    beeps = beeps ? JSON.parse(beeps) : {};
    let notification = await getDataFromStorage("notification", password);
    notification = research ? JSON.parse(notification) : {};
    let data = getBeepsCsvContent(time, research, beeps, notification);
    //await movePictures(picturesName, path);
    await saveDataToFile(data, pathToFile, publicKey);
    await sendEmail(research.email, "Beeps", "", pathToFile, "csv");
    //await deleteFile(pathToFile);
};

export const deleteFile = async pathToFile => {
    let result = await RNFS.exists(pathToFile);
    if (result) {
        RNFS.unlink(pathToFile);
    }
};

export const getBeepsCsvContent = (time, research, beeps, notification) => {
    finalFileContent = "";
    finalFileContent += "#Ta datoteka je nastala " + time + "|||\n";
    finalFileContent +=
        "#Raziskava " + research.name + " od " + research.researcher + "|||\n";
    finalFileContent += "|||\n";
    finalFileContent += "#Vprašanja|||\n";
    finalFileContent += "Id;Questions;Type|||\n";
    for (id in research.questions) {
        finalFileContent +=
            research.questions[id].id +
            ";" +
            research.questions[id].question +
            ";" +
            research.questions[id].type +
            "|||\n";
    }
    finalFileContent += "|||\n";
    finalFileContent += "# Seznam sproženih notifikacij|||\n";
    finalFileContent += "Notification\n";
    for (id in notification) {
        if (notification[id].triggered === true) {
            finalFileContent += notification[id].time + "|||\n";
        }
    }
    finalFileContent += "|||\n|||\n|||\n";
    finalFileContent += "#Beeps|||\n";
    finalFileContent += "Time;QuestionId;Answer;|||\n";
    for (beepIndex in beeps) {
        let beep = beeps[beepIndex];
        if (beep.researchId === research.id) {
            if (!(beep.experience === "")) {
                finalFileContent +=
                    '"' +
                    beep.time +
                    '";"experience";"' +
                    beep.experience +
                    '";|||\n';
            }
            if (!(beep.questions === undefined)) {
                for (questionIndex in beep.questions) {
                    let answer = beep.questions[questionIndex];
                    if (answer.answer) {
                        finalFileContent += '"' + beep.time + '";';
                        finalFileContent += '"' + answer.id + '";';
                        finalFileContent +=
                            '"' +
                            JSON.stringify(answer.answer)
                                .replace("[", "")
                                .replace("]", "")
                                .split('"')
                                .join("") +
                            '";';
                        finalFileContent += "|||\n";
                    }
                }
            }
        }
    }

    return finalFileContent;
};
