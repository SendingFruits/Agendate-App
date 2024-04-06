import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarPicker = ( params ) => {

    LocaleConfig.locales['es'] = {
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
		today: 'Hoy',
	};
    
    var {
        handleDateSelect,
	} = params;

    useEffect(() => {
        LocaleConfig.defaultLocale = 'es';
    }, []);

	return ( 
        <View>
            <Calendar
                theme={{
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
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
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
            />
        </View>
	);
};

export default CalendarPicker;