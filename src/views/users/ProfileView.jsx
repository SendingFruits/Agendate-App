import { 
    AuthContext 
} from '../../context/AuthContext';

import {
    validarCedula,
    getBase64FromUri, 
    loadImageFromBase64 
} from '../utils/Functions'

import UsersController from '../../controllers/UsersController';
import AlertModal from '../utils/AlertModal';
import MenuButtonItem from '../home/MenuButtonItem';
import CheckBox from '../utils/CheckBox';
import EditMovil from '../utils/EditMovil';

import React, { 
    useState, useEffect, useContext 
} from 'react';

import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from "expo-image-picker";

import {
    Dimensions,
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';

import { 
	faCircleUser, faBan
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ProfileView = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext);
    // console.log('currentUser',currentUser);
    const navigation = useNavigation();

    const [user, setUser] = useState(currentUser);

    const [guid, setGuid] = useState(currentUser.guid);
    const [type, setType] = useState(currentUser.type);
    const [docu, setDocu] = useState(currentUser.docu);
    const [username, setUsername] = useState(currentUser.user);
    const [firstname, setFirstname] = useState(currentUser.name);
    const [lastname, setLastname] = useState(currentUser.last);
    const [movil, setMovil] = useState(currentUser.celu);
    const [email, setEmail] = useState(currentUser.mail);
    const [isChecked, setChecked] = useState((currentUser.noti === 'True' ? true : false));

    const [logoBase, setLogoBase] = useState(currentUser.logo);
    const [logoUrl, setLogoUrl] = useState(loadImageFromBase64(currentUser.logo));
    const [selectedPicture, setSelectedPicture] = useState(null);
    
    const [isValidDocu, setIsValidDocu] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(true);
    
    const [refreshing, setRefreshing] = useState(false);
    const [showButtons, setShowButtons] = useState(true);


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

    const handlerCedula = (ci) => {
        setDocu(ci);
        if (ci !== '') {
            // console.log(validarCedula(ci));
            setIsValidDocu(validarCedula(ci));
        }
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleEmailChange = (text) => {
		setEmail(text);
		setIsValidEmail(validateEmail(text));
	};

    const handleImagePicker = () => {
		openLogoPickerAsync();
	};

    let openLogoPickerAsync = async () => {
        try {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
            // console.log(permissionResult.granted);
            if (permissionResult.granted === false) {
                AlertModal.showAlert('Camara', 'Se requiere permisos de acceso a la camara.');
                return;
            }
    
            const pickerResult = await ImagePicker.launchImageLibraryAsync()
            // eslint-disable-next-line
            if (!pickerResult.canceled) {
                const uri = pickerResult.assets[0].uri;
                const base64 = await getBase64FromUri(uri);
                // console.log(base64);
                setLogoBase(base64);
                setLogoUrl(uri);
                setSelectedPicture(uri);
                // await AsyncStorage.setItem(username, newSelectedImage);
            }
            
        } catch (error) {
            AlertModal.showAlert('Error al manejar la selección de imagen. ', error);
        }
	}

    let openImageSavedAsync = async () => {
        try {
            const storedImageUri = await AsyncStorage.getItem(username);
            // console.log('storedImageUri: ', storedImageUri);
            if (storedImageUri) {
                setSelectedPicture(storedImageUri);
                setLogoUrl(storedImageUri);
            }
        } catch (error) {
            AlertModal.showAlert('Error al cargar imagen. ', error);
        }
    }

    const updateData = () => {
        
        // var check = 'False';
        // if (isChecked) {
        //     check = 'True';
        // }
        // console.log('isChecked',isChecked);

        const formData = {
            guid,
            docu,
			firstname,
			lastname,
            pass: user.pass,
            user: user.user,
			movil,
            email,
            foto:logoBase,
            recibe:isChecked,
            type: type
		};

        // console.log('formData', formData.recibe);
        UsersController.handleUpdate(formData,currentUser.type)
        .then(userReturn => {
            var user = (userReturn === '') ? true : false; 
			if (user) {
                AlertModal.showAlert('', 'Los datos del usuario se han actualizado.');
                setCurrentUser({
                    guid: formData.guid,
                    docu: formData.docu,
                    name: formData.firstname,
                    last: formData.lastname,
                    pass: formData.pass,
                    user: formData.user,
                    celu: formData.movil,
                    mail: formData.email,
                    logo: formData.foto,
                    noti: formData.recibe,
                    type: formData.type,
                });
                // console.log('currentUser', currentUser);
                // onRefresh(formData);
			}
		})
		.catch(error => {
			AlertModal.showAlert('ERROR', error);
		});
	};

    const updatePass = () => {
        navigation.navigate('Password');
	};

    const deleteAccount = () => {
        var text = "¿Está seguro que desea eliminar su cuenta?";
        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			// console.log('alertRes: ', alertRes);
			if (alertRes) {
                UsersController.handleDelete(user.guid)
                .then(resDelete => {
                    // console.log('userReturn: ', userReturn);
                    if (resDelete) {
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
                        
                        AlertModal.showAlert('La cuenta fue eliminada');
                        // onRefresh();
                        navigation.navigate('Inicio');
                    }
                })
                .catch(error => {
                    AlertModal.showAlert(error);
                });
            }
		})
		.catch(error => {
			AlertModal.showAlert('ERROR', error);
		});
	};

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            
            setGuid(currentUser.guid);
            setType(currentUser.type);
            setDocu(currentUser.docu);
            setUsername(currentUser.user);
            setFirstname(currentUser.name);
            setLastname(currentUser.last);
            setMovil(currentUser.celu);
            setEmail(currentUser.mail);
            setChecked((currentUser.noti === 'True' || currentUser.noti) ? true : false);
            
            setLogoBase(currentUser.logo);
            setLogoUrl(loadImageFromBase64(currentUser.logo));
            setSelectedPicture(logoUrl); 

            navigation.navigate('Perfil de Usuario');
		}, 2000);
	}, [currentUser]);

	useEffect(() => {
        
        setUser(currentUser);

        setGuid(currentUser.guid);
        setDocu(currentUser.docu);
        setType(currentUser.type);
        setUsername(currentUser.user);
        setFirstname(currentUser.name);
        setLastname(currentUser.last);
        setMovil(currentUser.celu);
        setEmail(currentUser.mail);
        setChecked((currentUser.noti === 'True' || currentUser.noti) ? true : false);

        setLogoBase(currentUser.logo);
        setLogoUrl(loadImageFromBase64(currentUser.logo));
        setSelectedPicture(logoUrl);

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                // console.log('Teclado abierto');
                setShowButtons(false);
            }
        );     
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // console.log('Teclado cerrado');
                setShowButtons(true);
            }
        );
        
	}, [currentUser]);

    return (
        <View style={styles.container}>

            <ScrollView 
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >

                { (user.type === 'customer') ? (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={ () => handleImagePicker(0) } >
                            { ((logoUrl === 'data:image/png;base64,none') || (logoUrl === 'data:image/png;base64,undefined')) ? (
                                <FontAwesomeIcon 
                                    style={styles.image} icon={faCircleUser} color={'#0a7a75'}/>
                            ) : 
                                <Image 
                                    style={styles.image} source={{ uri: logoUrl }} />
                            }
                          
                        </TouchableOpacity>
                    </View>
                ) : 
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity>
                            <></>
                        </TouchableOpacity>
                    </View>
                }

                <View style={styles.textViewUser}>
                    <Text style={styles.textUser}> {username}</Text> 
                    { (user.type === 'customer') ? (
                        <Text style={styles.textUser}> CI: {docu}</Text> 
                    ) : null }
                </View>

                {/* <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        editable={false}
                        // onChangeText={setUsername}
                        // onChangeText={(text) => handleFieldChange(text, 'username')}
                    />
                </View> */}
 
                {/* { (user.type === 'customer') ? (
                    <View style={styles.inputContainer}>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            value={docu} */}
                        {/* /> */}
                        {/* {isValidDocu ? (
                            <Text style={{ color:'red' }}> # Documento Incorrecto</Text>
                        ) : null } */}
                    {/* </View>
                ) : null} */}
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={firstname}
                        placeholder="Nombre"
                        onChangeText={setFirstname}
                        // onChangeText={(text) => handleFieldChange(text, 'firstname')}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={lastname}
                        placeholder="Apellido"
                        onChangeText={setLastname}
                        // onChangeText={(text) => handleFieldChange(text, 'lastname')}
                    />
                </View>
 
                {/* <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={movil}
                        onChangeText={setMovil}
                        // onChangeText={(text) => handleFieldChange(text, 'movil')}
                    />
                </View> */}

                <View style={styles.inputContainer}>
					<EditMovil movil={movil} handleFieldChange={setMovilFormat} />
				</View>

                <View style={[styles.inputContainer, !isValidEmail && styles.invalidInput]} >
                    <TextInput
                        keyboardType="email-address"
						style={styles.input}
						placeholder="Correo"
						value={email}
						// onChangeText={setEmail}
                        onChangeText={(text) => handleEmailChange(text)} 
						autoCapitalize="none" 
                    />
                    {
                        !isValidEmail &&
                        <Text style={{ color:'red' }}> # Correo electrónico inválido </Text>
                    }
                </View>

                { (user.type === 'customer') ? (
                    <View style={styles.checkContainer}>
                        <CheckBox 
                            type={'normal'}
                            text={'Recibir promociones por correo'}
                            isChecked={isChecked}
                            setChecked={setChecked}
                            />
                    </View>
                ) : null }
                
                {/* <View>
                    <Text>{oldpass}</Text>
                    <Text>{newpass}</Text>
                </View> */}

            </ScrollView>

            {showButtons ? (
                <View style={styles.footer}>

                    <View style={styles.buttons}>

                        <View style={{ marginBottom:10 }}>
                            <MenuButtonItem
                                icon = {null}
                                type = {'panel'}
                                text = {'Actualizar Datos'}
                                onPress={() => updateData()}
                            />
                        </View>
                        <View style={{ marginBottom:10 }}>
                            <MenuButtonItem 
                                icon = {null}
                                text = {'Cambiar Contraseña'}
                                onPress={() => updatePass()}
                            /> 
                        </View>

                        <TouchableOpacity
                            onPress={() => deleteAccount()}
                            style={{
                                flexDirection:'row',
                                justifyContent:'center',
                            }}>
                            <FontAwesomeIcon icon={faBan} color={'red'}/>
                            <Text style={{ marginLeft:5, color:'red' }}>Eliminar Cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
   
    inputContainer: {
		flexDirection: 'column',
		backgroundColor: '#fff',
        
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal:45,
		marginBottom: 10,
		paddingHorizontal: 15,
		paddingVertical: 3,
	},

    textViewUser: {
        flexDirection:'column',
        alignItems:'center',
        marginBottom: 20,
        marginTop:-13,
    },
    textUser: {
        fontWeight: 'normal',
        fontSize: 17,
        borderColor: 10,
        fontWeight: 'bold'
    },

    input: {
		color: 'black',
		fontWeight: 'bold',
	},
    btnUpdate: {
        alignSelf:'center',
        alignItems:'center',
		backgroundColor: '#69ACDD',
        width:'90%',
        borderRadius:15,
        marginHorizontal:15,
        marginTop:15,
	},
    txtUpdate: {
        paddingVertical:10,
        fontWeight:'bold'
	},

    imageContainer: {
		height: 106,
		width: 106,
		margin: 10,
		alignSelf: 'center',
		borderRadius: 60,
		backgroundColor: '#fff',
		alignItems: 'center', // Centrar horizontalmente
		justifyContent: 'center', // Centrar verticalmente
        // backgroundColor: '#aaa'
	},
    imageButton: {
        alignItems:'center'
	},
    imageText: {
		marginHorizontal:20,
	},
	image: {
		margin: 20,
		padding: 50,
		borderRadius: 50,
        borderColor:'#fff',
        borderWidth:2
	},
    buttonImageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttons: { 
        flexDirection:'column',
        alignItems:'center',
        marginHorizontal:45, 
        marginBottom:15, 
        textAlign:'center' 
    },

    checkContainer: {
		flex: 1,
        flexDirection: 'column',
        alignItems:'center',
		marginHorizontal:20,
		marginVertical:25,
	},

    header: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'#fff'
    }
})

export default ProfileView;