import { UserContext } from './src/services/context/context'; 
import { StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Main from './src/views/home/Main';
import * as ScreenOrientation from "expo-screen-orientation";

// Orientation.Unknown = 0
// Orientation.PORTRAIT_UP = 1
// Orientation.PORTRAIT_DOWN = 2
// Orientation.LANDSCAPE_LEFT = 3
// Orientation.LANDSCAPE_RIGHT = 4

var currentOrientation = window.screen.orientation.type;
window.addEventListener('orientationchange', function() {
	currentOrientation = window.screen.orientation.type;
});

const App = (config) => {

	const [orientation, setOrientation] = useState(null);

	useEffect(() => {
		// checkOrientation();
		// const subscription = ScreenOrientation.addOrientationChangeListener(
		// 	handleOrientationChange
		// );
		// return () => {
		//   	ScreenOrientation.removeOrientationChangeListeners(subscription);
		// };
	}, []);

	// const checkOrientation = async () => {
	// 	const orientation = await ScreenOrientation.getOrientationAsync();
	// 	console.log(orientation);
	// 	setOrientation(orientation);
	// };

	// const handleOrientationChange = (o) => {
	// 	setOrientation(o.orientationInfo.orientation);
	// };

	var preferences = {
		'current_user' : {
			'guid':'2',
			'name':'Esteban',
			'last':'Piccardo',
			'user':'esteban',
			'pass':'12345',
			'type':'company',
			'mail':'esteban@gmail.com',
			'data': {
				'company' : {
					'rut': '10000500123456789',
					'socialReason': 'Panaderia y Rotiseria',
					'address': 'Vilardebo 4565',
					'itemCompany': 'Gastronomia',
					'description': 'Panaderia y Rotiseria donde podes realizar tu reserva de pedido y venir a retirar...',
					'location': {
						'lng':-34.87843487086523,
						'lat':-56.17987247183919
					},
					'service': {
						'nombre':'none',
						'starts':'--/--/-- 00:00:00',
						'ends':'--/--/-- 00:00:00',
						'frecuency': 1,
					},
					'logo': 'uri/: ...',
				},
				'customer' : {
					'document': '',
					'picture': 'uri/: ...'
				},
			}
		},
		'connection' : {
			'string':'none',
		},
		'theme' : {
			'appColor': '#2ECC71',
			'asideColor':'#69ACDD',
			'backgroundColor':'#69ACDD',
			'menuButttons': '#a8ffe5'
		},
		'dimensions':{
			// 'windowWidth':windowWidth,
			// 'windowHeight':windowHeight,
		}
	}
	const [userPreferences, setUserPreferences] = useState(preferences);

	return (
		<UserContext.Provider value={{ userPreferences, setUserPreferences }}>
            <Main style={styles.background} />
        </UserContext.Provider>
	);
};

export default App;

// var windowWidth = Dimensions.get('window').width;
// var windowHeight = Dimensions.get('window').height;

// puedo agregar un estilo aca y usarlo en toda la aplicacion
const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#69ACDD'
	},
});