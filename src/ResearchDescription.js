import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
    Text,
    TextInput,
    ScrollView,
    FlatList,
    Image,
    Switch,
} from "react-native";

import styles from "./Styles.js";
import {setDataToStorage} from "./functions/data.js";

export default class ResearchDescription extends Component {
    componentDidMount() {
        this.setState({
            password: this.props.navigation.getParam("password", ""),
        });
        this.setState({
            research: this.props.navigation.getParam("research", []),
        });
    }

    state = {research: [], participate: false, share: false};

    render() {
        return (
            <View style={styles.background}>
                {this.state.research.id ? (
                    <Text>ID: {this.state.research.id}</Text>
                ) : null}
                {this.state.research.name ? (
                    <Text>Raziskava: {this.state.research.name}</Text>
                ) : null}
                {this.state.research.description ? (
                    <Text>Opis: {this.state.research.description}</Text>
                ) : null}
                {this.state.research.researcher ? (
                    <Text>Raziskovalec: {this.state.research.researcher}</Text>
                ) : null}
                {this.state.research.name ? (
                    <Text>
                        Elektronska pošta raziskovalca:{" "}
                        {this.state.research.email}
                    </Text>
                ) : null}
                {this.state.research.start ? (
                    <Text>Začetek raziskave: {this.state.research.start}</Text>
                ) : null}
                {this.state.research.end ? (
                    <Text>Konec raziskave: {this.state.research.end}</Text>
                ) : null}
                {this.state.research.dailyBeeps ? (
                    <Text>
                        Število dnevnih beepov: {this.state.research.dailyBeeps}
                    </Text>
                ) : null}
                <View style={{flexDirection: "row"}}>
                    <Text>Želim sodelovati v tej raziskavi</Text>
                    <Switch
                        style={{
                            position: "absolute",
                            right: 0,

                            alignSelf: "flex-end",
                        }}
                        value={this.state.participate}
                        onValueChange={() =>
                            this.setState({
                                participate: !this.state.participate,
                            })
                        }
                    />
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text>Svoje podatke želim deliti z raziskovalcem</Text>
                    <Switch
                        style={{
                            position: "absolute",
                            right: 0,
                            alignSelf: "flex-end",
                        }}
                        value={this.state.share}
                        onValueChange={() =>
                            this.setState({share: !this.state.share})
                        }
                    />
                </View>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        if (this.state.participate === true) {
                            setDataToStorage("research", this.state.research);

                            this.props.navigation.goBack();
                        }
                    }}>
                    <Text>Želim sodelovati v tej raziskavi</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Text>Ne želim sodelovati v tej raziskavi</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
