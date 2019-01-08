import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    AsyncStorage,
    TextInput,
    ScrollView,
    Linking,
    Platform,
} from "react-native";
import Mailer from "react-native-mail";

import styles from "./Styles.js";
import {getDataFromStorage} from "./functions/data.js";

const RNFS = require("react-native-fs");
const CryptoJS = require("crypto-js");

class File extends Component {
    componentDidMount = async () => {
        let password = this.props.navigation.getParam("password", "");
        this.setState({password: password});
        let beeps = await getDataFromStorage("beeps", password);
        beeps = beeps ? JSON.parse(beeps) : [];
        this.setState({beeps: beeps});
        let pictureNames = [];
        for (beepIndex in beeps) {
            if (beeps[beepIndex].picture) {
                pictureNames.push(beeps[beepIndex].picture);
            }
        }
        this.setState({pictures: pictureNames});
        let questions = await getDataFromStorage("questions", password);
        questions = questions ? JSON.parse(questions) : [];
        this.setState({questions: questions});
        let currentTime = new Date();
        currentTime = currentTime.toISOString().split("T")[0];
        if (Platform.OS === "android") {
            this.setState({pathFolder: RNFS.ExternalCachesDirectoryPath});
        } else {
            this.setState({pathFolder: RNFS.DocumentDirectoryPath});
        }
        this.setState({
            currentTime: currentTime,
            pathBeeps: this.state.pathFolder + "/beeps.csv",
        });
    };

    componentWillUnmount = () => {
        this.deleteFile();
    };

    state = {
        beeps: [],
        password: "",
        filePassword: "",
        fileContent: "",
        questions: [],
        research: {
            name: "Researching Experience",
            researcher: "Sara Jakša",
            email: "sarajaksa@sarajaksa.eu",
        },
    };

    deleteFile = async () => {
        const path = this.state.pathBeeps;
        let result = await RNFS.exists(path);
        if (result) {
            RNFS.unlink(path);
        }
    };

    getBeepsCsvContent = beeps => {
        finalFileContent = "";
        finalFileContent +=
            "#This file have the collection of beeps and it was written on " +
            this.state.currentTime +
            "\n";
        finalFileContent +=
            "#These beeps are part of reserach " +
            this.state.research.name +
            " by " +
            this.state.research.researcher +
            "\n";
        finalFileContent += "\n";
        finalFileContent += "#The following questions were collected\n";
        for (id in this.state.questions) {
            finalFileContent +=
                "#" +
                this.state.questions[id].id +
                " : " +
                this.state.questions[id].name +
                " (" +
                this.state.questions[id].type +
                ")\n";
        }
        finalFileContent += "\n\n\n";
        finalFileContent += "Time;QuestionId;Question;TypeOfQuestion;Answer;\n";
        for (beepIndex in this.state.beeps) {
            let beep = this.state.beeps[beepIndex];
            if (!(beep.questions === "null")) {
                for (questionIndex in beep.questions) {
                    let question = beep.questions[questionIndex];
                    if (!(question === null || question.answer === undefined)) {
                        finalFileContent += '"' + beep.time + '";';
                        finalFileContent += '"' + question.id + '";';
                        finalFileContent += '"' + question.question + '";';
                        finalFileContent += '"' + question.type + '";';
                        finalFileContent +=
                            '"' +
                            JSON.stringify(question.answer)
                                .replace("[", "")
                                .replace("]", "")
                                .split('"')
                                .join("") +
                            '";';
                        finalFileContent += "\r\n";
                    }
                }
            }
        }
        return finalFileContent;
    };

    saveAnswerToFile = async beeps => {
        const path = this.state.pathBeeps;
        let finalFileContent = this.getBeepsCsvContent(beeps);
        if (this.state.filePassword) {
            finalFileContent = CryptoJS.AES.encrypt(
                finalFileContent,
                this.state.filePassword,
            ).toString();
        }
        let worked = await RNFS.writeFile(path, finalFileContent, "utf8");
        this.textInput.clear();
        this.setState({filePassword: ""});
    };

    sendEmail2 = async beeps => {
        const path = this.state.pathBeeps;
        await this.movePictures(this.state.pictures, this.state.pathFolder);
        await this.saveAnswerToFile(beeps);
        Mailer.mail(
            {
                subject: "Beeps",
                recipients: [this.state.research.email],
                body: "",
                isHTML: false,
                attachment: {
                    path: path,
                    type: "csv",
                    name: "",
                },
            },
            (error, event) => {},
        );
    };

    movePictures = async (pictures, folder) => {
        for (pictureIndex in pictures) {
            let picture = pictures[pictureIndex];
            let currentPicture = new File(picture.getPath());
            let finalPath = folder + "/" + picture;
            let worked = await RNFS.writeFile(
                finalPath,
                currentPicture,
                "base64",
            );
        }
    };

    render() {
        return (
            <View style={styles.background}>
                <ScrollView>
                    <Text>
                        Če želite zaščititi svojo datoteko z enkripcijo, prosim
                        da spodaj napišete geslo, prav tako napišite spodaj
                        svoje geslo, če želite prikazati datoteko z enkripcijo.
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "black",
                            borderWidth: 1,
                        }}
                        onChangeText={text =>
                            this.setState({filePassword: text})
                        }
                        ref={passwordInput => {
                            this.textInput = passwordInput;
                        }}
                    />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.sendEmail2(this.state.beeps)}>
                        <Text>Send Email</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}

export default File;
