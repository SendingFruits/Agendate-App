import { formatDate } from '../../views/utils/Functions'; 
import React, { useEffect } from 'react';

import CalendarPicker from '../bookings/CalendarPicker'

import { 
    Modal,
    Text,
    TextInput, 
    StyleSheet, 
    View,
    TouchableOpacity,
    showDatePicker
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const FilterPanel = ( params ) => {

    var {
        onRefresh,
        dateSelected,
        handleDateSelect,
        showModal,
        setShowModal,
        showDatePicker
	} = params;

    const showCalendar = () => {
        setShowModal(true);
        // showDatePicker(false,true);
    }
 
    // useEffect(() => {
    //     setShowModal(false);
    // }, []);

    return (
        <>
            <LinearGradient 
                style={styles.container}
                colors={['#dfe4ff', '#238162', '#135054']} >

                <TouchableOpacity     
                    style={styles.searchPanel}
                    onPress={() => showCalendar()}>
             
                    <TextInput 
                        editable={false}
                        style={styles.dataEdit} 
                        value={formatDate(dateSelected)}
                        />
                    
                </TouchableOpacity>
            </LinearGradient>

            <Modal
                animationType="slide"
                visible={showModal}
                transparent={true} >
                <View style={styles.modal}>

                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => setShowModal(false)} 
                        >
                        <Text style={styles.cross}>X</Text>
                    </TouchableOpacity>
                    <CalendarPicker handleDateSelect={handleDateSelect} />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: { 
        width:'98%', 
        height:50, 
        alignItems:'center',
        alignContent:'center', 
        flexDirection:'row',
        position:'absolute',
        top:2,
    },
    searchPanel: {
        flex: 1,
        width: '99%',
        height: 33,
        zIndex: 10, 
        marginHorizontal:20,
        backgroundColor:'#fff'
    },
    dataEdit: {
        flex: 1,
        marginVertical:5,
        marginHorizontal:8,
        backgroundColor:'#fff'
    },
    modal: {
		alignSelf: 'center',
		marginHorizontal: 40,
		marginVertical: 220,
		paddingHorizontal: 20,
		paddingVertical: 50,
		borderRadius: 20,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeModal: {
        width:'97%',
        marginTop: 8,
        flexDirection:'row',
		justifyContent: 'flex-end',
		alignItems: 'center',

	},
	cross: {
		color: 'gray',
        fontSize: 20,
        fontWeight:'bold'
	},
});

export default FilterPanel;