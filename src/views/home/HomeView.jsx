import { 
    AuthContext 
} from '../../context/AuthContext';

import SearchPanel from './SearchPanel';
import RatioPanel from './RatioPanel';
import CompanyPanel from '../users/CompanyPanel';

import MapController from '../../controllers/MapController';
import AlertModal from '../utils/AlertModal';

import React, { 
	useContext, useRef, useState, useEffect
} from 'react';

import { 
	Dimensions,
	StyleSheet,
	Text, 
	View,
	Keyboard,
	Image,
	Modal,
	TouchableOpacity
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';

import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../../views/utils/Functions'; 

import {
	faBuilding, faLocationCrosshairs
} from '@fortawesome/free-solid-svg-icons';
 
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const HomeView = ( params ) => {
	
	const { 
		currentUser, 
		setIdSelected, 
		ratioSelected, 
		setRatioSelected,
		favoriteSelected, 
       	setFavoriteSelected
	} = useContext(AuthContext);

	var { setIsConnected } = params.route.params || {};

	var countMap = 0;

	const mapRef = useRef(null);
	var userLogin = currentUser;
	const navigation = useNavigation();

	// console.log('navigation.getState', navigation.getState());
	// console.log('navigation.goBack', navigation.goBack());

	const [location, setLocation] = useState(null);
	const [companies, setCompanies] = useState([]);
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [orientation, setOrientation] = useState(getOrientation());
	const [showModal, setShowModal] = useState(false);
	const [ratio, setRatio] = useState((ratioSelected !== '' ? ratioSelected : 1));

	const [showRatioPanel, setShowRatioPanel] = useState(true);
	const [favoriteCallout, setFavoriteCallout] = useState(true);

	const fetchData = async () => {
		try {
			if (await MapController.requestLocationPermission() === 'granted') {
				const region = await MapController.getLocation();
				setLocation(region);
				// const organizedCompanies = await MapController.companyLocations(region,1);
				
				MapController.companyLocations(region, ratio)
				.then(companiesReturn => {
					// console.log('companiesReturn', companiesReturn);
					setCompanies(companiesReturn);
					setIsConnected(true);
					countMap++;
				})
				.catch(error => {
					console.log(error);
					AlertModal.showAlert('API','Problemas de Conexión...');
					// alert('Problemas de Conexión...'); 
					setCompanies([]);
					setIsConnected(false);
					countMap = 0;
				});

			} else {
				console.log('No tiene permisos para obtener la ubicación.');
				alert('No tiene permisos para obtener la ubicación.');
			}
		} catch (error) {
			// console.log(error.message);

			if (error.message == 'Permiso de acceso a la ubicación denegado.') {
				// errorPermission();
				AlertModal.showAlert('',error.message);
			} else {
				setIsConnected(false);
			}
			setCompanies([]);
		}
	};

	const handleRatioChange = (value) => {
		console.log('favoriteSelected handleRatio 1',favoriteSelected);
		setFavoriteSelected(null);
		console.log('favoriteSelected handleRatio 2',favoriteSelected);
		var rango = 0.0200;
		if (location !== null) {
			setRatio(value);
			setRatioSelected(value);
			if (value >= 0 && value < 2)
				rango = 0.0200;
			if (value >= 2 && value < 10)
				rango = 0.1100; 
			if (value == 10)
				rango = 0.2200; 
				
			var myLoc = {
				latitude: location.latitude,
				latitudeDelta: rango,
				longitude: location.longitude,
				longitudeDelta: rango
			};
			mapRef.current.animateToRegion(myLoc); 
		}
    };

	const onRegionChange = (region, gesture) => {
		// esta funcion sirve para sacar las coordenadas cuando el mapa se mueve
		// console.log(region, gesture);
	};
	
	const showCompanyLocations = () => {
		if (companies) {
			return companies.map((item, index) => {
				var imgLogo = (item.logo !== '') ? 'data:image/png;base64, '+item.logo : null;
				var empresa = item;
				// console.log(imgLogo);
				return (
					<Marker
						key={index}
						pinColor='#0af'
						coordinate={item.location}
						onPress={() => setSelectedMarker(item)}
						anchor={{ x: 0.5, y: 0.5 }} 
						>

						{imgLogo ? (
							<View>
								<Image source={{ uri: imgLogo }} 
									style={{ 
										width: 35, 
										height: 35, 
										borderWidth: 2, 
										borderRadius: 10, 
										borderColor:'#0af',
										zIndex: 10
									}} />
							</View>
						) : (
							<View>
								<FontAwesomeIcon icon={faBuilding} size={35} 
									style={{ 
										color:'#0af',
										zIndex: 10
									}} />
							</View>
						)}
						
						{userLogin.type === 'customer' ? (
							<Callout 
								style={styles.openCallout}
								onPress={() => handleReservation(userLogin, empresa)} 
								>
								<View style={{ flexDirection:'row', alignContent:'space-between', alignItems:'center' }}>
									<Text style={styles.title}>{item.title}</Text>
									{/* <FontAwesomeIcon style={{ color:'#fa0' }} icon={faStar} /> */}
								</View>
								<Text style={styles.description}>{item.description}</Text>
							</Callout>
						) : (
							<Callout style={styles.openCallout} 
								onPress={() => handleReservation(null, null)} 
								>
								<Text style={styles.title}>{item.title}</Text>  
								<Text style={styles.description}>{item.description}</Text>
								{/* <Text style={{ color:'#f00', fontSize:16, alignSelf:'center' }}>
									Debe ingresar como Cliente
								</Text> */}
							</Callout>
						)}

					</Marker>
				)
			});
		}	
	};

	const removeAccents = (str) => {
		const vocals = {
			'á': 'a', 
			'é': 'e', 
			'í': 'i', 
			'ó': 'o', 
			'ú': 'u',
			'Á': 'A', 
			'É': 'E', 
			'Í': 'I', 
			'Ó': 'O', 
			'Ú': 'U'
		};
	
		var normalizedStr = '';
	
		for (var i = 0; i < str.length; i++) {
			const char = str[i];
			const normalizedChar = vocals[char] || char; // Si no es una vocal con tilde, se deja igual
			normalizedStr += normalizedChar;
		}
	
		return normalizedStr;
	};

	const handleSearch = (query) => {
		try {
			if (query !== '') {

				const vocals = {
					'á': 'a', 
					'é': 'e', 
					'í': 'i', 
					'ó': 'o', 
					'ú': 'u',
					'Á': 'A', 
					'É': 'E', 
					'Í': 'I', 
					'Ó': 'O', 
					'Ú': 'U'
				};
				
				var normalizedQuery = removeAccents(query);
		
				const companiesWithoutAccents = companies.map(company => ({
					...company,
					title: removeAccents(company.title)
				}));

				// console.log(companies);
				// console.log(normalizedQuery);
				
				// const regex = new RegExp(`\\b${query.toLowerCase()}\\b`); 
				// const foundCompanyBasic = companies.find(company => regex.test(company.title.toLowerCase()));

				const foundCompany = companiesWithoutAccents.find(company => 
					company.title.toLowerCase().includes(normalizedQuery.toLowerCase()));
				// console.log(foundCompany);
				if (foundCompany !== null && foundCompany !== undefined) {		
					const newRegion = {
						latitude: foundCompany.location.latitude,
						longitude: foundCompany.location.longitude,
						latitudeDelta: 0.0010,
						longitudeDelta: 0.0010,
					};
					// Centra el mapa en la ubicación de la empresa encontrada
					mapRef.current.animateToRegion(newRegion); 
					Keyboard.dismiss();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleReservation = (userLogin, item) => {
		console.log('item: ', item);

		if (userLogin === null) {
			setShowModal(true);
			setTimeout(() => {
				setShowModal(false);
			}, 6000);
		} else {
			
			var idSelect;

			if (item.idCliente !== undefined && item.idCliente !== '') {
				// console.log('vengo de favorito');
				idSelect = item.idEmpresa;
			} else {
				// console.log('vengo de mapa');
				idSelect = item.id;
			}

			setIdSelected(idSelect);
			// saveCompanyID(idSelect);
			navigation.navigate('Realizar Reserva', idSelect);
		}

	}; 

	const getFavorite = () => {
		if (favoriteSelected !== undefined && 
			favoriteSelected !== null && 
			favoriteSelected !== {}
		) {
			var favoriteCoordinates = {latitude:favoriteSelected.latitude, longitude:favoriteSelected.longitude};
			console.log('favoriteCoordinates',favoriteCoordinates);
			
			if (favoriteCoordinates.latitude !== null
			 && favoriteCoordinates.longitude !== null
			 && favoriteCoordinates.latitude !== undefined 
			 && favoriteCoordinates.longitude !== undefined
			) {

			}
		}
	}

	const favoriteTarget = () => {
		console.log('favoriteSelected',favoriteSelected);

		if (favoriteSelected !== undefined && 
			favoriteSelected !== null && 
			favoriteSelected !== {}
		) {
			var favoriteCoordinates = {latitude:favoriteSelected.latitude, longitude:favoriteSelected.longitude};
			console.log('favoriteCoordinates',favoriteCoordinates);
			
			if (favoriteCoordinates.latitude !== null
			 && favoriteCoordinates.longitude !== null
			 && favoriteCoordinates.latitude !== undefined 
			 && favoriteCoordinates.longitude !== undefined
			) {
				var newCoord = {
					latitude: favoriteCoordinates.latitude,
					longitude: favoriteCoordinates.longitude,
					latitudeDelta: 0.0200,
					longitudeDelta: 0.0200,
				};
				// console.log('newCoord',newCoord);
				mapRef.current.animateToRegion(newCoord); 
				const idEmpresaExistente = companies.some(company => company.id === favoriteSelected.idEmpresa);
				// console.log(idEmpresaExistente);
				return (
					<>
						{/* de esta forma se va directo a la reserva */}
						{/* {handleReservation(userLogin, empresa)} */}

						{!idEmpresaExistente ? (
							<Marker
								pinColor='#0af'
								coordinate={newCoord}
								// onPress={() => {
								// 	setSelectedMarker(item)
								// }}
								anchor={{ x: 0.5, y: 0.5 }} 
								>
			
								<View>
									<FontAwesomeIcon style={{ 
										color:'#fa0', borderColor:'#0af', borderWidth: 1, zIndex: 1
										}} icon={faBuilding} size={35} />
								</View>
			
								{userLogin.type === 'customer' ? (
									<Callout 
										style={styles.openCallout}
										onPress={() => handleReservation(userLogin, favoriteSelected)} 
										>
										<View style={{ flexDirection:'row', alignContent:'space-between', alignItems:'center' }}>
											<Text style={styles.title}>{favoriteSelected.razonSocial}</Text>
										</View>
										<Text style={styles.description}>{favoriteSelected.descripcionEmpresa}</Text>
									</Callout>
								) : (
									<Callout style={styles.openCallout} 
										onPress={() => handleReservation(null, null)} 
										>
										<Text style={styles.title}>{item.title}</Text>  
										<Text style={styles.description}>{item.description}</Text>
										{/* <Text style={{ color:'#f00', fontSize:16, alignSelf:'center' }}>
											Debe ingresar como Cliente
										</Text> */}
									</Callout>
								)}
								
							</Marker>
						) : null }
					</>
				);
			}
		}
	}
	
	const myLocation = async () => {
		try {
			const newRegion = {
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.0200,
				longitudeDelta: 0.0200,
			};
			// Centra el mapa en la ubicación de la empresa encontrada
			mapRef.current.animateToRegion(newRegion); 
			Keyboard.dismiss();
		} catch (error) {
		  	console.error('Error to set Location Device:', error);
		}
	};

	useEffect(() => {
		
		if (ratioSelected > 5) {
			setRatio(ratioSelected);
		}
  
		fetchData();
		setShowModal(false);

		const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                // console.log('Teclado abierto');
				setShowRatioPanel(false);
            }
        );     
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // console.log('Teclado cerrado');
				setShowRatioPanel(true);
            }
        );
		
	}, [favoriteSelected, ratio, countMap]);

	return (
		<View style={styles.container}>
			{userLogin.type === 'company' ? (
				<>
					<CompanyPanel dataCompany={userLogin} />
				</>
			) : (
				<>
					<View style={styles.search}>
						<SearchPanel 
							onSearch={handleSearch} 
							mapRef={mapRef} 
							width={width}
							height={height}
							/>
					</View>
			
					<View style={{
							position:'absolute',
							top: -43,
							right: 14,
							zIndex: 90,
							// padding: 5
						}}>
						<TouchableOpacity style={{ flex:1,padding:6.2,borderRadius:15, backgroundColor:'#fff' }} 
							onPress={() => myLocation()}>
							<FontAwesomeIcon icon={faLocationCrosshairs} color={'#442'} size={24} />
						</TouchableOpacity>
					</View>

					<MapView
						ref={mapRef}
						style={ orientation === 'portrait' 
							? styles.mapPortrait : styles.mapLandscape 
						}
						tintColor={'#150'}
						onRegionChange={onRegionChange}
						initialRegion={location}
						zoomEnabled={true}
						zoomControlEnabled={true}
						mapType={"standard"}
						showsUserLocation={true}
						showsMyLocationButton={false}
						showsCompass={false}

						// followsUserLocation={true}
						// paddingAdjustmentBehavior="automatic"
						// minZoomLevel={0.0100}
						// maxZoomLevel={0.0300}
						>
						{showCompanyLocations()}

						{ favoriteSelected !== undefined && 
						  favoriteSelected !== null && 
						  favoriteSelected !== {}
						? (
							favoriteTarget()
						) : null }
					</MapView>
					
					{showRatioPanel ? (
						<View style={orientation === 'portrait' ? styles.ratioPanelPortrait : styles.ratioPanelLandscape}>
							<RatioPanel 
								onRatioChange={(newRatio) => handleRatioChange(newRatio)} 
								setRatio={setRatio}
								ratio={ratio}
								/>
						</View>	
					) : null }
				</>
			)}

			<>
				<Modal
					visible={showModal} // showModal
					animationIn="slideInLeft" 
					animationOut="slideOutLeft" 
					animationType='fade'
					transparent={true}
					>
					<TouchableOpacity onPress={ () => setShowModal(false) }>
						<Text style={styles.alertNoLogin}> 
							Debe ingresar como Cliente para poder realizar reservas
						</Text>
					</TouchableOpacity>
				</Modal>
			</>
		</View>
	);
	
};

const styles = StyleSheet.create({
	container: {
		flex: 0.92,
		alignItems: 'center',
		justifyContent: 'center',
	},
	search: {
		position:'absolute',
        zIndex: 90,
        top: -77,
		width:'80%',
		// backgroundColor:'#000'
    },
	mapPortrait: {
		width: width,
		height: height,
	},
	mapLandscape: {
		flex: 2,
		width: width-1,
		height: height-1,
		margin: 1,
		padding: 1,
	},
	modal: {
		width: 360,
		height: 220,
		alignSelf: 'center',
		marginHorizontal: 40,
		marginVertical: 220,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 20,
		borderColor: 'green',
		borderWidth: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},

	openCallout: {
		width: 210,
		height: 175,
	},
	closedCallout: {
		width: 0,
		height: 0,
	},

	rowCallout: {
		flexBasis: 50,
	},

	title: {
		fontSize: 20,
		alignSelf:'center',
		marginTop: 3,
		color: '#21B081'
	},
	description: {
		flex: 1,
		width:'100%',
		alignSelf:'center',
		// marginLeft: 3,
		// marginRight: 3,
		paddingBottom: 1,
		color: '#011'
	},

	conrolPanel: {
		flex: 1,
	},
	ratioPanel: {
		position:'absolute',
		top: '90%',
    	left: '24%',
		zIndex: 2
	},
	ratioPanelPortrait: {
		position: 'absolute',
		top: '96%',
		left: '24%',
		zIndex: 2,
	},	
	ratioPanelLandscape: {
		position: 'absolute',
		top: '78%',
		left: '1%',
		zIndex: 2,
	},

	marker: {
		width: 1,
		height: 1,
	},

	row: {
		flexDirection:'row',
	},

	alertNoLogin: {
		marginHorizontal:60,
		marginVertical:65,
		color:'#f20', 
		fontSize:16,
		fontWeight:'bold',
		textAlign:'center',
		padding: 12,
		backgroundColor:'#fff',
		borderRadius:10
	}
})

export default HomeView;