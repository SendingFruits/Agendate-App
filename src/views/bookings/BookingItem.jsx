import { formatDate, getFormattedDate, getDateFromString } from '../../views/utils/Functions'; 

import { 
    useState, useEffect 
} from 'react';

import BookingController from '../../controllers/BookingController';
import AlertModal from '../utils/AlertModal';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const BookingItem = ( params ) => {

    var {
        index,
        type,
		item, 
		onRefresh,
        onPress,
	} = params;

    var dateString = item.fechaHoraTurno.split('T');
    var fecha = formatDate(dateString[0]);
    var hora = dateString[1].slice(0, -3);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(300);

    const setStatusColor = (estado) => {
        switch (estado) {
            case 'Realizada':
                return 'green';
            case 'Pendiente':
                return 'orange'; 
            case 'Solicitada':
                return 'blue'; 
            case 'Cancelada':
                return 'red'; 
            default:
                return 'black';
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const editName = () => {
        console.log('editName');
    };


    const done = (id) => {
        
        // console.log('fechaHoraTurno:',item.fechaHoraTurno);
        // console.log('fechaHoraHoy:',getFormattedDate(1));
     
        const fechaHoraTurno = new Date(item.fechaHoraTurno);
        const fechaHoraHoy = new Date(getFormattedDate(1));

        if (fechaHoraTurno >= fechaHoraHoy) {
            console.log('El turno es mayor o igual a hoy.');
            AlertModal.showAlert('Confirmación', 'El turno aún no ocurió, no puede darla por Realizada');
        } else {
            console.log('El turno es menor a hoy.');
            var text = '¿El cliente asitió en forma y hora al lugar?';
    
            AlertModal.showBoolAlert(text)
            .then(alertRes => {
                if (alertRes) {
                    BookingController.handleDoneBooking(id)
                    .then(resDone => {
                        // console.log('userReturn: ', userReturn);
                        if (resDone) {
                            onRefresh();
                        }
                    })
                    .catch(error => {
                        AlertModal.showAlert('ERROR', error);
                    });
                }
            })
            .catch(error => {
                alert(error);
            });
        }

    };

    const cancellation = (id) => {
        // console.log('cancellation of: ', id);
        var text = '¿Seguro desea cancelar la Reserva?';

        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			// console.log('alertRes: ', alertRes);
			if (alertRes) {
                BookingController.handleCancelBooking(id)
                .then(resDelete => {
                    // console.log('userReturn: ', userReturn);
                    if (resDelete) {
                        onRefresh();
                    }
                })
                .catch(error => {
                    alert(error);
                });
            }
		})
		.catch(error => {
			alert(error);
		});
    };

	useEffect(() => {
		setIsCollapsed(true);

        if (type === 'company') {
            setBodyHeight(120);
        } else {
            setBodyHeight(245);
        }
	}, [type]);
    
    return (
        <View style={styles.container}>
            <View>
                <LinearGradient
                    colors={['#135054', '#e9e9f8', '#efffff']} 
                    start={{ x: 0.2, y: 1.2 }}
                    end={{ x: 1.5, y: 0.5 }} 
                    >    
                    <TouchableOpacity 
                        onPress={() => toggleCollapse()} 
                        onLongPress={() => editName()}
                        >
                        <View style={styles.lineHeader} >

                            <View style={{ flexDirection:'row' }}>
                                <View style={styles.leftLineHeader}>
                                    <Text>Reserva para el</Text>
                                </View>
                                
                                <View style={styles.centerLineHeader}>                     
                                    <Text style={{ marginLeft:1, fontWeight:'bold' }}> {fecha}</Text>
                                    <Text style={{ fontWeight:'bold' }}> {hora}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.rightLineHeader}>

                                { (getDateFromString(fecha) < new Date() && (item.estado !== 'Cancelada' && item.estado !== 'Realizada')) ? (
                                    <Text style={{ 
                                        fontWeight:'bold', 
                                        marginHorizontal:5, 
                                        color: '#f50' 
                                        }}> No Confirmada
                                    </Text>
                                ) : 
                                    <Text style={{ 
                                        fontWeight:'bold', 
                                        marginHorizontal:5, 
                                        color: setStatusColor(item.estado) 
                                        }}> {item.estado}
                                    </Text> 
                                }
                            </View>
                            
                        </View>
                    </TouchableOpacity>

                </LinearGradient>
            </View>

            {!isCollapsed ? (
                <View>
                    <LinearGradient
                        colors={['#fffefe', '#ffffee', '#135054']} 
                        start={{ x: 0.2, y: 1.2 }}
                        end={{ x: 1.5, y: 0.5 }} 
                        >
                        <ScrollView style={{ ...styles.body, height: bodyHeight }} >
                        
                            { type === 'customer' ? (
                                <>
                                    <View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Empresa:</Text>
                                            <Text style={styles.value}>{item.nombreEmpresa}</Text>
                                        </View>
                                        <View style={styles.rowInvi}>
                                            <Text>{item.descripcionEmpresa}</Text>
                                        </View>
                                        <View>
                                            <Text>Rubro: {item.rubro}</Text>
                                            <Text>Ciudad: {item.ciudad}</Text>
                                            <View style={{ flexDirection:'row'}}>
                                                <Text>Celular: </Text>
                                                <Text style={{ fontWeight:'bold' }}>{item.celular}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{ ...styles.row, marginTop:10 }}>
                                            <Text style={styles.label}>Servicio:</Text>
                                            <Text style={styles.value}>{item.nombreServicio}</Text>
                                        </View>

                                        <View style={styles.rowInvi}>
                                            <Text>{item.descripcion}</Text>
                                        </View>

                                        {/* <View style={styles.row}> */}
                                            {/* <Text style={styles.label}>Comienza:</Text> */}
                                            {/* <Text style={styles.value}>{formatDate(booking.dateInit)}</Text> */}
                                        {/* </View>
                                        <View style={styles.row}> */}
                                            {/* <Text style={styles.label}>Termina:</Text> */}
                                            {/* <Text style={styles.value}>{formatDate(booking.dateEnd)}</Text> */}
                                        {/* </View> */}
                                    </View>
                                </>
                            ) : (  
                                <>
                                    <View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Cliente:</Text>
                                            <Text style={styles.value}>{item.nombreCliente} {item.apellidoCliente}</Text>
                                        </View>
                                        {/* <View style={styles.rowInvi}>
                                            <Text>{item.descripcionEmpresa}</Text>
                                        </View> */}
                                        <View>
                                            <Text>Correo: {item.correoCliente}</Text>
                                            <Text>Celular: {item.celularCliente}</Text>
                                        </View>
                                    </View>
                                </>
                            )}
                        
                        </ScrollView>
                    </LinearGradient>  

                    <LinearGradient
                        style={styles.footer}
                        colors={['#135054', '#e9e9f8', '#efffff']} 
                        start={{ x: 0.2, y: 1.2 }}
                        end={{ x: 1.5, y: 0.5 }} 
                        >

                        { type === 'company' ? (
                            <View style={styles.rowInvi}>

                                {item.estado === 'Pendiente' ? (
                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => done(item.id)} > 
                                                <Text style={{color:'#000', textAlign:'center' }}>Realizada</Text>
                                            </TouchableOpacity>   
                                        </LinearGradient>
                                    </>
                                ) : null }

                                {item.estado === 'Pendiente' ? (
                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => cancellation(item.id)} > 
                                                <Text style={{color:'#000', textAlign:'center' }}>Cancelar</Text>
                                            </TouchableOpacity>    
                                        </LinearGradient>
                                    </>
                                ) : null }
                                
                            </View>
                        ) : ( 
                            <>
                                {item.estado === 'Pendiente' ? (
                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => cancellation(item.id)} > 
                                                <Text style={{color:'#000', textAlign:'center' }}>Cancelar</Text>
                                            </TouchableOpacity>    
                                        </LinearGradient>
                                    </>
                                ) : null }
                            </>
                        )}
                    </LinearGradient> 
                </View>
            ) : null }

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: width-5,
        // marginHorizontal: 3,
        marginVertical: 5,
        justifyContent: 'center',
        borderRadius: 8,
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        padding:1.2,
    },

    lineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingVertical: 6,
        paddingHorizontal: 6,
    },
    
    leftLineHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width:'38%'
    },
    
    centerLineHeader: {
        flexDirection: 'row',
        // backgroundColor:'#fff'
    },
    
    rightLineHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    rowInvi: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 10,

    },
    label: {
        width: '45%',
        fontWeight:'bold',
    },
    value: {
        width: '45%',
        textAlign: 'right',
    },

    footer: {
        alignItems: 'flex-end',
        paddingVertical:6,
        
        backgroundColor:'#9a9',
        // borderBottomLeftRadius:12,
        // borderBottomRightRadius:12,
    },
    btnEdit: {
        backgroundColor: '#2ECC71',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2d9',
        marginEnd:10,
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

    cancel: { 
        padding: 10,
        marginHorizontal: 5,
        backgroundColor:'#135054',
        borderRadius: 10,
        width: 85,
    }
});

export default BookingItem;