import React, {useState} from 'react';
import {View, Text, SectionList, StyleSheet, TouchableOpacity, StatusBar, Button, Alert, TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import {datasource} from "./Data.js";

const styles = StyleSheet.create({
    itemBorder: {
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        padding: 20,
        flexDirection: 'row',
        borderColor: '#333f6e',
        backgroundColor: '#fffbe8'
    },
    textStyle: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    },
    headerText: {
        fontSize: 25,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: "sans-serif",
        color: '#e8f4ff',
        backgroundColor: '#333f6e',
    },
    headerBorder: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#333f6e'
    },
    tableBorder: {
        margin: 20,
        marginTop: 5,
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#333f6e'
    }
});

const Home = ({navigation}) => {
    const [goal, setGoal] = useState(0);
    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.itemBorder}
                              onPress={() =>
                              {
                                  navigation.navigate("Edit", {index:index, type:section.type, key:item.key});
                              }
                              }>
                <Text style={styles.textStyle}>{item.key}</Text>
                <Text style={styles.textStyle}>${item.amount}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{backgroundColor: '#8bdfd7', paddingBottom: 50}}>
            <Text style={styles.title}>Income/Expenses Tracker</Text>
                <View>
                    <TextInput style={{borderWidth: 2, padding: 10, margin: 10, backgroundColor: '#fffbe8', borderColor: '#333f6e'}}
                               placeholder="Enter your goal"
                               onChangeText={(value) => setGoal(parseFloat(value) || 0)}/>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', margin: 10}}>I will save ${goal.toFixed(2)} by the end of the week.</Text>
                </View>
                <View style={{width: 360, height: 60, alignSelf: 'center', marginTop: 10}}>
                    <Button title="Add Income/Expense" color="#333f6e" onPress={() => {navigation.navigate('Add')}}/>
                </View>
                <View style={styles.tableBorder}>
                        <StatusBar hidden={true}/>
                        <SectionList sections={datasource} renderItem={renderItem}
                                     renderSectionHeader={({section:{type, bgColor, icon}})=>(
                                         <View style={[styles.headerBorder, {backgroundColor: bgColor}]}>
                                             <Icon name={icon} size={25} style={{marginRight: 5}}/>
                                             <Text style={styles.headerText}>{type}</Text>
                                         </View>
                                     )}/>
                </View>
                <View style={{width: 360, height: 60, alignSelf: 'center', marginTop: 20}}>
                    <Button title="Your Report" color="#333f6e" onPress={() => {
                        const totalIncome = datasource[0].data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
                        const totalExpenses = datasource[1].data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
                        const deficitAmt = (totalIncome - totalExpenses).toFixed(2);
                        if (goal === deficitAmt) {
                            Alert.alert("Your Report:",
                                `Total Income: $${totalIncome.toFixed(2)}\n` +
                            `Total Expenses: $${totalExpenses.toFixed(2)}\n` +
                            `Deficit Amount: $${deficitAmt}\n` +
                        `\nYou have reached your goal of $${goal}!`);
                        } else if (goal > deficitAmt) {
                            Alert.alert("Your Report:",
                                `Total Income: $${totalIncome.toFixed(2)}\n` +
                           `Total Expenses: $${totalExpenses.toFixed(2)}\n` +
                           `Deficit Amount: $${deficitAmt}\n` +
                       `\nYou are $${(goal - deficitAmt).toFixed(2)} away from your goal.`);
                        } else {
                            Alert.alert("Your Report:",
                                `Total Income: $${totalIncome.toFixed(2)}\n` +
                           `Total Expenses: $${totalExpenses.toFixed(2)}\n` +
                           `Deficit Amount: $${deficitAmt}\n` +
                        `\nYou have surpassed your goal by $${(deficitAmt - goal).toFixed(2)}!`);
                        }
                    }}/>
                </View>
                <View style={{width: 360, height: 60, alignSelf: 'center'}}>
                    <Button title="Start A New Week" color="#333f6e"
                            onPress={() => {
                                Alert.alert("Warning: This will delete all income and expenses.", '',
                                    [{text: 'OK', onPress: () => {
                                            datasource[0].data = [];
                                            datasource[1].data = [];
                                            navigation.navigate("Home")
                                        }},
                                        {text: 'Cancel'}])
                            }}/>
                </View>
        </View>
    );
};

export default Home;
