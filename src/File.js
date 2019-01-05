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
        this.saveAnswerToFile(this.state.beeps);
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
        research: {name: "Researching Experience", researcher: "Sara Jakša"},
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
            "#This file ave the collection of beeps and it was written on" +
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
                    if (!(question === null)) {
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

    sendEmail = async beeps => {
        let result = this.getBeepsCsvContent(beeps);
        if (this.state.filePassword) {
            result = CryptoJS.AES.encrypt(
                result,
                this.state.filePassword,
            ).toString();
        }
        result = finalFileContent.replace("\n", "%0A");
        await Linking.openURL(
            "mailto:sarajaksa@sarajaksa.eu?subject=Beeps&body=" + result,
        );
    };

    sendEmail2 = async beeps => {
        const path = this.state.pathBeeps;
        await this.saveAnswerToFile(beeps);
        Mailer.mail(
            {
                subject: "Beeps",
                recipients: ["sarajaksa@sarajaksa.eu"],
                body: "This are my beeps",
                isHTML: true,
                attachment: {
                    path: path,
                    type: "csv",
                    name: "",
                },
            },
            (error, event) => {},
        );
    };

    readFromFile = async () => {
        const path = this.state.pathBeeps;
        let files = await RNFS.readdir(this.state.pathFolder);
        this.setState({files: files});
        try {
            var result = await RNFS.readFile(path, "utf8");
            this.setState({fileContent: result});
        } catch (error) {
            this.setState({fileContent: "This file does not exist"});
        } finally {
            if (this.state.filePassword) {
                try {
                    result = CryptoJS.AES.decrypt(
                        result,
                        this.state.filePassword,
                    ).toString(CryptoJS.enc.Utf8);
                    this.setState({fileContent: result});
                } catch (error) {
                    this.setState({fileContent: "Wrong password"});
                }
            }
        }
        this.textInput.clear();
        this.setState({filePassword: ""});
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
                        onPress={() => this.saveAnswerToFile(this.state.beeps)}>
                        <Text>Save File</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.sendEmail(this.state.beeps)}>
                        <Text>Send Email (No Libaries)</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.sendEmail2(this.state.beeps)}>
                        <Text>Send Email (With libary)</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.deleteFile()}>
                        <Text>Delete File</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.readFromFile()}>
                        <Text>Read File</Text>
                    </TouchableHighlight>
                    <Text>{JSON.stringify(this.state.fileContent)}</Text>
                </ScrollView>
            </View>
        );
    }
}

export default File;
