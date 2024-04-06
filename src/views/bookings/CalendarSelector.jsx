import React, { 
    useState, useEffect
} from 'react';

import ScheduleList from './ScheduleList';

import { 
    View, StyleSheet
} from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarSelector = ( params ) => {

	const {
		company,
		service,
		navigation
	} = params;

    var idServer = service.id;
	var idCompany = company.id;

    const markedDates = {};
    const disabledDates = {};

	LocaleConfig.locales['es']  = {
		monthNames: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		],
		monthNamesShort: [
		  	'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Set', 'Oct', 'Nov', 'Dic',
		],
		dayNames: [
			'Domingo',
			'Lunes',
			'Martes',
			'Miercoles',
			'Jueves',
			'Viernes',
			'Sábado',
		],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		today: 'Hoja',
	};

	LocaleConfig.defaultLocale = 'es';

	const [minDate, setMinDate] = useState('');
	const [colorSelected, setColorSelected] = useState('#000');
	const [paramsSchedules, setParamsSchedules] = useState('');

    const handleDateSelect = (date) => {
		console.log('dia seleccionado:', date);
		var day = date.dateString;
		setParamsSchedules(JSON.stringify({day, idServer, navigation}));
		// navigation.navigate('Horarios', JSON.stringify({day, idServer, navigation}));
    };


	useEffect(() => {
		const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
		setMinDate(`${year}-${month}-${day}`);
	}, []);

	return ( 
        <View>
            <Calendar
                style={styles.calendar}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#dfe4ff',
                    textSectionTitleColor: '#305835',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#000000',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#000000',
                    textDisabledColor: '#E51515',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'green',
                    monthTextColor: 'black',
                    indicatorColor: 'black',
                }}
                hideExtraDays={true}
                markedDates = {markedDates}
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
                disabledDates={disabledDates}
				minDate={minDate}
				// customHeader={({ date, onMonthChange }) => (
				// 	<CalendarHeader month={date} onMonthChange={onMonthChange} />
				// )}
            />

			{paramsSchedules ? 
				<ScheduleList params={paramsSchedules} />
			: null}
        </View>
	);
};

const styles = StyleSheet.create({
	calendar: {
        // height: '25%',
		backgroundColor: '#dfe4ff',
	},
    title: {
		alignSelf:'center',
		marginTop: 3,
		padding: 2,
		color:'#000000',
		fontWeight:'bold',
		backgroundColor:'#e3eeee',
		width:'100%',
		textAlign:'center'
	},
	scheduleItem: {
		flexDirection: 'row',
		alignContent: 'space-between',
		paddingVertical: 4,
		paddingHorizontal: 20,
		marginTop: 5,
		marginBottom: 5,
		borderBottomColor: '#8DA9A4',
		borderBottomWidth: 1,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	hourItem: {
		fontWeight: 'normal',
		marginRight: 20,
	},
	statusItem: {
		alignSelf:'flex-end',
		fontWeight: 'bold',
		textAlign: 'right',
	},
	modal: {
		width: 360,
		height: 220,
		alignSelf: 'center',
		marginHorizontal: 40,
		marginVertical: 220,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 20,
		borderColor: 'green',
		borderWidth: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeModal: {
		position: 'absolute',
		top: 10,
		right: 10,
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',

	},
	cross: {
		color: 'green',
	},
	textConfirm: {
		fontSize: 21,
		textAlign: 'center',
		marginHorizontal: 2,
		marginVertical: 2,
		paddingHorizontal: 6,
		paddingVertical: 6,
	},
});

export default CalendarSelector;