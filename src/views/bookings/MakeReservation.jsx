import { 
    AuthContext 
} from '../../context/AuthContext';

import ServicesController from '../../controllers/ServicesController';
import UsersController from '../../controllers/UsersController';
import FavoritesController from '../../controllers/FavoritesController';
import AlertModal from '../utils/AlertModal';
import CalendarSelector from './CalendarSelector';

import { useNavigation } from '@react-navigation/native';

import React, { 
	useContext, useState, useEffect, useRef 
} from 'react';

import { 
	StyleSheet, 
	View, 
	ScrollView, 
	RefreshControl,
	ActivityIndicator,
	TouchableOpacity,
	Text
} from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
	faStar
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';

const MakeReservation = ( params ) => {
	
	var idSelect = params.route.params;
	console.log('Seleccion de ID:',idSelect);

	const navigation = useNavigation();
	const { currentUser } = useContext(AuthContext);
	var user = currentUser;
	// console.log('user: ', user);
	const scrollViewRef = useRef(null);

	const [days, setDays] = useState([]);

	const [company, setCompany] = useState({});
	const [service, setService] = useState({});

	const [isLoading, setIsLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const [favorite, setFavorite] = useState(false);
	const [idFavorite, setIdFavorite] = useState(null);


	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			fetchData();
			setRefreshing(false);
			setInforVisible(true);
			setCalendarVisible(true);
			setSchedulesVisible(false);
			navigation.navigate('Realizar Reserva');
			console.log('refreshing',refreshing);
		}, 2000);
	}, []);
	
	const isFavorite = (serv_id) => {
		if (serv_id !== '' && serv_id !== undefined) {
			console.log('isFavorite');
			if (user.guid !== 'none') {
				FavoritesController.getFavorite(user.guid,serv_id)
				.then(favoReturn => {
					if (favoReturn) {
						setIdFavorite(favoReturn);
						setFavorite(true);
					} else {
						setIdFavorite('');
						setFavorite(false);
					}
				})
				.catch(error => {
					console.log('error isFavorite', error);
					AlertModal.showAlert('ERROR',JSON.stringify(error));
				});
			}
		}
	}

	const switchFavorite = (idServicio) => {

		console.log('idServicio',idServicio);
		console.log('idFavorite',idFavorite);

        var idCliente = user.guid;

		if (idFavorite !== '' && idFavorite !== null) {
			FavoritesController.handleFavoriteDelete(idFavorite)
			.then((favoReturn) => {
				console.log('favoReturn delete: ', favoReturn);
				setFavorite(false);
			})
			.catch(error => {
				console.log('error delete: ',error);
				AlertModal.showAlert('ERROR',JSON.stringify(error));
			});
		} else {
			FavoritesController.handleFavoriteCreate({idCliente,idServicio})
			.then(favoReturn => {
				console.log('favoReturn create: ', favoReturn);
				setFavorite(true);
			})
			.catch(error => {
				console.log('error create: ',error);
				AlertModal.showAlert('ERROR',JSON.stringify(error));
			});
		}
    };

	const fetchData = async () => {
		try {
			setIsLoading(true);
			// const id = await AsyncStorage.getItem('selectedCompanyID');
			// console.log('id: ', id);
		
			if ((idSelect !== null) && (idSelect !== '')) {
		
				const [companyReturn, serviceReturn] = await Promise.all([
					UsersController.getCompanyData(idSelect),
					ServicesController.getServicesForCompany(idSelect)
				]);
		
				if (companyReturn !== null) {
					setCompany(companyReturn);
				}
		
				if (serviceReturn !== null) {
					setService(serviceReturn);
					setDays(JSON.parse(serviceReturn.jsonDiasHorariosDisponibilidadServicio));
					
					setTimeout(() => {
						isFavorite(serviceReturn.id);
					}, 200);
				} else {
					setService(null);
				}
		
				setIsLoading(false);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			setIsLoading(false);
			// Manejar errores aquí
		}
	};

	useEffect(() => {
		fetchData();
	}, [idFavorite, idSelect, user]);

	return (
		<> 
			{isLoading ? ( <ActivityIndicator size={20} color="#0000ff" /> ) : (
				<>
					<ScrollView 
						contentContainerStyle={styles.container}
						ref={scrollViewRef}
						// refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  /> } 
						>
						{service !== null ? (
							<>
								<View style={{ flex:1 }}>
									<View style={styles.row}>		
										<Text style={styles.label}>Razón Social: </Text>					
										<Text style={styles.value}>{company.razonSocial}</Text>
									</View>

									<View style={{ 
										flex: 1,
										alignContent:'flex-end',
										alignItems:'flex-end',
										position:'absolute',
										left: 0, right: 5, top: 0, bottom: 0
										}}>

										{ service !== null ? (
											<TouchableOpacity
												style={{ flexDirection:'row', alignItems:'center', }} 
												onPress={() => switchFavorite(service.id)} >
												<FontAwesomeIcon icon={faStar} color={favorite ? '#fa0' : 'black'} size={30} />
											</TouchableOpacity>
										) : null}
										
									</View>
							
									<View style={styles.row}>
										<Text style={styles.label}>Descripción: </Text>
										<Text style={styles.value}>{company.descripcion}</Text>
									</View>

									<View style={styles.row}>
										<Text style={styles.label}>Rubro: </Text>
										<Text style={styles.value}>{company.rubro}</Text>
									</View>

									<View style={styles.row}>
										<Text style={styles.label}>Dirección: </Text>
										<Text style={styles.value}>{company.direccion}</Text>
									</View>
							
									<View style={styles.row}>
										<Text style={styles.label}>Servicio: </Text>
										<Text style={styles.value}>{service.nombre}{"\n"}{service.descripcion}</Text>
									</View>

									<View style={styles.row}>
										<Text style={styles.label}>Costo: </Text>
										<Text style={styles.value}>$ {service.costo}</Text>
									</View>

									<View style={styles.row}>
										<Text style={styles.label}>Turnos: </Text>
										{service.duracionTurno === 30 ? (
											<Text style={styles.value}>De {service.duracionTurno} minutos</Text>
										) : 
											<Text style={styles.value}>De {service.duracionTurno} hora</Text>
										}
									</View>

									<View style={styles.row}>
										<Text style={styles.label}>Dias: </Text>

										<View style={{ flexDirection: 'row', flexWrap: 'wrap', width:'80%' }}>
											{days !== null ? (
												Object.keys(days).map((day, index) => (
													<View key={index}>
														{ days[day].horaInicio !== null && days[day].horaFin !== null ? (
															<Text key={index}> {day} </Text>
														) : null }
													</View>
												))
											) : (
												<Text>No hay días definidos</Text>
											)}
										</View>
									</View>
												
									<View>
										<CalendarSelector company={company} service={service} navigation={navigation} />
									</View>
									
								</View>
							</> 
						) : (
							<>
								<View style={styles.span}>
									<Text style={{fontWeight:'bold'}}>Esta empresa aún no publicó un Servicio.</Text>
								</View>
							</>
						)}
					</ScrollView>

					<LinearGradient 
						colors={['#dfe7ff', '#238162', '#135000' ]} 
						style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} >
						<TouchableOpacity onPress={() => navigation.navigate('Inicio')} >
							<Text style={{ fontWeight:'bold', color:'#fff' }}>VOLVER</Text>
						</TouchableOpacity>
					</LinearGradient>
				</>
			)} 
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#dfe7ff',
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

	body: {
		margin: 1,
		backgroundColor:'#dfe7ff',
	},

	row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
		paddingVertical: 2, 
    },

    column: {
        flex: 1,
        paddingHorizontal: 5,
    },
    space: {
        width: 20
    },
	label: {
        fontWeight:'bold',
    },
    value: {
        fontWeight:'normal',
    },
	span: {
		flex: 1,
		fontSize: 15,
        fontWeight:'bold',
		padding: 20,
		alignItems:'center',
    },
});

export default MakeReservation;