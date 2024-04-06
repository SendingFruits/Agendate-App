import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarPicker = ( params ) => {

    var {
        handleDateSelect,
	} = params;


    const markedDates = {};
    const disabledDates = {};

    const spanishMonthNames = {
        enero: 'Enero',
        febrero: 'Febrero',
        marzo: 'Marzo',
        abril: 'Abril',
        mayo: 'Mayo',
        junio: 'Junio',
        julio: 'Julio',
        agosto: 'Agosto',
        septiembre: 'Septiembre',
        octubre: 'Octubre',
        noviembre: 'Noviembre',
        diciembre: 'Diciembre',
    };

    LocaleConfig.defaultLocale = 'es';

    useEffect(() => {
        // ..
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
                markedDates = {markedDates}
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
                disabledDates={disabledDates}
                monthNames={spanishMonthNames}
            />
        </View>
	);
};

export default CalendarPicker;