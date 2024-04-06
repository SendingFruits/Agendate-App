import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CheckBox( params ) {

    var {
        type,
        text,
        isChecked,
        setChecked,
    } = params;

    // const [isChecked, setChecked] = useState(false);

    const getCheckboxStyle = () => {
        switch (type) {
            case 'normal':
                return styles.checkboxNormal;
            case 'colored':
                return styles.checkboxColored;
            case 'disabled':
                return styles.checkboxDisabled;
            default:
                return styles.checkboxNormal;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Checkbox
                    style={getCheckboxStyle()}
                    value={isChecked}
                    onValueChange={setChecked}
                    />
                <Text style={styles.paragraph}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        marginLeft: 10,
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
});