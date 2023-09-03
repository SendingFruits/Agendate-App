import { UserContext } from '../../services/context/context'; 

import HomeView from './HomeView';
import MenuButtonItem from './MenuButtonItem';
import AboutView from './AboutView';

import DiaryView from '../diary/DiaryView';
import BookingsView from '../bookings/BookingsView';
import MakeReservation from '../bookings/MakeReservation';

import ServicesView from '../services/ServicesView';
import PromosView from '../promotions/PromosView';

import LoginView from '../users/LoginView';
import RegisterView from '../users/RegisterView';
import ProfileView from '../users/ProfileView';

import React, { 
	useContext, 
	useState 
} from 'react';

import { 
	StyleSheet,
	View, 
	Text, 
	Image,
	TouchableOpacity,
} from 'react-native';
import { 
	NavigationContainer 
} from '@react-navigation/native';
import { 
	createDrawerNavigator,
	DrawerContentScrollView
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { 
	faHome, 
	faUser, 
	faStar, 
	faDoorOpen, 
	faRegistered,
	faCalendar,
	faRightFromBracket,
	faScrewdriverWrench,
	faTags
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


const drawerAside = createDrawerNavigator();

const Main = ( params ) => {
	// console.log(params);
	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var userLogin = userPreferences.current_user;
	// console.log('userLogin in Main: ', userLogin);
	return (
		<NavigationContainer style={styles.barMenu}>
			<drawerAside.Navigator 
				initialRouteName="Home"
				drawerContent = { (props) => <MenuItems { ...props} params={''} /> }
				>
				<drawerAside.Screen 
					name="Inicio" 
					component={HomeView} 
					initialParams={{ userLogin: '' }}
					/>
				<drawerAside.Screen name="Agenda" component={DiaryView} />
				<drawerAside.Screen name="Reservas" component={BookingsView} />
				<drawerAside.Screen 
					name="Servicios" 
					component={ServicesView} 
					initialParams={{ userLogin: userLogin }} 
					/>
				<drawerAside.Screen 
					name="Promociones" 
					component={PromosView} 
					initialParams={{ userLogin: userLogin }} 
					/>
				<drawerAside.Screen name="Realizar Reserva" component={MakeReservation} />
				{/* <drawerAside.Screen name="Acerca de..." component={AboutView} /> */}
				
				<drawerAside.Screen name="Login" component={LoginView} />
				<drawerAside.Screen name="Registro de Usuario" component={RegisterView} />
			</drawerAside.Navigator>
		</NavigationContainer>
	);
};

const MenuItems = ( { navigation } ) => {

	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var userLogin = userPreferences.current_user;
	const [viewProfileVisible, setViewProfileVisible] = useState(false);
	
	const logout = () => {

		if (userLogin != null) {
			setUserPreferences({
                current_user: {
                    name: 'none',
					user: 'none',
                    pass: 'none',
                    type: 'none',
					pick: '',
					data: null,
                },
            });
			
			alert('Ha dejado la sesión');
            navigation.navigate('Inicio');
        }
	};

	return (
		<DrawerContentScrollView
			style={styles.asideMenu}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>Menú</Text>
			</View>

			{/* Body */}
			<View style={styles.body}>
				<MenuButtonItem 
					icon = {faHome}
					text = "Inicio"
					onPress = { () => navigation.navigate('Inicio')}
				/>

				{(userLogin.type !== 'none') ? (
					<View>
						{ (userLogin.type === 'company') ? (
							<View>
								<MenuButtonItem 
									icon = {faCalendar}
									text = "Agenda"
									onPress = { () => navigation.navigate('Agenda')}
								/>
								<MenuButtonItem 
									icon = {faScrewdriverWrench}
									text = "Servicios"
									onPress = { () => navigation.navigate('Servicios', params={userLogin})}
								/>
								<MenuButtonItem 
									icon = {faTags}
									text = "Promociones"
									onPress = { () => navigation.navigate('Promociones', params={userLogin})}
								/>
							</View>
						) : null }

						{ (userLogin.type === 'customer') ? (
							<MenuButtonItem 
								icon = {faCalendar}
								text = "Reservas"
								onPress = { () => navigation.navigate('Reservas')}
						/>
						) : null }
					</View>
				) : null }
			</View>

			{/* Footer */}
			<View style={styles.footer}>

				{userLogin.user === 'none' ? (
					<View>
						<TouchableOpacity 
							style={styles.btnLogin}
							onPress = { () => navigation.navigate('Login')}
							>
							{/* <Image 
								source = {{uri:'../resources/images/user_login_2.png'}}
								style = {styles.image}
							/> */}
							<FontAwesomeIcon icon={faUser} />
							<Text style={styles.textLogin}>Iniciar Sesión</Text>
						</TouchableOpacity>

						<TouchableOpacity 
							style={styles.btnLogin}
							onPress = { () => navigation.navigate('Registro de Usuario')}
							>
							{/* <Image 
								source = {{uri:'../resources/images/user_login_2.png'}}
								style = {styles.image}
							/> */}
							<FontAwesomeIcon icon={faRegistered} />
							<Text style={styles.textLogin}>Registrarse</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<TouchableOpacity 
							style={styles.btnLogin}
							onPress={() => setViewProfileVisible(!viewProfileVisible)}
							>
							{/* <Image 
								source = {{uri:'../resources/images/user_login_2.png'}}
								style = {styles.image}
							/> */}
							<FontAwesomeIcon icon={faUser} />
							<Text style={styles.textLogin}>
								{userLogin.name}
							</Text>
						</TouchableOpacity>

						<View>
							<TouchableOpacity 
								style={styles.btnLogout} 
								onPress={() => logout()}
								>
								<FontAwesomeIcon icon={faRightFromBracket} />
							</TouchableOpacity>
						</View>
					</View>
				)}
					
				{ (viewProfileVisible && userLogin.user !== 'none') ? (
					<View>
						{ (userLogin.type == 'customer') ? (
							<View style={styles.profile}>
								<ProfileView param={userLogin} />
							</View>
						) : null }

						{ (userLogin.type == 'company') ? (
							<View style={styles.profile}>
								<ProfileView param={userLogin}/>
							</View>
						) : null }
					</View>
				) : null }
			</View>
		</DrawerContentScrollView>
	)
}

const styles = StyleSheet.create({
	barMenu: {
		backgroundColor: '#2ECC71'
	},
	asideMenu: {
		padding: 15,
		backgroundColor: '#2ECC71'
	},
	header: {
		height: 30,
		marginBottom: 25,
	},
	body: {
		flex: 1,
	},
	footer: {
		marginTop: 25,
		borderTopWidth: 1,
		borderTopColor: 'gray',
		paddingVertical: 10,
		// backgroundColor:'#'
	},
	title:{
		fontSize: 20,
		fontWeight: 'bold',
	},
	btnLogin:{
		padding: 10,
		marginTop: 3,
		marginBottom: 15,
		backgroundColor: '#a8ffe5',
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row',
		zIndex: 3,
	},
	btnLogout:{
		position:'absolute',
		bottom:26,
		left:220,
		zIndex: 4,
	},
	textLogin: {
		marginStart: 7,
		fontWeight: 'bold'
	},
	pickImage: {
		width: 5,
		height: 5,
	},
	profile: {
		bottom: 5,
		paddingVertical: 15,
		backgroundColor:'#a8ffe5',
		borderRadius: 15,
	}
});

export default Main;