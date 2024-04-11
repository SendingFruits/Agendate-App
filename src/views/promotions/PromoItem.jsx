import AlertModal from '../utils/AlertModal';
import PromosController from '../../controllers/PromosController';

import { 
    useState, useEffect 
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import {
    faClose, faTrash
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');

const PromoItem = (params) => {
    
    var {
        guid,
        index,
        item,
        editMode,
        setEditMode,
        onRefresh,
        navigation,
    } = params;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(130); 

    const [asunto, setAsunto] = useState(item.asuntoMensaje);
    const [mensaje, setMensaje] = useState(item.cuerpoMensaje);

    
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const editItem = (p) => {
        // console.log('editItem');
        if (p == false) {
            setEditMode(false);
            setBodyHeight(130);
        } else {
            setEditMode(true);
            setBodyHeight(280);
        }
    };

    const deleteItem = () => {
        var id = params.item.id;
        var text = '¿Seguro desea eliminar esta Promoción?';

        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			// console.log('alertRes: ', alertRes);
			if (alertRes) {
                PromosController.handlePromoDelete(id)
                .then(deleted => {
                    console.log(deleted);
                    onRefresh();
                })
                .catch(error => {
                	AlertModal.showAlert('Hubo un error', error);
                });
            }
		})
		.catch(error => {
			AlertModal.showAlert('Hubo un error', error);
		});
    };

    const saveItem = () => {

        setEditMode(false);
        setBodyHeight(130);

        var id = params.item.id;

        const formData = {
            id,
			asunto,
            mensaje,
		};

		PromosController.handlePromoUpdate(formData)
		.then(servReturn => {
			// console.log('servReturn: ', servReturn);
			if (servReturn) {
                // alert('Se actualizaron los datos del Servicio');
                AlertModal.showAlert('Envio Exitoso','Se actualizaron los datos de la promoción');
                onRefresh();
			}
		})
		.catch(error => {
			AlertModal.showAlert('Errro de Envio', error);
		});
    };

    const sendPromo = () => {
        console.log(item);
        var text = 'Está a punto de enviar de forma masiva esta Promoción por Correo Electrónico.\n'
            +'El envio soporta un limite máximo de 500 destinatarios y no podrás volver a enviar promociones por una semana.\n'
            +'¿Desea continuar?';
        AlertModal.showBoolAlert(text)
		.then(alertRes => {
			// console.log('alertRes: ', alertRes);
			if (alertRes) {
                PromosController.handlePromoSend(item.id)
                .then(senReturn => {
                    if (senReturn) {
                        AlertModal.showAlert('Envio Exitoso','Se envió la promoción correctamente');
                    }
                })
                .catch(error => {
                    console.log(error);
                    AlertModal.showAlert('',error);
                });
            }
		})
		.catch(error => {
            console.log(error);
			AlertModal.showAlert('Hubo un error', error);
		});
    }


	useEffect(() => {
        // setEditMode(false);
        setAsunto(item.asuntoMensaje);
        setMensaje(item.cuerpoMensaje);
        setBodyHeight(130);
	}, []);
    
    return (
        <View style={styles.container}>
            {/* {console.log(editMode.key)} */}
            {!editMode[index] ? (
                <>
                    <TouchableOpacity onPress={() => toggleCollapse()} >
                        <LinearGradient
                            style={styles.header}
                            colors={['#135054', '#e9e9f8', '#efffff']} 
                            start={{ x: 0.2, y: 1.2 }}
                            end={{ x: 1.5, y: 0.5 }} 
                            >

                            <View style={{ 
                                flexDirection:'row',
                                alignItems:'center',
                                marginHorizontal: 10,
                                }}>
                                <Text>{item.asuntoMensaje}</Text>
                            </View>

                            <View style={{ 
                                flexDirection:'row',
                                alignItems:'center',
                                marginHorizontal: 20,
                                }}>
                                <TouchableOpacity 
                                    style={{ flexDirection:'row', alignItems:'center', }} 
                                    onPress={() => deleteItem()} >
                                    {/* <Text style={{ marginLeft:6 }}>Quitar</Text> */}
                                    <FontAwesomeIcon icon={faTrash} />
                                </TouchableOpacity>
                            </View>

    
                        </LinearGradient>
                    </TouchableOpacity>
                 
                    {!isCollapsed ? (
                        <View>
                            <LinearGradient
                                colors={['#fff', '#fff', '#032']} 
                                start={{ x: 0.2, y: 1.2 }}
                                end={{ x: 1.5, y: 0.5 }} 
                                >
                                <View>
                                    <ScrollView style={{ ...styles.body, height: bodyHeight }} >
                                    
                                        <View style={styles.rowT}>
                                            <View style={styles.column}>
                                                <Text style={styles.label}>Mensaje:</Text>    
                                            </View>
                                        </View>

                                        <View>
                                            <View>
                                                <Text> {item.cuerpoMensaje}</Text>
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
                                    <View style={styles.rowInvi}>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => editItem()}> 
                                                <Text style={{color:'#000', textAlign:'center' }}>Editar</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>

                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => sendPromo()}> 
                                                <Text style={{color:'#000', textAlign:'center' }}>Enviar</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    ) : ( null )}
                </>
            ) : (
                <>
                    <View>
                        <LinearGradient
                            colors={['#fff', '#fff', '#032']} 
                            start={{ x: 0.2, y: 1.2 }}
                            end={{ x: 1.5, y: 0.5 }} 
                            >
                            <View>
                                <ScrollView style={{ ...styles.body, height: bodyHeight }} >
                                
                                    <View>
                                        <View style={styles.column}>
                                            <Text style={styles.label}>Asunto:</Text>    
                                        </View>
                                        <View>
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

                                <View style={styles.btns}>

                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => editItem(false)}>
                                                <Text style={{color:'#000', textAlign:'center' }}>Cancelar</Text>
                                            </TouchableOpacity>   
                                        </LinearGradient>
                                    </>

                                    {/* <View style={styles.btnEdit}>    
                                        <MenuButtonItem 
                                            icon = {null}
                                            text = {'Cancelar'}
                                            onPress={() => editItem(false)}
                                        />
                                    </View> */}


                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => saveItem()}>
                                                <Text style={{color:'#000', textAlign:'center' }}>Guardar</Text>
                                            </TouchableOpacity>   
                                        </LinearGradient>
                                    </>
                                    
                                    {/* <View style={styles.btnEdit}>    
                                        <MenuButtonItem 
                                            icon = {null}
                                            text = {'Guardar'}
                                            onPress={() => saveItem()}
                                        />
                                    </View> */}
                                </View>
    
                            </LinearGradient>
                        </View>
                    </View> 
                </>
            )}
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
        justifyContent:'space-between',
        paddingVertical: 10
    },
    textHeader: {
        flexDirection: 'row',
        alignItems:'baseline',
        fontWeight:'bold',
        marginStart:10,
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
        borderTopWidth: 1,
        borderTopColor: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#556',
        paddingHorizontal:8,
    },

    rowT: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,

    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    rowInvi: {
        flexDirection: 'row',
        marginBottom: 10,

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

    btns: {
        flexDirection:'row',

    },
    btnEdit: {
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
        paddingRight:5,
        backgroundColor:'#fff'
    },

    cancel: { 
        padding: 10,
        marginHorizontal: 5,
        margin: 10,
        backgroundColor:'#135054',
        borderRadius: 10,
        width: 85,
    }

});

export default PromoItem;