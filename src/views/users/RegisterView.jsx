import React, { 
	useState, useEffect 
} from 'react';

import {
    validarCedula,
	validarRUT,
} from '../utils/Functions'

import UsersController from '../../controllers/UsersController';
import MenuButtonItem from '../home/MenuButtonItem';
import AlertModal from '../utils/AlertModal';
import EditMovil from '../utils/EditMovil';

import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	RefreshControl,
	TextInput,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const RegisterView = () => {

	const navigation = useNavigation();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const [movil, setMovil] = useState('');
	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);

	const [userType, setUserType] = useState('customer');
	const [document, setDocument] = useState('');

	const [isValidCi, setIsValidCi] = useState(false);
	const [isValidRut, setIsValidRut] = useState(false);

	const [refreshing, setRefreshing] = useState(false);


	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// alert('El correo es incorrecto!');
		return emailRegex.test(email);
	};

	const handleFieldChange = (text,field) => {
		switch (field) {
			case 'username':
				setUsername(text);
				break;
			case 'password':
				setPassword(text);
				break
			case 'password2':
				setPassword2(text);
				break;
			case 'firstName':
				setFirstName(text);
				break;
			case 'lastName':
				setLastName(text);
				break;
			case 'movil':
				// setMovil(text);
				setMovilFormat(text);
				break;
			case 'email':
				setEmail(text);
				setIsValidEmail(validateEmail(text));	
				break;
			case 'userType':
				setUserType(text);
				break;
			case 'document':
				console.log(userType);
				if (userType === 'customer') {
					if (setIsValidCi(text)) {
						console.log('cedula correcta');
					}
				} else {
					if (setIsValidRut(text)) {
						console.log('rut correcta');
					}
				}
				setDocument(text);
				break;
			default:
				break;
		}
	};
	
	const sendData = () => {
		
		const formData = {
			username,
			password,
			password2,
			firstName,
			lastName,
			movil,
			email,
			userType,
			document,
		};

		UsersController.handleRegister(formData)
		.then(userReturn => {
			// console.log('userReturn: ', userReturn);
			if (userReturn) {
				// AlertModal.showAlert('Enviado','Usuario creado con éxito \n Se le enviará un Correo Electrónico para confirmar su creación.');
				var text = 'Usuario creado con éxito \n Se le enviará un Correo Electrónico para confirmar su creación.';
				AlertModal.showAlert('', text);
				navigation.navigate('Login');

				setUsername('');
				setPassword('');
				setPassword2('');
				setFirstName('');
				setLastName('');
				setMovil('');
				setEmail('');
				setDocument('');
				setIsValidEmail(true);
				setUserType('customer');
			}
		})
		.catch(error => {
			AlertModal.showAlert('', error);
		});
	};

	const setMovilFormat = (movil) => {
		// console.log(movil);
		var intMovil = parseInt(movil,10);
		// console.log(intMovil);
		if (!isNaN(intMovil)) {
			setMovil(intMovil.toString());
		} else {
			setMovil(movil);
		}
	}


	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	useEffect(() => {
        setUsername('');
        setPassword('');
		setPassword2('');
		setFirstName('');
		setLastName('');
		setMovil('');
		setEmail('');
		setDocument('');
		setIsValidEmail(true);
		setUserType('customer');
    }, []);

	return (
		<ScrollView 
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			} >

			<View style={styles.header}>

				<View style={styles.inputContainer}>
					<TextInput
						// keyboardType="text"
						style={styles.input}
						placeholder="Username"
						value={username}
						// onChangeText={setUsername}
						onChangeText={(text) => handleFieldChange(text, 'username')}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						// keyboardType="text"
						style={styles.input}
						placeholder="Contraseña"
						secureTextEntry
						value={password}
						// onChangeText={setPassword}
						onChangeText={(text) => handleFieldChange(text, 'password')}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						// keyboardType="text"
						style={styles.input}
						placeholder="Confirmar Contraseña"
						secureTextEntry
						value={password2}
						// onChangeText={setPassword}
						onChangeText={(text) => handleFieldChange(text, 'password2')}
					/>
				</View>
			</View>

			<View style={styles.body}>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Nombre"
						value={firstName}
						// onChangeText={setFirstName}
						onChangeText={(text) => handleFieldChange(text, 'firstName')}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Apellido"
						value={lastName}
						// onChangeText={setLastName}
						onChangeText={(text) => handleFieldChange(text, 'lastName')}
					/>
				</View>

				<View style={styles.inputContainer}>
					<EditMovil movil={movil} handleFieldChange={handleFieldChange} />
				</View>

				<View style={[styles.inputContainer, !isValidEmail && styles.invalidInput]} >
					<TextInput
						keyboardType="email-address"
						style={styles.input}
						placeholder="Correo"
						value={email}
						// onChangeText={setEmail}
						onChangeText={(text) => handleFieldChange(text, 'email')}
						autoCapitalize="none" />
					{
						!isValidEmail && 
						<Text style={styles.errorText}>
							Correo electrónico inválido
						</Text>
					}
				</View>

				{/* Type */}
				<View style={styles.pickerContainer}>
					<Picker
						style={styles.picker}
						placeholder="Tipo"
						selectedValue={userType}
						// onValueChange={(itemValue) => setUserType(itemValue)}
						onValueChange={(itemValue) => handleFieldChange(itemValue, 'userType')}
					>
						<Picker.Item label="Cliente" value="customer" />
						<Picker.Item label="Empresa" value="company" />
					</Picker>

				</View>

				{/* Campos según el tipo seleccionado */}
				{userType === 'customer' ? (
					<View>
						<View style={styles.inputContainer}>
							<TextInput
								keyboardType="numeric"
								maxLength={8}
								style={styles.input}
								placeholder="Documento"
								value={document}
								// onChangeText={setDocument}
								onChangeText={(text) => handleFieldChange(text, 'document')}
							/>
						</View>
					</View>
				) : (
					<View>
						<View>
							<View style={styles.inputContainer}>
								<TextInput
									keyboardType="numeric"
									maxLength={12}
									style={styles.input}
									placeholder={"RUT"}
									value={document}
									// onChangeText={setDocument}
									onChangeText={(text) => handleFieldChange(text, 'document')}
								/>
							</View>
						</View>
					</View>
				)}
				{/* */}
				
			</View>

			<View style={styles.footer}>
				{/* Button */}
				<View style={styles.sendContainer}>
					
					<MenuButtonItem 
						icon = {null}
						text = "Enviar"
						type = 'panel'
						color = {['#135000', '#2ECC71', '#dfe4ff']}
						onPress = { () => sendData() }
						/>
				</View>
			</View>

		</ScrollView>
	);
};

const styles = StyleSheet.create({

	container: {
		flex: 1,
		marginTop: 20,
	},

	header: {
		marginTop: 10,
	},
	body: {
		marginTop: 3,
	},
	footer: {
		position: 'relative',
		alignItems: 'center',
		top: 3,
		bottom: 5,
		left: 5,
		right: 5,
	},


	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#135054',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 15,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	inputIcon: {
		width: 40,
		height: 40,
		marginRight: 5,
	},
	input: {
		flex: 1,
		color: 'black',
		fontWeight: 'bold',
	},
	
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	},


	pickerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#135054',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 20,
		marginTop: 2,
		height: 50,
	},
	picker: {
		flex: 1,
		color: 'gray',
		fontWeight: 'bold',
		height: 1,
	},


	typeContainer: {
		alignItems: 'flex-start',
		borderColor: '#135054',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 20,
		marginTop: 1,
	},

	doctypeContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		marginTop: 15,
	},
	docpickerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#135054',
		borderWidth: 1,
		borderRadius: 30,
		marginLeft: 25,
		marginRight: 10,
		marginBottom: 15,
		height: 35,
		width: 115,
		paddingHorizontal: 1,
	},
	pickerType: {
		flex: 1,
		color: 'gray',
		fontWeight: 'bold',
		height: 1,
		width: 100,
	},
	inputRUTContainer: {
		borderColor: '#135054',
		borderWidth: 1,
		borderRadius: 30,
		height: 35,
		width: 165,
		paddingVertical: 3,
		paddingHorizontal: 15,
	},


	infoContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},

	button: {
		backgroundColor: 'lightblue',
		padding: 15,
		borderRadius: 5,
		marginTop: 20,
	},
	sendContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 50,
	},
	sendText: {
		color: 'darkgray',
		fontSize: 12,
		marginRight: 4,
	},
});

export default RegisterView;