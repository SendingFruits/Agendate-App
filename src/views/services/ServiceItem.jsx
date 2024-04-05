import { 
    formatDate, convertHour, createDateTimeFromDecimalHour
} from '../../views/utils/Functions'; 

import { Picker } from '@react-native-picker/picker';

import AlertModal from '../utils/AlertModal';
import DaysSelector from './DaysSelector';
import ServicesController from '../../controllers/ServicesController';

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
	faTrash, faCheck, faClose
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');

const ServiceItem = (params) => {
    
    var {
        guid,
        item,
        editMode,
        setEditMode,
        bodyHeight,
        setBodyHeight,
        navigation,
        onRefresh
    } = params;
   
    const [isCollapsed, setIsCollapsed] = useState(true);
    
    const [nombre, setNombre] = useState(item.nombre);
    const [tipo, setTipo] = useState(item.tipoServicio);
    const [costo, setCosto] = useState(item.costo);
    const [turno, setTurno] = useState(item.duracionTurno);
    const [descripcion, setDescription] = useState(item.descripcion);
    const [dias, setDias] = useState(JSON.parse(item.jsonDiasHorariosDisponibilidadServicio));


    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const editItem = (p) => {
        // console.log('editItem');
        if (p == false) {
            setEditMode(false);
            setBodyHeight(370);
        } else {
            setEditMode(true);
            setBodyHeight(560);
        }
    };

    const saveItem = () => {

        setEditMode(false);
        setBodyHeight(370);

        var id = params.item.id;

        const formData = {
            id,
			nombre,
			tipo,
			costo,
			turno,
			descripcion,
			dias,
            guid,
		};

		ServicesController.handleServiceUpdate(formData)
		.then(servReturn => {
			// console.log('servReturn: ', servReturn);
			if (servReturn) {
                // alert('Se actualizaron los datos del Servicio');
                AlertModal.showAlert('Envio Exitoso','Se actualizaron los datos del Servicio');
                onRefresh();
			}
		})
		.catch(error => {
			AlertModal.showAlert('Errro de Envio', error);
		});
    };

    const deleteItem = () => {
        console.log('deleteItem');

        var id = params.item.id;
        var text = '¿Seguro desea eliminar este Servicio?';

        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			// console.log('alertRes: ', alertRes);
			if (alertRes) {
                ServicesController.handleServiceDelete(id)
                .then(deleted => {
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


	useEffect(() => {
      
        setBodyHeight(370);
        setEditMode(false);
		setIsCollapsed(false);

        setNombre(item.nombre);
        setTipo(item.tipoServicio);
        setCosto(item.costo);
        setTurno(item.duracionTurno);
        setDescription(item.descripcion);
        setDias(JSON.parse(item.jsonDiasHorariosDisponibilidadServicio));

	}, []);
    
    return (
        <View style={styles.container}>
            {!editMode ? (
                <>
                    <View>
                        <TouchableOpacity onPress={() => toggleCollapse()} >
                            <LinearGradient
                                style={styles.header}
                                colors={['#135054', '#e9e9f8', '#efffff']} 
                                start={{ x: 0.2, y: 1.2 }}
                                end={{ x: 1.5, y: 0.5 }} 
                                >    
                            
                                <View style={styles.textHeader}>
                                    <Text>{item.nombre}</Text>
                                </View>
        
                                <View style={styles.buttonsRow}>
                                    <TouchableOpacity onPress={() => deleteItem()} >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </TouchableOpacity>
                                </View>
        
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
        
                    {!isCollapsed ? (
                        <View>
                            <LinearGradient
                                colors={['#fff', '#fff', '#032']} 
                                start={{ x: 0.2, y: 1.2 }}
                                end={{ x: 1.5, y: 0.5 }} 
                                >
                                <View>
                                    <ScrollView style={{ ...styles.body, height: bodyHeight }} >
                                    
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Tipo:</Text>    
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.tipoServicio}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Costo:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.costo}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Descripción:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.descripcion}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Duración de Turnos:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                {item.duracionTurno === 1 ? (
                                                    <><Text>{item.duracionTurno} {"Hora"}</Text></>
                                                ) : (
                                                    <><Text>{item.duracionTurno} {"Minutos"}</Text></>
                                                )}
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.column}>
                                                <Text style={styles.label}>Dias de Actividad:</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            {dias !== null ? (
                                                <View style={{ flex:1 }}>
                                                    {Object.keys(dias).map((day, index) => (
                                                        <View key={index} style={styles.rowSche}>
                                                            <Text style={{ fontSize: 13, width:'25%' }}>{day}: </Text>
                                                         
                                                            {dias[day].horaInicio === null || 
                                                             dias[day].horafin === null ? (
                                                                <>
                                                                    <FontAwesomeIcon icon={faClose} />
                                                                </>
                                                            ) : 
                                                                <>
                                                                    <Text style={{ fontSize: 13, width:'30%' }}>
                                                                        desde las {convertHour(dias[day].horaInicio, 'toHours')}</Text>
                                                                    <Text style={{ fontSize: 13, width:'35%' }}>
                                                                        hasta las {convertHour(dias[day].horaFin, 'toHours')}</Text>
                                                                    <FontAwesomeIcon icon={faCheck} /> 
                                                                </>
                                                            }
                                                        </View>
                                                    ))}
                                                </View>
                                            ) : (
                                                <Text>No hay dias seleccionados</Text>
                                            )}
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
        
                                    {/* {item.estado === 'Solicitada' ? ( */}
                                    <>
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
                                    </>
                                    {/* ) : null } */}

                                    {/* <View style={styles.btnEdit}>    
                                        <MenuButtonItem 
                                            icon = {null}
                                            text = {'Editar'}
                                            onPress={() => editItem()}
                                        />
                                    </View> */}
        
                                    {/* {console.log('calendar: ', booking.calendar)} */}
                                    {/* {!booking.calendar ? (
                                        <TouchableOpacity style={styles.btnEdit}>
                                            <Text style={styles.txtbtnEdit}>Editar</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        null
                                    )} */}
                                </LinearGradient>
                            </View>
                        </View>
                    ) : (
                        null
                    )}
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
                                
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Nombre:</Text>    
                                        </View>
                                        <View style={styles.columnV}>
                                            <TextInput 
                                                style={styles.dataEdit} 
                                                value={nombre}
                                                onChangeText={setNombre}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Tipo:</Text>    
                                        </View>
                                        <View style={styles.columnV}>
                                            <TextInput 
                                                style={styles.dataEdit} 
                                                value={tipo}
                                                onChangeText={setTipo}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Costo:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                        <TextInput 
                                            style={styles.dataEdit} 
                                            value={costo.toString()}
                                            onChangeText={setCosto}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        {/* <View style={styles.columnT}>
                                            <Text style={styles.label}>Comienza:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                            <TouchableOpacity onPress={(param) => showDatePicker('comienzo')}>
                                                <TextInput 
                                                    editable={false}
                                                    style={styles.dataEdit} 
                                                    value={comienzoHora.toString()}
                                                    />
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible1}
                                                mode="time"
                                                display="spinner"
                                                is24Hour={true}
                                                date = {selectedDatePicker1}
                                                minuteInterval={30}
                                                onConfirm={(date) => handleDateConfirm(date,'comienzo')}
                                                onCancel={() => setDatePickerVisibility1(false)}
                                                />
                                        </View> */}
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Descripción:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                            <TextInput 
                                                multiline
                                                style={styles.dataEdit} 
                                                value={descripcion}
                                                onChangeText={setDescription}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Duración de Turnos:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Picker
                                                    // style={styles.picker}
                                                    // placeholder="Tipo"
                                                    selectedValue={turno}
                                                    onValueChange={(itemValue) => setTurno(itemValue)}
                                                    // onValueChange={(itemValue) => handleFieldChange(itemValue, 'userType')}
                                                    >
                                                    <Picker.Item label="30 min" value={30} />
                                                    <Picker.Item label="1 hora" value={60} />
                                                </Picker>
                                            </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.column}>
                                            <Text style={styles.label}>Dias de Actividad</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <DaysSelector dias={dias} setDias={setDias} create={false} />
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
    rowSche: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
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
        textAlign:'right',
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

export default ServiceItem;