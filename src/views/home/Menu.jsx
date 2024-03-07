import { 
    AuthContext 
} from '../../context/AuthContext';

import MenuButtonItem from './MenuButtonItem';

import React, { 
	useContext, useEffect 
} from 'react';

import { 
	StyleSheet,
	View, 
	Text, 
	TouchableOpacity,
} from 'react-native';

import { DrawerContentScrollView } from '@react-navigation/drawer';

import { 
	faHome, 
	faUser, 
	faStar, 
	faRegistered,
	faCalendar,
	faScrewdriverWrench,
	faTags,
	faPowerOff
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';

const Menu = ( params ) => {	

	const { navigation } = params;
    const { 
		isLogin, setIsLogin, currentUser, setCurrentUser, setNavigation 
	} = useContext(AuthContext);
	// console.log('currentUser Menu: ', currentUser);

	const logout = () => {
		setIsLogin(false);
        setCurrentUser({
            'guid':'none',
            'name':'none',
            'last':'none',
            'user':'none',
            'pass':'none',
            'type':'none',
            'mail':'none', 
            'docu':'none',
            'celu':'none',
            'logo':'none', 
			'noti':'none', 
        });
	};
	
	useEffect(() => {
        setNavigation(navigation);
		if (!isLogin) {
			navigation.navigate('Inicio');
		}
	}, [isLogin]);
	
	return (
		<LinearGradient
			colors={['#2ECC71', '#D0E4D0', '#dfe4ff']}
			start={{ x: 1, y: 1 }} // Punto de inicio en la esquina superior izquierda
			end={{ x: 0, y: 0 }} // Punto final en la esquina inferior derecha
			style={{ flex: 1 }}
			>
			<DrawerContentScrollView>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>Menú</Text>
				</View>
				{/* Body */}
				<View style={styles.body}>
					<MenuButtonItem 
						icon = {faHome}
						text = "Inicio"
						color = {null}
						onPress = { () => navigation.navigate('Inicio') }
					/>
	
					{(currentUser.type !== 'none') ? (
						<View>
							{ (currentUser.type === 'company') ? (
								<>
									<MenuButtonItem 
										icon = {faCalendar}
										text = "Reservas"
										color = {null}
										onPress = { () => navigation.navigate('Reservas')}
									/>
									<MenuButtonItem 
										icon = {faScrewdriverWrench}
										text = "Servicios"
										color = {null}
										onPress = { () => navigation.navigate('Servicios')}
									/>
									<MenuButtonItem 
										icon = {faTags}
										text = "Promociones"
										color = {null}
										onPress = { () => navigation.navigate('Promociones')}
									/>
								</>
							) : null }
	
							{ (currentUser.type === 'customer') ? (
								<>
									<MenuButtonItem 
										icon = {faCalendar}
										text = "Reservas"
										color = {null}
										onPress = { () => navigation.navigate('Reservas')}
										/>
									<MenuButtonItem 
										icon = {faStar}
										text = "Favoritos"
										color = {null}
										onPress = { () => navigation.navigate('Favoritos')}
										/>
								</>
							) : null }
						</View>
					) : null }
				</View>
				{/* Footer */}
				<View style={styles.footer}>
					<>
						{currentUser.user === 'none' ? (
							<>
								<View>
									<MenuButtonItem 
										icon = {faUser}
										text = {'Iniciar Sesión'}
										color = {null}
										onPress = { () => navigation.navigate('Login')}
									/>
								</View>
	
								<View>
									<MenuButtonItem 
										icon = {faRegistered}
										text = {'Registrarse'}
										color = {null}
										onPress = { () => navigation.navigate('Registro de Usuario')}
									/>
								</View>
							</>
						) : (
							<>
								<View>
									<MenuButtonItem 
										icon = {faUser}
										text = {currentUser.name}
										color = {null}
										// onPress={ () => setProfileVisible(!profileVisible)}
										onPress={ () => navigation.navigate('Perfil de Usuario')}
									/>
								</View>
							</>
						)}
					</>				
					<>
						{currentUser.user === 'admin' ? (
							<TouchableOpacity onPress={() => navigation.navigate('testing')} >
								<Text>pantalla de testing</Text>
							</TouchableOpacity>
						) : ( null )}
					</>
				</View>		
			</DrawerContentScrollView>
	
			{currentUser.user !== 'none' ? (
				<View style={styles.btnLogoutContainer}>
					<TouchableOpacity 
						style={styles.btnLogout} 
						onPress={() => logout()} >
						<FontAwesomeIcon icon={faPowerOff} size={22} />
						<Text style={{ fontWeight:'bold' }}>Cerrar Sesión</Text>
					</TouchableOpacity>
				</View>
			) : null }
		</LinearGradient>	
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	touchMenu: {
		flex: 1,
	},
	header: {
		height: 30,
		marginBottom: 25,
		marginHorizontal: 15,
	},
	body: {
		flex: 1,
		marginHorizontal: 15,
	},
	footer: {
		marginTop: 25,
		borderTopWidth: 1,
		borderTopColor: 'gray',
		paddingVertical: 10,
		marginHorizontal: 15,
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
		// backgroundColor:'#a8ffe5',
		borderRadius: 15,
	},

	btnLogoutContainer: {
		flex: 0.1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#',
		opacity: 50,
		marginHorizontal: 30,
		marginVertical: 30,
		borderRadius: 30,
		// borderWidth: 0.8,
		
	},
	btnLogout:{
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		fontSize: 25
	},


});

export default Menu;