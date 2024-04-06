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

import { LinearGradient } from 'expo-linear-gradient';


const PassRecover = () => {

    const { currentUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [movil, setMovil] = useState('');


    const recoveryPassword = () => {

        var valuesChange = {
            'user': user,
            'email': email,
            'movil' : movil,
        }
        // console.log(valuesChange);
        UsersController.handleRecoveryPass(JSON.stringify(valuesChange))
		.then(msgReturn => {
            console.log('msgReturn: ', msgReturn);
			AlertModal.showAlert('Envio Exitoso', msgReturn.mensaje);
		})
		.catch(error => {
			AlertModal.showAlert('Error: ', JSON.stringify(error));
		});
	};

    useEffect(() => {
        setUser('');
        setEmail('');
        setMovil('');
	}, [currentUser.guid]);

    return (
        <LinearGradient 
            colors={['#2ECC71', '#D0E4D0', '#dfe4ff']}
            // colors={['#135000', '#238162', '#2ECC71']}
            start={{ x: 0.0, y: 0.95510 }}
            end={{ x: 0.0, y: 0.00010 }}
            style={styles.container}
            >
            <View>
                <Text style={styles.txtUpdate}>Nombre de usuario: </Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        value={user}
                        onChangeText={(text) => setUser(text)}
                    />
                </View>

                <Text style={styles.txtUpdate}>Correo: </Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} 
                        value={email}
                        keyboardType="email-address"
						autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <Text style={styles.txtUpdate}>Celular: </Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} 
                        value={movil}
                        keyboardType="numeric"
                        onChangeText={(text) => setMovil(text)}
                    />
                </View>

                <View style={styles.btnChangePassword}>
                    <MenuButtonItem 
						icon = {null}
						text = "Enviar"
                        type = "login"
						onPress = { () => recoveryPassword() }
					/>
                </View>

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

export default PassRecover;