import React, { useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {datasource} from "./Data.js";

const Add = ({navigation}) => {
    const [desc, setDesc] = useState('');
    const [amount, setAmt] = useState('');
    const [type, setType] = useState('Income');
    return (
        <View style={{padding: 10, marginTop: 30, backgroundColor: '#8bdfd7', flex: 1}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Description:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setDesc(text)} />
            </View>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Amount:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setAmt(text)} />
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
            <View style={{margin: 10}}>
                <Button title="Submit" color="#333f6e"
                        onPress={() => {
                            let item = {key:desc, amount: amount };
                            let indexnum = 1;
                            if (type == "Income") {
                                indexnum = 0;
                            }
                            datasource[indexnum].data.push(item);
                            {navigation.navigate("Home")}
                        }
                        }
                />
            </View>
        </View>
    );
};

export default Add;