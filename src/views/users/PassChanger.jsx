import { 
    AuthContext 
} from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';

import React, { 
    useState, useEffect, useContext
} from 'react';

import MenuButtonItem from '../home/MenuButtonItem';
import UsersController from '../../controllers/UsersController';
import AlertModal from '../utils/AlertModal';

import { 
    Text, 
    TextInput,
    StyleSheet, 
    TouchableOpacity, 
    View 
} from 'react-native';

import { 
	faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const PassChanger = (params) => {

    const { currentUser, setPassword } = useContext(AuthContext);
    const navigation = useNavigation();

    const [secureTextEntryValue1, setSecureTextEntryValue1] = useState(true);
    const [secureTextEntryValue2, setSecureTextEntryValue2] = useState(true);
    const [iconEye1, setIconEye1] = useState(false);
    const [iconEye2, setIconEye2] = useState(false);
    const [oldpass, setOldPass] = useState('');
    const [newpass, setNewPass] = useState('');

    const handleToggleIconOldPass = () => {
        setIconEye1(!iconEye1);
        setSecureTextEntryValue1(iconEye1);
    };
 
    const handleToggleIconNewPass = () => {
        setIconEye2(!iconEye2);
        setSecureTextEntryValue2(iconEye2);
    };

    const handleOldPassChange = (text) => {
        // console.log('Updating old password:', text);
        setOldPass(text);
    };
    
    const handleNewPassChange = (text) => {
        // console.log('Updating new password:', text);
        setNewPass(text);
    };
  
    const handleEmailChange = (text) => {
		setEmail(text);
		setIsValidEmail(validateEmail(text));
	};

    const changePassword = () => {

        var valuesChange = {
            'idu': currentUser.guid,
            'old': oldpass,
            'new': newpass,
        }
        // console.log(valuesChange);
        UsersController.handleUpdatePass(valuesChange)
		.then(msgReturn => {
			if (msgReturn != null) {
				navigation.navigate('Perfil de Usuario');
				AlertModal.showAlert('Envio Exitoso',msgReturn.replace('exitosamente','correctamente'));

			}
		})
		.catch(error => {
			alert(error);
		});
	};

    useEffect(() => {
        handleOldPassChange('');
        setIconEye1(false);
        handleNewPassChange('');
        setIconEye2(false);
	}, [currentUser]);

    return (
        <LinearGradient 
            colors={['#2ECC71', '#D0E4D0', '#dfe4ff']}
            // colors={['#135000', '#238162', '#2ECC71']}
            start={{ x: 0.0, y: 0.95510 }}
            end={{ x: 0.0, y: 0.00010 }}
            style={styles.container}
            >
            <View style={{
                padding:10,
                borderRadius:10,
                borderWidth:0.7,
                backgroundColor:'#e9e6f8',
                marginBottom:50
            }}>
                <Text style={styles.txtUpdate}>Contraseña Actual: </Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        value={oldpass}
                        secureTextEntry={secureTextEntryValue1}
                        onChangeText={(text) => handleOldPassChange(text)}
                    />
                    <TouchableOpacity style={styles.iconEye}
                        onPress={() => handleToggleIconOldPass()}
                        > 	
                        { (iconEye1) ? (
                            <View>
                                <FontAwesomeIcon icon={faEye} />
                            </View>
                        ) : 
                            <View>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </View>
                        }
                    </TouchableOpacity>
                </View>

                <Text style={styles.txtUpdate}>Contraseña Nueva: </Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} 
                        value={newpass}
                        secureTextEntry={secureTextEntryValue2}
                        onChangeText={(text) => handleNewPassChange(text)}
                    />
                    <TouchableOpacity style={styles.iconEye}
                        onPress={() => handleToggleIconNewPass()}
                        > 	
                        { (iconEye2) ? (
                            <View>
                                <FontAwesomeIcon icon={faEye} />
                            </View>
                        ) : 
                            <View>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </View>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.btnChangePassword}>
               
                    <MenuButtonItem 
						icon = {null}
						text = "Cambiar"
						onPress = { () => changePassword()}
					/>
                </View>
            </View>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent: 'center', 
                    alignItems: 'flex-end'
                }} >
                <TouchableOpacity onPress={() => {
                        navigation.navigate('Perfil de Usuario') // {coordinates, item}
                    }} >
                    <Text style={{ fontWeight:'bold', color:'#000' }}>VOLVER</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 21,
        // borderWidth: 1,
        // borderColor: '#2EAe71',
    },
    inputContainer: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal:15,
		marginBottom: 5,
		paddingHorizontal: 15,
		paddingVertical: 3,
	},
    input: {
        flex : 0.92,
		color: 'black',
		fontWeight: 'bold',
        
	},
    iconEye: {
        flex:0.06,
        alignSelf:'center',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        backgroundColor:'#fff',
    },
    btnChangePassword: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 35,
        padding: 10,
    }
})

export default PassChanger;