import { 
	useState, useEffect
} from 'react';

import { 
    StyleSheet, 
    View,
    Text
} from 'react-native';

import Slider from '@react-native-community/slider';

import { LinearGradient } from 'expo-linear-gradient';

const RatioPanel = ( params ) => {

    var {
        onRatioChange,
        ratio,
        setRatio
    } = params;


    const handleRatioChange = (value) => {
        console.log(value);
        if (value === 0) value = 1;
        setRatio(value);
        // Llama a la función de devolución de llamada con el nuevo valor
        onRatioChange(value);
    };
  
    const allowedValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    useEffect(() => {
		setRatio(ratio);
	}, []); // isConnected

    return (
        <View style={{ 
            backgroundColor: '#fff', 
            borderWidth: 0.4, 
            borderColor: '#389338',
            borderRadius: 10
        }}>
            <Slider
                style={{ width: 190, height: 40 }}
                minimumValue={0}
                maximumValue={10}
                // minimumTrackTintColor="#FFFFFF"
                // maximumTrackTintColor="#000000"
                thumbTintColor="#389338" 
                step={5}
                value={ratio} 
                onSlidingComplete={handleRatioChange}
            />

            <View style={styles.labels}>
                {allowedValues.map((item, index) => (
                    <View key={index}>
                        {index === 0 && (
                            <Text style={styles.km}>1 km</Text>
                        )}
                        {index === 5 && (
                            <Text style={styles.km}>5 km</Text>
                        )}
                        {index === 10 && (
                            <Text style={styles.km}>10 km</Text>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ratioPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#355B54',
        borderWidth: 1,
    },
    input: {
        width:'77%',
        marginRight: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 180,
        marginLeft: 8,
        // marginBottom: 6
    },
    km: {
        fontSize: 11,
        // marginHorizontal: 2
    }
});

export default RatioPanel;