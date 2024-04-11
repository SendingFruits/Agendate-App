import { 
    convertHour, createDateTimeFromDecimalHour, controlarHorario
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

    var {
        dias,
        setDias,
        create,
        interval,
    } = params;

    console.log('interval',interval);

    const [schedules, setSchedules] = useState(dias);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  
    const [selectedDatePicker1, setSelectedDatePicker1] = useState(new Date());
    const [selectedDatePicker2, setSelectedDatePicker2] = useState(new Date());

    // const [isChecked, setIsChecked] = useState((dias[day].horaInicio !== null || dias[day].horaFin !== null));
    // console.log(isChecked);

    const showStartTimePicker = (day,hours) => {
        // console.log(hours);
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
        // console.log(start);
        // console.log(end);
        if (end < start && end !== null) {
            AlertModal.showAlert('Mensaje', 'La fecha de fin debe ser posterior a la fecha de inicio.');
            return false;
        } else {
            return true;
        }
    }


    const handleStartTimeConfirm = (date) => {
        // console.log('date',date);
        if (date) {
            const updatedSchedule = { ...schedules };
            var selectedHours = date.getHours();
            var selectedMinutes = date.getMinutes();
            
            if (interval === 60) {
                selectedMinutes = 0;
            }
            
            var selectedTimeInHours = selectedHours + selectedMinutes / 60;
    
            if (datesControl(selectedTimeInHours, updatedSchedule[selectedDay].horaFin)) {
                console.log(selectedTimeInHours);
                updatedSchedule[selectedDay].horaInicio = selectedTimeInHours;
                setSchedules(updatedSchedule);
                setDias(updatedSchedule);
            }
            setStartTimePickerVisible(false);
        }
    };
  
    const handleEndTimeConfirm = (date) => {
        // console.log('date',date);
        if (date) {
            const updatedSchedule = { ...schedules };
            var selectedHours = date.getHours();
            var selectedMinutes = date.getMinutes();

            if (interval === 60) {
                selectedMinutes = 0;
            }

            var selectedTimeInHours = selectedHours + selectedMinutes / 60;
    
            if (datesControl(updatedSchedule[selectedDay].horaInicio, selectedTimeInHours)) {
                console.log(selectedTimeInHours);
                updatedSchedule[selectedDay].horaFin = selectedTimeInHours;
                setSchedules(updatedSchedule);
                setDias(updatedSchedule);
            }
            setEndTimePickerVisible(false);
        }
    };
  
  
    useEffect(() => {
        // console.log('dias: ', dias);
	}, []);

    return (
        <View>
            {dias !== null ? (
                <View style={{ flex:1 }}>
                    {Object.keys(dias).map((day, index) => {
                        const [isChecked, setIsChecked] = 
                            useState((dias[day].horaInicio !== null || dias[day].horaFin !== null));
                        return (
                            <View key={index}>
                                <View style={styles.row}>
                                    {/* {console.log(isChecked)} */}
                                
                                    { isChecked ? (
                                        <> 
                                            <Text style={{ fontSize: 13, width:'28%' }}>{day}: </Text>

                                            <TextInput
                                                editable={false}
                                                style={{
                                                    textAlign:'right',
                                                    paddingHorizontal:5,
                                                    backgroundColor:'#fff',
                                                    width:'20%',
                                                    height:'88%',
                                                    borderWidth: 0.8,
                                                    borderRadius: 5,
                                                    borderColor:'#005',
                                                    color: '#000'
                                                }}
                                                value={dias[day].horaInicio !== null 
                                                    ? convertHour(dias[day].horaInicio, 'toHours').toString() : ''}
                                                />
                                            <TouchableOpacity
                                                style={{ marginHorizontal:6 }}
                                                onPress={() => showStartTimePicker(day,dias[day])} >
                                                {/* <Text>Comienzo</Text> */}
                                                <FontAwesomeIcon icon={faClock} size={22}/>
                                            </TouchableOpacity>
                                    
                                            <TextInput
                                                editable={false}
                                                style={{
                                                    textAlign:'right',
                                                    paddingHorizontal:5,
                                                    backgroundColor:'#fff',
                                                    width:'20%',
                                                    height:'88%',
                                                    borderWidth: 0.8,
                                                    borderRadius: 5,
                                                    borderColor:'#005',
                                                    color: '#000'
                                                }}
                                                value={dias[day].horaFin !== null 
                                                    ? convertHour(dias[day].horaFin, 'toHours').toString() : ''}
                                                />
                                            <TouchableOpacity
                                                style={{ marginHorizontal:6 }}
                                                onPress={() => showEndTimePicker(day,dias[day])} >
                                                {/* <Text>Termino</Text> */}
                                                <FontAwesomeIcon icon={faClock} size={22} />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={{ fontSize: 13, width:'90%' }}>{day}: </Text>
                                            {dias[day].horaInicio = null} 
                                            {dias[day].horaFin = null}   
                                        </>
                                    )}

                                    <View style={{ alignItems:'flex-end', marginRight: 6, marginTop: 5 }}>
                                        <CheckBox 
                                            style={{
                                                width:30,
                                                color:'#f35f44'
                                            }}
                                            type={'normal'}
                                            text={null}
                                            isChecked={isChecked}
                                            setChecked={setIsChecked}
                                            />
                                    </View>
                                    
                                </View>
                            </View>
                        );
                    })}
                </View>
            ) : (
                <Text>No hay dias seleccionados</Text>
            )}

            <DateTimePickerModal
                mode="time"
                display="spinner"
                is24Hour={true}
                date = {selectedDatePicker1}
                minuteInterval={interval}

                isVisible={isStartTimePickerVisible}
                onConfirm={handleStartTimeConfirm}
                onCancel={() => setStartTimePickerVisible(false)}
                />
            <DateTimePickerModal
                mode="time"
                display="spinner"
                is24Hour={true}
                date = {selectedDatePicker2}
                minuteInterval={interval}
                
                isVisible={isEndTimePickerVisible}
                onConfirm={handleEndTimeConfirm}
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