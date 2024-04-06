import { 
    AuthContext 
} from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';

import AlertModal from '../utils/AlertModal';
import MenuButtonItem from '../home/MenuButtonItem';
import PromosController from '../../controllers/PromosController';

import { 
    useContext, useState, useEffect 
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    TextInput,
    View,
    ScrollView,
    Keyboard
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const PromoCreate = ( params ) => {
    
    var {
        isCreate,
        setIsCreate,
        onRefresh
    } = params.route.params;

    const { currentUser } = useContext(AuthContext);
    const navigation = useNavigation();

    var edit = false;

    const [bodyHeight, setBodyHeight] = useState(480); 

    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [marginStatusTop, setMarginStatusTop] = useState(0);

    const saveItem = () => {

        const formData = {
			asunto,
			mensaje,
            guid:currentUser.guid
		};

		PromosController.handlePromoCreate(formData)
		.then(servReturn => {
			console.log('servReturn: ', servReturn);
			if (servReturn) {
                AlertModal.showAlert('Envio Exitoso', 'Se creó la Promoción');
                setIsCreate(true);
                navigation.navigate('Promociones', { isCreate });
                onRefresh();
			}
		})
		.catch(error => {
			AlertModal.showAlert('Error', 
            'No se pudo crear la Promoción\n'+ JSON.stringify(error));
		});
    };

	useEffect(() => {
        setBodyHeight(560); 

        setAsunto('');
        setMensaje('');

        /**
         * esto sirve para controlar el teclado:
         */
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                // console.log('Teclado abierto');
                setMarginStatusTop(50);
                setBodyHeight(450);
            }
        );     
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // console.log('Teclado cerrado');
                setMarginStatusTop(0);
                setBodyHeight(560);
            }
        );

	}, [edit]);
    
    return (
        <View style={styles.container}>
            <View>
                <LinearGradient
                    colors={['#fff', '#fff', '#032']} 
                    start={{ x: 0.2, y: 1.2 }}
                    end={{ x: 1.5, y: 0.5 }} 
                    >
                    <View>
                        <ScrollView style={{ ...styles.body, height: bodyHeight, marginTop:marginStatusTop }} >
                        
                            <View style={styles.row}>
                                <View style={styles.columnT}>
                                    <Text style={styles.label}>Asunto:</Text>    
                                </View>
                                <View style={styles.columnV}>
                                    <TextInput 
                                        style={styles.dataEdit} 
                                        value={asunto}
                                        onChangeText={setAsunto}
                                        />
                                </View>
                            </View>
                            <View>
                                <View style={styles.column}>
                                    <Text style={styles.label}>Mensaje:</Text>    
                                </View>
                                <View>
                                    <TextInput 
                                        multiline={true}
                                        style={styles.dataEdit} 
                                        value={mensaje}
                                        onChangeText={setMensaje}
                                        />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>

                <View>
                    <LinearGradient
                        style={styles.footer}
                        colors={['#135054', '#e9e9f8', '#efffff']} 
                        start={{ x: 0.2, y: 1.2 }}
                        end={{ x: 1.5, y: 0.5 }} 
                        >

                        <View style={styles.btnEdit}>

                            <View style={{marginEnd:10, marginTop:7}}>
                                <MenuButtonItem 
                                    icon = {null}
                                    text = {'Guardar'}
                                    onPress={() => saveItem()}
                                />
                            </View>
                            <View style={{marginEnd:5, marginTop:7}}>
                                <MenuButtonItem 
                                    icon = {null}
                                    text = {'Cancelar'}
                                    onPress={() => navigation.navigate('Promociones')}
                                />

                            </View>
                        </View>

                    </LinearGradient>
                </View>
            </View> 
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: width - 5,
        // marginHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'center',
        borderRadius: 8,
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        padding:1.2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'baseline',
        paddingHorizontal: 10,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },
    textHeader: {
        flexDirection: 'row',
        alignItems:'baseline',
        fontWeight:'bold',
        paddingVertical:10,
    },
    buttonsRow: {
        alignContent:'flex-end',
        // alignItems:'flex-end',
        // alignSelf:'flex-end',
        // justifyContent: 'space-between',
        position:'relative',
        top:10,
        right:10,
    },
    body: {
        width: width - 5,
        // height: 100,
        // borderTopWidth: 1,
        borderTopColor: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#556',
        paddingHorizontal:8,
        marginTop: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    column: {
        width:'100%',
        paddingLeft:5,
        // backgroundColor:'red',
    },
    columnT: {
        width:'30%',
        paddingLeft:5,
        // backgroundColor:'red',
    },
    columnV: {
        width:'70%',
        paddingRight:1,
        alignItems:'stretch',
        // backgroundColor:'green',
    },

    label: {
        fontWeight:'bold',
    },

    footer: {
        alignItems: 'flex-end',
        paddingVertical:6,
        backgroundColor:'#9a9',
        // borderBottomLeftRadius:12,
        // borderBottomRightRadius:12,
    },
    btnEdit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd: 6,
        padding: 5,
    },
    btnEditCollapse: {
        width:40,
        position:'relative',
        bottom:30,
        left:290,
        backgroundColor: '#2ECC71',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2d9',
        marginEnd:10,
    },
    txtbtnEdit:{
        color:'#fff'
    },
    dataEdit: {
        textAlign:'left',
        paddingRight:5,
        backgroundColor:'#fff'
    }

});

export default PromoCreate;