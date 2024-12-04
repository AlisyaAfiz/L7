import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {datasource} from "./Data.js";
import RNPickerSelect from "react-native-picker-select";

const Edit = ({navigation, route}) => {
    const [desc, setDesc] = useState(route.params.key);
    const [amount, setAmt] = useState(route.params.amount);
    const [type, setType] = useState(route.params.type);
    return (
        <View style={{padding: 10, paddingTop: 50, flex: 1, backgroundColor: '#8bdfd7'}} >
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Description:</Text>
                <TextInput value={desc} style={{borderWidth: 1}} onChangeText={(text) => setDesc(text)} />
            </View>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Amount:</Text>
                <TextInput value={amount} style={{borderWidth: 1}} onChangeText={(text) => setAmt(text)} />
            </View>
            <View style={{padding: 10}}>
                <RNPickerSelect
                    value={type} onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'Income', value: 'Income' },
                        { label: 'Expense', value: 'Expense' }
                    ]}
                />
            </View>
            <View style={{padding: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, marginRight: 30}}>
                    <Button title="Save" color="#333f6e"
                            onPress={() => {
                                let indexnum = 1;
                                if (route.params.type == "Grass") {
                                    indexnum = 0;
                                }
                                datasource[indexnum].data[route.params.index].key=desc;
                                datasource[indexnum].data[route.params.index].amount=amount;
                                navigation.navigate("Home")
                            }
                            }
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button title="Delete" color="#333f6e"
                            onPress={() => {
                                let indexnum = 1;
                                if (route.params.type == "Income") {
                                    indexnum = 0;
                                }
                                Alert.alert("Are you sure?", '',
                                    [{text: 'Yes', onPress: () => {
                                            datasource[indexnum].data.splice(route.params.index, 1);
                                            navigation.navigate("Home")
                                        }},
                                        {text: 'No'}])
                            }}/>
                </View>
            </View>
        </View>
    );
};

export default Edit;