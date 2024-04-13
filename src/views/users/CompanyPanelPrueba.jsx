import { 
    AuthContext 
} from '../../context/AuthContext';

import { getBase64FromUri, loadImageFromBase64 } from '../utils/Functions'

import * as ImagePicker from "expo-image-picker";

import MenuButtonItem from '../home/MenuButtonItem';
import MapController from '../../controllers/MapController';
import UsersController from '../../controllers/UsersController';
import AlertModal from '../utils/AlertModal';

import React, { 
    useContext, useState, useEffect
} from 'react';

import { 
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Keyboard,
    Image,
    RefreshControl,
    Modal
} from 'react-native';

// import { geocodeAsync } from 'expo-location';

import { 
	faImage
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const CompanyPanel = () => {

    const { currentUser, setCurrentUser, navigation, setUser } = useContext(AuthContext);
    console.log(currentUser);
    // const navigation = useNavigation();

    // const [user, setUser] = useState(currentUser);

    const [guid, setGuid] = useState(currentUser.guid);
    const [type, setType] = useState(currentUser.type);
    const [username, setUsername] = useState(currentUser.user);
    const [firstname, setFirstname] = useState(currentUser.name);
    const [lastname, setLastname] = useState(currentUser.last);
    const [movil, setMovil] = useState(currentUser.celu);
    const [email, setEmail] = useState(currentUser.mail);
    const [isChecked, setChecked] = useState((currentUser.noti === 'True' ? true : false));
    
    const [rut, setRut] = useState(currentUser.rut);
    const [owner, setOwner] = useState(currentUser.owner);
    const [businessName, setBusinessName] = useState(currentUser.businessName);
    const [category, setCategory] = useState(currentUser.category);
    const [address, setAddress] = useState(currentUser.address);
    const [city, setCity] = useState(currentUser.city);
    const [description, setDescription] = useState(currentUser.description);
    
    const [logoBase, setLogoBase] = useState(currentUser.logo);
    const [logoUrl, setLogoUrl] = useState(loadImageFromBase64(currentUser.logo));
    const [selectedPicture, setSelectedPicture] = useState(null);

    const [location, setLocation] = useState({latitude:currentUser.latitude, longitude:currentUser.longitude});

    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSaveButtom, setShowSaveButtom] = useState(true);
    

    const captureLocation = async () => {
        try {
            if (await MapController.requestLocationPermission() === 'granted') {
                const region = await MapController.getLocation();
                setLocation(region);
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 4000);
            } else {
                AlertModal.showAlert('No tiene permisos para obtener la ubicación.','');
            }
        } catch (error) {
            console.log('ERROR captureLocation: '+error);
        }
    };

    const saveDataCompany = async () => {

        const formData = {
            guid,
			rut,
			owner,
			businessName,
			category,
			address,
			city,
			description,
            location,
            logoBase
		};

		UsersController.handleCompanyUpdate(formData)
		.then(dataReturn => {
			if (dataReturn) {
				AlertModal.showAlert('Envio Exitoso', 'Datos de la empresa Actualizados.');  
                setUser({
                    guid: currentUser.guid,
                
                    name: currentUser.firstname,
                    last: currentUser.lastname,
                    pass: currentUser.pass,
                    user: currentUser.user,
                    celu: currentUser.movil,
                    mail: currentUser.email,
                   
                    noti: true,
                    type: currentUser.type,

                    rut: formData.rut,
                    businessName: formData.businessName,
                    owner: formData.owner,
                    category: formData.category,
                    address: formData.address,
					city: formData.city,
                    description: formData.descripcion,
                    latitude: formData.location.latitude,
					longitude: formData.location.longitude,
                    logo: (formData.logoBase === null || formData.logoBase === '') ? 'none' : formData.logoBase,
                });
			}
		})
		.catch(error => {
			AlertModal.showAlert('Ocurrió un Error', error);
		});
    };

    let openLogoPickerAsync = async () => {

		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (permissionResult.granted === false) {
			AlertModal.showAlert('Se requiere permisos de acceso a la camara.', '');
			return;
		}

		// const pickerResult = await ImagePicker.launchImageLibraryAsync()

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            quality: 0.1, // Puedes ajustar este valor según tus necesidades (0.0 - 1.0)
        });

		// eslint-disable-next-line
		if (!pickerResult.canceled) {
            const uri = pickerResult.assets[0].uri;
            const base64 = await getBase64FromUri(uri);
            // console.log(base64);
            setLogoBase(base64);
            setSelectedPicture(uri);
		}
	}

    let openImageSavedAsync = async () => {
        const storedImageUri = await AsyncStorage.getItem(username);
        // console.log(storedImageUri);
        if (storedImageUri) {
            setSelectedPicture(storedImageUri);
        }
    }

    const handleImagePicker = () => {
		openLogoPickerAsync();
	};

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            // setUser(currentUser);

            // setRut(currentUser.rut);
            // setOwner(currentUser.owner);
            // setBusinessName(currentUser.businessName);
            // setCategory(currentUser.category);
            // setAddress(currentUser.address);
            // setCity(currentUser.city);
            // setDescription(currentUser.description);
            // setLocation({latitude:currentUser.latitude, longitude:currentUser.longitude});
            
            // setLogoBase(currentUser.logo);
            // setLogoUrl(loadImageFromBase64(currentUser.logo));
            // setSelectedPicture(logoUrl); 

            setShowModal(false);
            setShowSaveButtom(true);

            navigation.navigate('Inicio');
		}, 2000);
	}, []);

	useEffect(() => {

        // setUser(currentUser);

        setRut(currentUser.rut);
        setOwner(currentUser.owner);
        setBusinessName(currentUser.businessName);
        setCategory(currentUser.category);
        setAddress(currentUser.address);
        setCity(currentUser.city);
        setDescription(currentUser.description);
        setLocation({latitude:currentUser.latitude, longitude:currentUser.longitude});    
        
        setLogoBase(currentUser.logo);
        setLogoUrl(loadImageFromBase64(currentUser.logo));
        setSelectedPicture(logoUrl);  
        
        setShowModal(false);
        setShowSaveButtom(true);

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                // console.log('Teclado abierto');
				setShowSaveButtom(false);
            }
        );     
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', () => {
                // console.log('Teclado cerrado');
				setShowSaveButtom(true);
            }
        );

        setTimeout(() => {
            if ((location.latitude === '' || location.latitude === 0)
             && (location.longitude === '' || location.longitude === 0)
            ) {
                AlertModal.showAlert('','Tu empresa no se verá en el mapa hasta que captures tu ubicación y la guardes.\nRequerde que al captar la ubicación de su empresa, debe estar fisicamente en la misma, dado que la ubicación se capta del dispositivo.');
            }
        }, 3000);

	}, [currentUser]);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#dfe4ff', '#238162', '#2ECC71']} >
                
                <View style={styles.header}>
                    <Text style={styles.textHeader}> Panel de Gestión </Text>
                </View>

                <View style={styles.body}>
                    <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
        
                        <View style={styles.row}>
                            
                            <View style={styles.space}>
                            </View> 
        
                            <View style={styles.columnB}>
                                <View style={styles.btnCaptureLocation}>
                                    <MenuButtonItem 
                                        icon = {null}
                                        type = {'capture'}
                                        text = {'Captar Ubicación'}
                                        onPress={() => captureLocation()}
                                    />
                                </View>
                            </View> 
        
                            <View style={styles.columnV}>
                                <View style={{ marginHorizontal:5, marginBottom:12 }}>    
                                    <Text style={styles.txtCoord}>Coordenadas:</Text>
                                    <View style={{ flexDirection:'row' }}>
                                        {(location !== null) ? (
                                            <>
                                                <Text style={styles.txtLat}> Lat:{location.latitude}</Text>
                                                <Text style={styles.txtLng}> Lng:{location.longitude}</Text>
                                            </>
                                        ) : 
                                            <>
                                                <Text style={styles.txtLat}> Lat:</Text>
                                                <Text style={styles.txtLng}> Lng:</Text>
                                            </>
                                        }
                                    </View>
                                </View>
                            </View>

                            {/* <View style={{ 
                                marginRight: 20,
                                padding: 1,
                                color:'#05f' 
                                }}>
                                <TouchableOpacity onPress={() => viewMyLocation()} > 
                                    <Text>Ver</Text>
                                </TouchableOpacity> 
                            </View> */}
                        </View> 
        
                        <View style={styles.row}>
                            <View style={styles.columnT}>
                                <Text style={styles.dataLabel}>RUT:</Text>
                                <Text style={styles.dataLabel}>Razón Social:</Text>
                                <Text style={styles.dataLabel}>Propietario:</Text>
                                <Text style={styles.dataLabel}>Rubro:</Text>
                                <Text style={styles.dataLabel}>Ciudad:</Text>
                                <Text style={styles.dataLabel}>Dirección:</Text>
                            </View> 
                            <View style={styles.columnV}>
                                <TextInput 
                                    editable={false}
                                    keyboardType="numeric"
                                    style={styles.dataEdit} 
                                    value={rut}
                                    onChangeText={setRut}
                                    />
                                <TextInput 
                                    style={styles.dataEdit} 
                                    value={businessName}
                                    onChangeText={setBusinessName}
                                    />
                                <TextInput 
                                    style={styles.dataEdit} 
                                    value={owner}
                                    onChangeText={setOwner}
                                    />
                                <TextInput 
                                    style={styles.dataEdit} 
                                    value={category}
                                    onChangeText={setCategory}
                                    />
                                <TextInput 
                                    style={styles.dataEdit} 
                                    value={city}
                                    onChangeText={setCity}
                                    />
                                <TextInput 
                                    style={styles.dataEdit} 
                                    value={address}
                                    onChangeText={setAddress}
                                    />
                            </View>
                        </View> 
                        
                        <View style={styles.row}>
                            <SafeAreaView>
                                <Text style={{fontWeight:'bold',paddingHorizontal:23, marginVertical:3, marginTop:10, paddingVertical:5, }} > 
                                    Descripción de la empresa:</Text>
                                <TextInput 
                                    style={styles.dataEditDesc} 
                                    value={description}
                                    multiline={true}
                                    onChangeText={setDescription}
                                    />
                            </SafeAreaView>
                        </View> 
        
                        <View style={styles.row}>
                            <Text style={{ fontWeight:'bold', paddingHorizontal:23, marginVertical:3, marginTop:1, paddingVertical:5, }} > 
                                Logo:</Text>
                        </View>
                
                        <View>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity 
                                    style={styles.buttonImage}
                                    onPress={ () => handleImagePicker() } > 	
                                    <View>
                                        { (selectedPicture === 'data:image/png;base64,none' || selectedPicture === 'data:image/png;base64,undefined' ) ? (
                                            <>
                                                <Image 
                                                    style={{ width: 160, height: 120, }} 
                                                    source={require('../../../assets/emptyImage.png')}
                                                    />
                                            
                                                {/* <FontAwesomeIcon 
                                                    size={120} 
                                                    icon={faImage} 
                                                    color={'#0a7a75'}
                                                    /> */}
                                            </>
                                        ) : 
                                            <Image 
                                                style={styles.image} 
                                                source={{ uri: selectedPicture }} 
                                                />
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                   
                           
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'center'
                        }}>
                            <Text style={{ 
                                top:-5,
                                fontWeight:'bold',
                                color: '#000',
                                }} >* Pulse en el recuadro para cargar su logo</Text>
                        </View>

                    </ScrollView>

                    {showSaveButtom ? (
                        <View style={styles.saveButton}>
                            <MenuButtonItem 
                                icon = {null}
                                type = {'panel'}
                                text = {'Guardar'}
                                onPress={() => saveDataCompany()} />
                        </View>
                    ): null}

                    <>
                        <Modal
                            visible={showModal} 
                            transparent={true}
                            animationIn="slideInRight" 
                            animationOut="slideOutRight"  
                            // animationType="fade" 
                            >
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'center',
                                textAlign:'center',
                                backgroundColor:'#fff',
                                marginHorizontal:50, 
                                marginVertical:40,
                                padding: 5,
                                borderRadius:10
                                }}>	
                                <Text>Se estableció su posición actual como ubicación para su Empresa.</Text>
                            </View>
                        </Modal>
                    </>

                </View>

            </LinearGradient>
        </View>
    );
}

var styles = StyleSheet.create({
    container: {
        top:-8,
        width:width,
        height:height,
        flexDirection:'column',
    },
    header: {
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        // borderTopWidth: 2,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderColor: '#fff',
    },
    textHeader: {
        color: '#000',
        fontWeight:'bold',
        // fontStyle:'',
        padding: 10,
        fontSize: 20,
    },
    body: {
        height: height-50,
        // marginTop: 20,
        marginHorizontal: 15,
        // borderRadius: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribuir en dos columnas
        alignItems: 'center', // Alinear verticalmente al centro
        paddingHorizontal: -10, // Espacio horizontal
        // borderBottomWidth: 1 ,
        // borderBottomColor: '#fff'
    },
    column: {
        flex: 1, // Ocupar espacio igual en ambas columnas
        paddingHorizontal: 5, // Espacio horizontal entre columnas
    },
    columnB: {
        flex: 0.75, 
        paddingHorizontal: 2, 
    },
    columnT: {
        flex: 0.65, 
        paddingHorizontal: 3, 
    },
    columnV: {
        flex: 1, 
        paddingHorizontal: 3,
    },
    space: {
        width: 12
    },
    btnCaptureLocation: {
        marginVertical: 6,
        // marginHorizontal: 10,
    },
    txtbtnCapture: {
        color: '#fff',
    },
    txtCoord: {
        fontSize:15,
        fontWeight: 'bold',
    },
    txtLat: {
        left: -5,
        fontSize:13,
        color:'#05f'
    },
    txtLng: {
        left: -3,
        fontSize:13,
        color:'#05f'
    },
    dataLabel: {
        fontWeight:'bold',
        paddingHorizontal:20,
        marginVertical:3,
        // textAlign: 'right',
        paddingVertical:5,
    },
    dataEdit: {
        marginHorizontal:-10,
        marginVertical:3,
        marginRight:8,
        backgroundColor:'#fff',
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    dataEditDesc: {
        width:width-55,
        height:130,
        marginVertical:3,
        marginBottom:10,
        marginHorizontal:15,
        backgroundColor:'#fff',
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    imageContainer: {
        top:-10,
        marginHorizontal:15,
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
    },
    buttonImage: {
        // ...
    },
    image: {
        flex: 1,
        height: 120,
        width: 160,
        padding: 5,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    saveButton: {
        marginTop:-30,
        marginHorizontal: 10,
        marginVertical: 5
    },
});

export default CompanyPanel;