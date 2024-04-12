import { 
    AuthContext 
} from '../../context/AuthContext';

import MenuButtonItem from './MenuButtonItem';

import React, { 
	useContext, useEffect, useState
} from 'react';

import { 
	StyleSheet,
	View, 
	Text, 
	TouchableOpacity,
	Modal
} from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import { 
	faHome, 
	faUser, 
	faStar, 
	faRegistered,
	faCalendar,
	faScrewdriverWrench,
	faTags,
	faPowerOff,
	faCircleInfo
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ( params ) => {	
	
	[showModalInfo, setShowModalInfo] = useState(false);
	
	const { navigation } = params;
	const { isConnected } = params.params;
    const { 
		isLogin, setIsLogin, currentUser, setCurrentUser, setNavigation , setRatioSelected, setFavoriteSelected
	} = useContext(AuthContext);
	// console.log('currentUser Menu: ', currentUser);

	const clearCache = async () => {
		try {
			await AsyncStorage.clear();
			console.log('Cache cleared successfully.');
		} catch (error) {
		  	console.error('Error clearing cache:', error);
		}
	};

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
		setRatioSelected(1);
		setFavoriteSelected({});
		clearCache();

		/**
		 * Hay dos metodos diferentes para resetear la navegacion, en esta ocasión cualquiera funciona
		 */
		// console.log('CommonActions',CommonActions);
		navigation.dispatch(CommonActions.reset({
			index: 0,
			routes: [{ name: 'Inicio' }]
		}));

		// antes
		// navigation.reset({
		// 	index: 0,
		// 	routes: [
		// 	  { name: 'Inicio' },
		// 	],
		// });
		setNavigation(navigation);
	};
	
	const viewInfo = async () => {
		// setShowModalInfo(true)
		
	};

	useEffect(() => {
		console.log('isConnected menu',isConnected);
		setShowModalInfo(false);
        setNavigation(navigation);
		if (!isLogin) {
			navigation.navigate('Inicio');
		}
		setTimeout(() => {
			if (!isConnected) {
				navigation.navigate('BaseError', { errorType:'api', navigation });
			}
		}, 1000);
	}, [isLogin, isConnected]);
	
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
					<TouchableOpacity style={{ margin: 5 }} onPress={ () => viewInfo() }>
						<FontAwesomeIcon icon={faCircleInfo} color={'#000'}/>
					</TouchableOpacity>

					{/* <Modal
						visible={showModalInfo} 
						transparent={true}
						animationIn="slideInRight" 
						animationOut="slideOutRight"  
						>
						<View style={{ 
							borderRadius: 10,
							paddingHorizontal:85, 
							paddingVertical:90 
							}}>	
						</View>
					</Modal> */}
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
	header: {
		height: 30,
		marginBottom: 25,
		marginHorizontal: 15,
		flexDirection:'row',
		justifyContent:'space-between'
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