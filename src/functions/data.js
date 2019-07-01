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
    //it creates a new profile - so far it just deletes the data and puts empty data to some fields + it puts the default research plan in
    if (!(password === "")) {
        var newPasswordHash = CryptoJS.SHA256(password).toString(
            CryptoJS.enc.Base64,
        );
    } else {
        var newPasswordHash = "None";
    }
    PushNotification.cancelAllLocalNotifications();
    AsyncStorage.clear();
    setDataToStorage("answer", password, JSON.stringify(""));
    setDataToStorage("beeps", password, JSON.stringify([]));
    setDataToStorage(
        "research",
        password,
        JSON.stringify({
            beeps: {
                additionalCriteria: false,
                dailyBeeps: 3,
                importantMomentsOnly: false,
            },
            days: 30,
            description: "",
            descriptive: true,
            email: "",
            end: "",
            id: "osnovni",
            location: false,
            name: "Osnovni raziskovalni načrt",
            organization: "",
            password: "",
            privacy: "Nobene",
            questions: [
                {
                    context: true,
                    current: 1,
                    id: 1,
                    question: "Kje si?",
                    type: "Tags",
                    possibleAnswers: [
                        "doma",
                        "spalnica",
                        "dnevna soba",
                        "delovna soba",
                        "kuhinja",
                        "jedilnica",
                        "kopalnica",
                        "stranišče",
                        "podstrešje",
                        "klet",
                        "terasa",
                        "vrt",
                        "hodnik",
                        "za mizo",
                        "v fotelju",
                        "za računalnikom",
                        "pri umivalniku",
                        "v postelji",
                        "tuš/banja",
                        "pri štedilniku",
                        "služba",
                        "pisarna/kabinet",
                        "sejna soba",
                        "delavnica",
                        "laboratorij",
                        "predavalnica",
                        "kokpit",
                        "na terenu",
                        "zunaj",
                        "narava",
                        "park",
                        "kolo",
                        "avto",
                        "gozd",
                        "mesto",
                        "bar",
                        "restavracija",
                        "ulica",
                        "kino",
                        "stadion",
                        "gledališče",
                        "koncert",
                        "trgovina",
                        "knjižnica",
                        "tržnica",
                        "parkirišče",
                        "pri prijatelju doma",
                        "plaža",
                        "znotraj",
                        "hodnik",
                        "avtobus",
                        "kolo",
                        "avto",
                        "voznikov sedež",
                        "sopotnikov sedež",
                        "potniški sedež",
                        "na sestanku",
                        "na predavanju",
                        "na koncertu",
                        "v muzeju",
                        "na pijači",
                        "na kosilu",
                        "na večerji",
                        "na predstavi",
                        "na zabavi",
                        "na poti",
                        "na zmenku",
                        "na izpitu",
                        "na masaži",
                    ],
                },
                {
                    context: true,
                    current: 1,
                    id: 2,
                    question: "Kaj počneš?",
                    type: "Tags",
                    possibleAnswers: [
                        "pišem",
                        "rišem",
                        "ustvarjam",
                        "se dolgočasim",
                        "hitim",
                        "čakam",
                        "berem časopis",
                        "berem knjigo",
                        "berem dokumente",
                        "berem z zaslona",
                        "telefoniram",
                        "se igram",
                        "...smartphone",
                        "...iPad",
                        "...računalnik",
                        "facebook",
                        "preverjam status",
                        "surfam po spletu",
                        "tipkam",
                        "pišem (kuli)",
                        "opazujem",
                        "gledam film",
                        "gledam youtube",
                        "gledam TV",
                        "sedim",
                        "stojim",
                        "hodim",
                        "vozim kolo",
                        "vozim avto",
                        "jadram",
                        "se umivam",
                        "se kopam (bazen, morje)",
                        "se sončim",
                        "kuham",
                        "se pogovarjam z drugim",
                        "se pogovarjam s seboj",
                        "predavam",
                        "se razburjam",
                        "se opazujem",
                        "pojem",
                        "plešem",
                        "se režim",
                        "se smejim",
                        "kričim",
                        "jočem",
                        "se pačim",
                        "se urejam",
                        "se drogiram",
                        "kadim",
                        "se samozadovoljujem",
                        "opravljam potrebo",
                        "sestankujem",
                        "pijem",
                        "jem",
                        "žvečim",
                        "se napenjam",
                        "dvigujem",
                        "klepetam",
                        "razmišljam",
                        "načrtujem",
                        "lenarim",
                        "delam",
                        "spim",
                        "se ljubim ",
                        "se poljubljam",
                        "se sprehajam",
                        "ovohavam",
                        "okušam",
                        "praskam",
                        "božam",
                        "poslušam",
                        "tipam",
                        "popravljam",
                        "merim",
                        "športam",
                        "nakupujem",
                        "zajtrkujem",
                        "večerjam",
                        "pospravljam",
                        "čistim",
                        "kartam",
                        "šahiram",
                        "družabne igre",
                        "igram",
                    ],
                },
                {
                    context: true,
                    current: 1,
                    id: 3,
                    question: "S kom si?",
                    type: "Tags",
                    possibleAnswers: [
                        "sam",
                        "s prijatelji",
                        "s prijateljem/ico",
                        "s partnerjem/ico",
                        "z ljubimcem/ko",
                        "z družino",
                        "s kolegi",
                        "šef",
                        "podrejeni",
                        "sodelavci",
                        "z otroki",
                        "s starši",
                        "v množici",
                        "s klienti",
                        "z domačimi ljubljenčki",
                        "z opravljalci storitev (recimo kelnarji v gostilni, v kateri jem)",
                    ],
                },
                {
                    context: false,
                    current: 1,
                    id: 4,
                    question: "Kaj doživljaš?",
                    type: "Tags",
                    possibleAnswers: [
                        "zadovoljen ",
                        "nezadovoljen",
                        "miren ",
                        "nemiren",
                        "misli o prihodnosti",
                        "misli o preteklosti",
                        "načrtujem",
                        "premlevam",
                        "vsiljene misli",
                        "sanjarim",
                        "skrbi",
                        "obeti",
                        "spomini",
                        "notranji govor",
                        "čustva",
                        "veselje",
                        "radost",
                        "užitek",
                        "prijetno",
                        "presenečenje",
                        "žalost",
                        "jeza",
                        "otožnost",
                        "ponos",
                        "trma",
                        "sram",
                        "strah",
                        "srh",
                        "krivda",
                        "nevoščljivost",
                        "naveličanost",
                        "dolgčas",
                        "ljubosumje",
                        "negotovost",
                        "razburjenost",
                        "začudenje",
                        "živčnost",
                        "pričakovanje",
                        "evforija",
                        "ekstaza",
                        "lagodnost",
                        "nelagodnost",
                        "sproščenost",
                        "depresija",
                        "obup",
                        "iritation",
                        "telesni občutki",
                        "bolečina v telesu",
                        "bolečina v trupu",
                        "bolečina v glavi",
                        "bolečina v udih",
                        "bolečina v mišicah",
                        "bolečina v koži",
                        "bolečina v zobjeh",
                        "utrujenost",
                        "zaspanost",
                        "polnost ",
                        "energija",
                        "zdravje",
                        "lakota",
                        "sitost",
                        "zasičenost s hrano",
                        "žeja",
                        "slabost",
                        "spolna vzburjenost",
                        "vročina",
                        "srbečica",
                        "mrzlica",
                        "hladno",
                        "vroče",
                        "smrdi",
                        "diši",
                        "peče",
                        "orgazem",
                        "telesno ugodje (pri masaži, praskanju ipd.)",
                        "metuljčki v trebuhu",
                        "hitro dihanje",
                        "hitro bitje srca",
                        "kurja polt",
                        "potenje",
                    ],
                },
                {
                    context: false,
                    current: 1,
                    id: 5,
                    question: "Koliko si prisoten v trenutku?",
                    type: "Tags",
                    possibleAnswers: [
                        "povsem odsoten",
                        "odsoten",
                        "delno prisoten",
                        "prisoten",
                        "povsem prisoten",
                        "fokusiran",
                        "razpršena pozornost",
                        "multitasking",
                        "me zanima",
                        "me ne zanima",
                        "begajoča pozornost",
                        "jasno",
                        "megleno",
                        "mi je pomembno",
                        "mi ni pomembno",
                        "usmerjen vase",
                        "usmerjen navzven",
                        "radoveden",
                        "usmerjen v naslednjo nalogo",
                        "raje bi bil drugje",
                        "moral bi biti drugje",
                        "tukaj in zdaj",
                        "zadovoljen",
                        "nezadovoljen",
                    ],
                },
            ],
            researcher: "",
            share: false,
            start: "",
            subjectId: null,
        }),
    );
    setDataToStorage("passwordHash", "", newPasswordHash);
    setDataToStorage(
        "personal",
        password,
        JSON.stringify({
            email: "",
            time: "",
            days: [],
            emailPassword: "",
        }),
    );
    setDataToStorage("oldResearchPlans", password, JSON.stringify([]));
};

export const exportAllData = async (password, password2) => {
    let pathToFile = getPathToSaveFilesAccessable(Platform.OS) + "/backup.csv";
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
        "csv",
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

export const saveBeep = async (
    password,
    answers,
    text,
    research,
    time,
    place,
    longitude,
    latitude,
    picture,
) => {
    let allAnswers = answers;
    allAnswers.filter(item => item);
    if (!(allAnswers.length === 0 && text === "")) {
        let newBeep = {
            researchId: research.id,
            time: time,
            questions: allAnswers,
        };
        if (research.place) {
            newBeep["longitude"] = longitude;
            newBeep["latitude"] = latitude;
        }
        if (research.picture) {
            newBeep["picture"] = picture;
        }
        if (research.descriptive) {
            newBeep["experience"] = text;
        }
        let beeps = await getDataFromStorage("beeps", password);
        let b = beeps ? JSON.parse(beeps) : [];
        b.push(newBeep);
        await setDataToStorage("beeps", password, b);
    }
};
