import React, {Component} from "react";
import {View, TouchableHighlight, Text, TextInput} from "react-native";

import PushNotification from "react-native-push-notification";

import styles from "./Styles.js";
import {
    getDataFromStorage,
    setDataToStorage,
    createNewProfile,
} from "./functions/data.js";

class LoadingNewUsers extends Component {
    componentDidMount = async () => {
        let passwordHash = await getDataFromStorage("password", "");
        this.setState({passwordHash: passwordHash});
    };

    state = {
        passwordHash: "",
        currentScreen: 1,
    };

    savePassword = async password => {
        await createNewProfile(password);
        this.props.navigation.navigate("Index", {
            password: password,
        });
    };

    renderLogInScreen = () => {
        if (this.state.currentScreen === 1) {
            return (
                <View style={styles.backgroundStart}>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 24,
                            textAlign: "center",
                            justifyContent: "space-around",
                            flex: 0.2,
                            color: "white",
                        }}>
                        To je testna verzija aplikacije
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            justifyContent: "flex-start",
                            alignSelf: "center",
                            flex: 0.5,
                            width: "80%",
                            color: "white",
                        }}>
                        To je testna verzija aplikacije, kar pomeni, da so
                        znotraj nje lahko še prisotni hroški, ki bodo povzročali
                        probleme, vključno z izgubo podatkov. Uporaba le je na
                        lastno odgovornost
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            justifyContent: "flex-start",
                            alignSelf: "center",
                            flex: 0.5,
                            width: "80%",
                            color: "white",
                        }}>
                        Pripombe in probleme lahko pošljete preko nastavitev v
                        aplikaciji.
                    </Text>

                    <TouchableHighlight
                        onPress={() => {
                            this.setState({currentScreen: 2});
                        }}
                        style={{
                            backgroundColor: "#4e9363",
                            padding: 20,
                            width: "60%",
                            height: 20,
                            justifyContent: "center",
                            flex: 0.1,
                            alignSelf: "center",
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                justifyContent: "center",
                                textAlign: "center",
                                color: "white",
                            }}>
                            Strinjam se
                        </Text>
                    </TouchableHighlight>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <View
                            key={1}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "white",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />
                        <View
                            key={2}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "#595959",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />

                        <View
                            key={3}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "#595959",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                </View>
            );
        } else if (this.state.currentScreen === 2) {
            return (
                <View style={styles.backgroundStart}>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 24,
                            textAlign: "center",
                            justifyContent: "space-around",
                            flex: 0.2,
                            color: "white",
                        }}>
                        Ti si raziskovalec
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            justifyContent: "flex-start",
                            alignSelf: "center",
                            flex: 0.5,
                            width: "80%",
                            color: "white",
                        }}>
                        Descriptive Experience Sampling (diskriptivno vzorčenje
                        doživljanja) je enostavno. Ob naključnih časih se sproži
                        notifikacija, kjer nato vpišeš podatke, kako si se
                        počutil/-a tik pred notifikacijo.
                    </Text>
                    <TouchableHighlight
                        onPress={() => {
                            this.setState({currentScreen: 3});
                        }}
                        style={{
                            backgroundColor: "#4e9363",
                            padding: 20,
                            width: "60%",
                            height: 20,
                            justifyContent: "center",
                            flex: 0.1,
                            alignSelf: "center",
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                justifyContent: "center",
                                textAlign: "center",
                                color: "white",
                            }}>
                            Dovoli notifikacije
                        </Text>
                    </TouchableHighlight>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <View
                            key={1}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "#595959",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />
                        <View
                            key={2}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "white",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />

                        <View
                            key={3}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "#595959",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                </View>
            );
        } else if (this.state.currentScreen === 3)
            return (
                <View style={styles.backgroundStart}>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 24,
                            textAlign: "center",
                            justifyContent: "space-around",
                            flex: 0.1,
                            color: "white",
                        }}>
                        Zaščiti svoje podatke
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            justifyContent: "flex-start",
                            flex: 0.3,
                            color: "white",
                        }}>
                        Spodaj lahko vpišete svoje geslo za zaščito svojih
                        podatkov.
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "black",
                            borderWidth: 1,
                            backgroundColor: "white",
                            flex: 0.1,
                            width: "90%",
                            alignSelf: "center",
                        }}
                        onChangeText={text =>
                            this.setState({inputPassword: text})
                        }
                    />
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                    <View style={{flex: 0.1}}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                flex: 1,
                            }}>
                            <TouchableHighlight
                                style={{
                                    backgroundColor: "#4e9363",
                                    padding: 30,
                                    height: 40,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    flex: 0.4,
                                }}
                                onPress={() =>
                                    this.savePassword(this.state.inputPassword)
                                }>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "white",
                                    }}>
                                    Shrani geslo
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    backgroundColor: "#4e9363",
                                    padding: 30,
                                    height: 40,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    flex: 0.4,
                                }}
                                onPress={() => this.savePassword("")}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "white",
                                    }}>
                                    Brez gesla
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <View
                            key={1}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "#595959",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />
                        <View
                            key={2}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "#595959",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />

                        <View
                            key={3}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: "white",
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            flex: 0.1,
                        }}
                    />
                </View>
            );
    };

    render() {
        return this.renderLogInScreen();
    }
}

export default LoadingNewUsers;
