import React, {
	useEffect, useState
} from 'react';

import { 
	StyleSheet,
	Text, 
	TouchableOpacity,
	View,
} from 'react-native';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const MenuButtonItem = ({ icon, text, type, color, onPress }) => {

	var [colorButton, setColorButton] = useState(['#135054', '#d8ffff', '#d0e9e1']);

	useEffect(() => {
		if (color) {
		  setColorButton(color);
		}
	}, [color]); 

	return (
		<>
			{   type === 'login' ? (
				<LinearGradient
					colors={colorButton}
					start={{ x: 0.02, y: 0.50 }}
					end={{ x: 1.55, y: 1.55 }}
					style={styles.btnLogin}
					>
					<TouchableOpacity onPress={onPress} >
						<View style={styles.container}>
							{icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
							<Text style={[styles.text, icon ? null : { textAlign: 'center' }]}>{text}</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			) : type === 'panel' ? (
				<LinearGradient
					colors={colorButton}
					start={{ x: 0.02, y: 0.50 }}
					end={{ x: 1.55, y: 1.55 }}
					style={styles.btnPanel}
					>
					<TouchableOpacity onPress={onPress} >
						<View style={styles.container}>
							{icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
							<Text style={[styles.text, icon ? null : { textAlign: 'center' }]}>{text}</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			) : type === 'capture' ? (
				<LinearGradient
					colors={colorButton}
					start={{ x: 0.02, y: 0.50 }}
					end={{ x: 1.55, y: 1.55 }}
					style={styles.btnGral}
					>
					<TouchableOpacity onPress={onPress} >
						<View style={styles.containerCapture}>
							{icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
							<Text style={[styles.text, icon ? null : { textAlign: 'center' }]}>{text}</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			) : (
				<LinearGradient
					colors={colorButton}
					start={{ x: 0.02, y: 0.50 }}
					end={{ x: 1.55, y: 1.55 }}
					style={styles.btnGral}
					>
					<TouchableOpacity onPress={onPress} >
						<View style={styles.container}>
							{icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
							
							{/* <Text style = {styles.text}>{text}</Text> */}
							<Text style={[styles.text, icon ? null : { textAlign: 'center' }]}>{text}</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			)}
			
		</>	
	);
};

const styles = StyleSheet.create({
	btnLogin: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		marginBottom: 15,
		borderRadius: 10,
		borderColor: '#000',
		borderWidth: 0.3,
		borderRadius: 15
	},
	btnPanel: {
		paddingVertical: 14,
		paddingHorizontal: 25,
		marginBottom: 15,
		borderRadius: 10,
		borderColor: '#000',
		borderWidth: 0.3,
		borderRadius: 15
	},
	btnGral: {
		paddingVertical: 10,
		paddingHorizontal: 6,
		marginBottom: 15,
		borderRadius: 10,
		borderColor: '#000',
		borderWidth: 0.2,
		borderRadius: 15
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	containerCapture: {
		flexDirection: 'row',
		justifyContent:'center',
		alignItems: 'center',
	},
	image: {
		height: 35,
		width: 35,
		borderRadius: 23,
	},
	text: {
		fontWeight: 'bold',
		marginLeft: 5,
	},
	icon: {
		color: 'black',
	}
});

export default MenuButtonItem;