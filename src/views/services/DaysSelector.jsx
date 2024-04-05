import { 
    formatDate, convertHour, createDateTimeFromDecimalHour
} from '../utils/Functions'; 

import React, { 
    useState, useEffect
} from 'react';

import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity, 
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '../utils/CheckBox';
import AlertModal from '../utils/AlertModal';

import { 
	faClock,
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


const DaysSelector = ( params ) => {

    console.log(params);

    var {
        dias,
        setDias,
        create,
    } = params;

    const [schedules, setSchedules] = useState(dias);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  
    const [selectedDatePicker1, setSelectedDatePicker1] = useState(new Date());
    const [selectedDatePicker2, setSelectedDatePicker2] = useState(new Date());


    const showStartTimePicker = (day,hours) => {
        console.log(hours);
        setSelectedDatePicker1(createDateTimeFromDecimalHour(hours.horaInicio));
        setSelectedDay(day);
        setStartTimePickerVisible(true);
    };
  
    const showEndTimePicker = (day,hours) => {
        setSelectedDatePicker2(createDateTimeFromDecimalHour(hours.horaFin));
        setSelectedDay(day);
        setEndTimePickerVisible(true);
    };
  

    const datesControl = (start,end) => {
        console.log(start);
        console.log(end);
        if (end < start && end !== null) {
            AlertModal.showAlert('Mensaje', 'La fecha de fin debe ser posterior a la fecha de inicio.');
            return false;
        } else {
            return true;
        }
    }


    const handleStartTimeConfirm = (date) => {
        // console.log(date);
        const updatedSchedule = { ...schedules };
        var selectedHours = date.getHours();
        var selectedMinutes = date.getMinutes();
        var selectedTimeInHours = selectedHours + selectedMinutes / 60;

        if (datesControl(selectedTimeInHours, updatedSchedule[selectedDay].horaFin)) {
            console.log(selectedTimeInHours);
            updatedSchedule[selectedDay].horaInicio = selectedTimeInHours;
            setSchedules(updatedSchedule);
            setDias(updatedSchedule);
        }
        setStartTimePickerVisible(false);
    };
  
    const handleEndTimeConfirm = (date) => {
        const updatedSchedule = { ...schedules };
        var selectedHours = date.getHours();
        var selectedMinutes = date.getMinutes();
        var selectedTimeInHours = selectedHours + selectedMinutes / 60;

        if (datesControl(updatedSchedule[selectedDay].horaInicio, selectedTimeInHours)) {
            console.log(selectedTimeInHours);
            updatedSchedule[selectedDay].horaFin = selectedTimeInHours;
            setSchedules(updatedSchedule);
            setDias(updatedSchedule);
        }
        setEndTimePickerVisible(false);
    };
  
  
    useEffect(() => {
        console.log('dias: ', dias);
	}, []);

    return (
        <View>
            {dias !== null ? (
                <View style={{ flex:1 }}>
                    {Object.keys(dias).map((day, index) => (
                        <View key={index}>
                            {[isChecked, setIsChecked] = // por defecto debe ser true
                                useState((dias[day].horaInicio !== null || dias[day].horaFin !== null))}
                            
                            <View style={styles.row}>
                                {/* {console.log(isChecked)} */}
                                <Text style={{ fontSize: 13, width:'31%' }}>{day}: </Text>
                            
                                { isChecked ? (
                                    <> 
                                        <TextInput
                                            editable={false}
                                            style={{
                                                textAlign:'right',
                                                paddingHorizontal:5,
                                                backgroundColor:'#fff',
                                                width:'20%',
                                                borderWidth: 0.8,
                                                borderRadius: 5,
                                                borderColor:'#005'
                                            }}
                                            value={dias[day].horaInicio !== null 
                                                ? convertHour(dias[day].horaInicio, 'toHours').toString() : ''}
                                            />
                                        <TouchableOpacity
                                            style={{ marginHorizontal:10 }}
                                            onPress={() => showStartTimePicker(day,dias[day])} >
                                            {/* <Text>Comienzo</Text> */}
                                            <FontAwesomeIcon icon={faClock} />
                                        </TouchableOpacity>
                                
                                        <TextInput
                                            editable={false}
                                            style={{
                                                textAlign:'right',
                                                paddingHorizontal:5,
                                                backgroundColor:'#fff',
                                                width:'20%',
                                                borderWidth: 0.8,
                                                borderRadius: 5,
                                                borderColor:'#005'
                                            }}
                                            value={dias[day].horaFin !== null 
                                                ? convertHour(dias[day].horaFin, 'toHours').toString() : ''}
                                            />
                                        <TouchableOpacity
                                            style={{ marginHorizontal:10 }}
                                            onPress={() => showEndTimePicker(day,dias[day])} >
                                            {/* <Text>Termino</Text> */}
                                            <FontAwesomeIcon icon={faClock} />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    dias[day].horaInicio = null, dias[day].horaFin = null   
                                )}

                                <View style={{ alignItems:'flex-end', marginRight: 5 }}>
                                    <CheckBox 
                                        style={{
                                            width:30,
                                        }}
                                        type={'normal'}
                                        text={null}
                                        isChecked={isChecked}
                                        setChecked={setIsChecked}
                                        />
                                </View>
                                
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <Text>No hay dias seleccionados</Text>
            )}

            <DateTimePickerModal
                mode="time"
                display="spinner"
                is24Hour={true}
                date = {selectedDatePicker1}
                minuteInterval={30}

                isVisible={isStartTimePickerVisible}
                onConfirm={handleStartTimeConfirm()}
                onCancel={() => setStartTimePickerVisible(false)}
                />
            <DateTimePickerModal
                mode="time"
                display="spinner"
                is24Hour={true}
                date = {selectedDatePicker2}
                minuteInterval={30}
                
                isVisible={isEndTimePickerVisible}
                onConfirm={handleEndTimeConfirm()}
                onCancel={() => setEndTimePickerVisible(false)}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    check: {
		
	},
});

export default DaysSelector;