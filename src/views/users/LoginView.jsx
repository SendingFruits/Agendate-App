import { 
    AuthContext 
} from '../../context/AuthContext';

import UsersController from '../../controllers/UsersController';
import MenuButtonItem from '../home/MenuButtonItem';
import AlertModal from '../utils/AlertModal';

import React, { 
	useContext, useState, useEffect 
} from 'react';

import { useNavigation } from '@react-navigation/native';

import { 
	StyleSheet,
	View, 
	Text, 
	TextInput, 
	Image, 
	TouchableOpacity
} from 'react-native';

import { 
	faUser, faLock
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

const LoginView = ( params ) => {

	const navigation = useNavigation();
	const { setIsLogin, setUser, setCurrentUser } = useContext(AuthContext);
	// console.log('isLogin: ', isLogin);

    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {

		// navigation.reset({
		// 	index: 0,
		// 	routes: [
		// 	  { name: 'Login' },
		// 	],
		// });

        setUsername('');
        setPassword('');
    }, []);

	const login = async () => {
		UsersController.handleLogin(username, password)
		.then(userReturn => {
			if (userReturn != null) {

				var user = JSON.parse(userReturn);
				// console.log(user);
				if (typeof user.celular === 'string' && user.celular.includes("+598")) 
				{
					user.celular = user.celular.replace("+598", "");
				}

				// console.log('user: ', user);
				var currentUser = {
					guid: user.id,
					name: user.nombre,
					last: user.apellido,
					user: user.nombreUsuario,
					pass: user.contrasenia,
					celu: user.celular,
					mail: user.correo,
					type: user.tipoUsuario,
					logo: (user.foto === null || user.foto === '') ? 'none' : user.foto,
					noti: user.tieneNotificaciones,
					docu: user.tipoUsuario === 'company' ? user.rutDocumento : user.documento,
					...(user.tipoUsuario === 'company' && {
						rut: user.rutDocumento,
						businessName: user.razonSocial,
						owner: user.nombrePropietario,
						category: user.rubro,
						address: user.direccion,
						city: user.ciudad,
						description: user.descripcion,
						latitude: user.latitude,
						longitude: user.longitude,
						logo: (user.logo === null || user.logo === '') ? 'none' : user.logo,
					}),
				};

				setCurrentUser(currentUser);
				setUser(currentUser);
				setIsLogin(true);

				navigation.navigate('Inicio');
				// alert('Bienvenido '+ (userReturn.firstname !== undefined ? userReturn.firstname : user.nombre ));
				var text = 'Bienvenid@ '+ (userReturn.firstname !== undefined ? userReturn.firstname : user.nombre );
				AlertModal.showAlert(text,'');
			}
		})
		.catch(error => {
			AlertModal.showAlert('Autenticación',error);
		});

	};

	return (
		<View style={styles.container}>
			<View style={{
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				justifyContent: 'center',
				alignItems: 'center',
			}}><Image source={require('../../../assets/greenBack.png')} style={styles.gif} />
			</View>
			<View style={styles.body}>
				<Image source={require('../../../assets/icon.png')} style={styles.avatar} />
				<Text style={styles.title}>Bienvenido</Text>
				<View style={styles.inputContainer}>
					{/* <Image source={require('../../resources/images/user_login_1.png')} style={styles.inputIcon} /> */}
					<FontAwesomeIcon icon={faUser} style={styles.icon} />
					<TextInput
						style={styles.input}
						value={username}
						onChangeText={setUsername}
						placeholder="Usuario"
						placeholderTextColor="#565"
					/>
				</View>
				<View style={styles.inputContainer}>
					{/* <Image source={require('../../resources/images/pass_login_1.png')} style={styles.inputIcon} /> */}
					<FontAwesomeIcon icon={faLock} style={styles.icon} />
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						placeholder="Contraseña"
						placeholderTextColor="#565"
						secureTextEntry
					/>
				</View>
				<View style={styles.checkboxContainer}>
					{/* <CheckBox value={rememberMe} onValueChange={setRememberMe} /> */}
					{/* <Text style={styles.checkboxText}>Recordar mi usuario</Text> */}
					{/* <Text style={styles.forgotPasswordText}>¿Olvidaste la contraseña?</Text> */}
				</View>
				<MenuButtonItem 
					icon = {null}
					text = "Iniciar Sesión"
					type = 'login'
					// color = {['#dfe4ff', '#238162', '#2ECC71']}
					color = {['#135000', '#2ECC71', '#dfe4ff']}
					onPress = { () => login() }
					/>
				<View style={styles.recoveryContainer}>
					<Text>¿Olvidaste tu contraseña?</Text>
					<View style={{ flexDirection:'row' }}>
						<TouchableOpacity
							onPress = { () => navigation.navigate('Recuperar')} >
							<Text style={{ color:"#f35f44", fontWeight:'bold' }}> Recuperar </Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.registerContainer}>
					<Text>¿Sos nuevo?</Text>
					<View style={{ flexDirection:'row' }}>
						<Text> Registrate </Text>
						<TouchableOpacity
							onPress = { () => navigation.navigate('Registro de Usuario')} >
							<Text style={{ color:"#f35f44", fontWeight:'bold' }}>Aquí</Text>
						</TouchableOpacity>
					</View>
				</View>


			</View>
		</View>
  	);
};

const styles = StyleSheet.create({
	icon: {
		flex: 1,
		color: 'black',
		fon: 3,
		marginRight: 5,
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	header: {
		height: 220,
		backgroundColor: '#135054',
	},
	body: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 20,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderColor: '#135054',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 18,
		marginLeft: 18,
		marginBottom: 10,
	  	paddingHorizontal: 15,
		paddingVertical:2,
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
		color:'#000'
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	checkboxText: {
		color: 'darkgray',
		fontSize: 12,
		marginLeft: 5,
	},
	forgotPasswordText: {
		color: '#135054',
		fontWeight: 'bold',
		marginLeft: 'auto',
		fontSize: 12,
	},
	registerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	recoveryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 50,
	},
	registerText: {
		color: 'darkgray',
		fontSize: 12,
		marginRight: 4,
	},
});

export default LoginView;