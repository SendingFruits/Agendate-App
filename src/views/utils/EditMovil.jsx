import React from 'react';

import { 
	Text,
    TextInput, 
	View,
	TouchableOpacity,
    Image
} from 'react-native';

const EditMovil = ( params ) => {
    
    const {
        movil,
        handleFieldChange
    } = params;

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:'#ffffff00',
                // marginBottom:1
                }}>
                <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                }}>
                    <Image source={require('../../../assets/uru.png')}
                        style={{ 
                            width: 19, height: 11
                        }} />
                    <Text style={{
                        fontSize:16, 
                        fontWeight:'bold' }}>  +598 </Text>
                </TouchableOpacity>
            </View>
            <TextInput
                maxLength={8}
                keyboardType="numeric"
                style={{
                    fontSize:16,
                    textAlign:'left',
                    // backgroundColor:'#555',
                    color: 'black',
                    fontWeight: 'bold',
                    width: 150
                }}
                // placeholder="Telefono"
                value={movil}
                // onChangeText={setMovil}
                onChangeText={(text) => handleFieldChange(text, 'movil')}
            />
        </View>
    );
};

export default EditMovil;