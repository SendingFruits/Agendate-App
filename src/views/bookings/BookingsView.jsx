import { 
    AuthContext 
} from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';
import { formatDate, getFormattedDate } from '../../views/utils/Functions'; 

import BookingItem from './BookingItem';
import FilterPanel from './FilterPanel';
import BookingController from '../../controllers/BookingController';
import ServicesController from '../../controllers/ServicesController';
import AlertModal from '../utils/AlertModal';

import React, { 
    useContext, useState, useEffect
} from 'react';

import { 
    Text, 
    StyleSheet, 
    View, 
    ScrollView,
    RefreshControl,
} from 'react-native';

const BookingsView = ( params ) => {

    const navigation = useNavigation();
    const { currentUser } = useContext(AuthContext);

    var guid = currentUser.guid;
    var type = currentUser.type;

    const [list, setList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showPanel, setShowPanel] = useState(true);
    const [dateSelected, setDateSelected] = useState(null);

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            loadBookings(guid, type);
            navigation.navigate('Reservas');
		}, 2000);
	}, []);

    const handleDateSelect = (day) => {
        var date = day.dateString;
        // console.log('date: ', date);
        setDateSelected(date);
        // console.log('dateSelected: ', dateSelected);
        setShowPanel(true);
        setShowModal(false);
    };

    const loadBookings = () => {
        if (type !== 'none' && guid !== 'none') {
            if (type === 'customer') {
                BookingController.getBookingsForCustomer(guid)
                .then(bookingsReturn => {
                    setList(bookingsReturn);
                })
                .catch(error => {
                    AlertModal.showAlert('ERROR', 'No se pudo cargar las Reservas del Cliente '+error);
                });
            } else {
                if (dateSelected !== null) {
                    ServicesController.getServicesForCompany(guid)
                    .then(serviceReturn => {
                        // console.log('serviceReturn.id: ', serviceReturn.id);
                        // console.log('dateSelected: ', dateSelected);
                        if (serviceReturn !== null) {
                            BookingController.getBookingsForCompany(serviceReturn.id,dateSelected)
                            .then(bookingsReturn => {
                                if (bookingsReturn.length > 0) {
                                    setCounter(bookingsReturn.length);
                                    setList(bookingsReturn);
                                } else {
                                    setCounter(0);
                                    setList([]);
                                }
                            })
                            .catch(error => {
                                AlertModal.showAlert('Mensaje', error);
                            });
                        }
                    })
                    .catch(error => {
                        AlertModal.showAlert('ERROR', 'No se pudo cargar las Reservas de la Empresa '+error);
                    });
                }
            }
        }
    }

    const showDatePicker= (panel,modal) => {
        setShowPanel(panel);
        setShowModal(modal);
    }

    useEffect(() => {
        // console.log(navigation.getState());
        const currentScreen = navigation.getState().key;
        // console.log(currentScreen);

        setShowPanel(true);
        if (dateSelected === null) {
            setDateSelected(getFormattedDate());
        }
        loadBookings();
    }, [guid, type, dateSelected]);

    // console.log('list: ', list);

    return (
        <View style={styles.container}>
            {showPanel && type === 'company' ? (
                <>
                    <FilterPanel 
                        onRefresh={onRefresh} 
                        dateSelected={dateSelected} 
                        handleDateSelect={handleDateSelect} 
                        showModal={showModal}
                        setShowModal={setShowModal}
                        showDatePicker={showDatePicker}
                        />
                    <View style={{ paddingVertical:25 }} />
                </>
            ) : null }

            {/* {(list !== null || (Array.isArray(list) && list.length !== 0)) ? ( */}
            {(list.length !== 0) ? (
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
                    {list.map((item, index) => (
                        <View key={index}>
                            <BookingItem 
                                index={index}
                                type={type}
                                item={item} 
                                onRefresh={onRefresh}
                            />
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View>
                    {type === 'company' ? 
                       <Text>No hay Reservas para el {formatDate(dateSelected)}</Text> 
                    : <Text>No realizó Reservas aún</Text> }
                </View>
            )}
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9e9f8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    btnCreate: {
        width: 50,
        position: 'relative',
        top: 60,
        left: 197,
        padding: 8,
        backgroundColor: '#AAA54E', // Color de fondo del botón
        borderRadius: 10,
    },
    textCreate: {
        color:'#ffffff'
    },
    footer: {
        width:'95%',
        textAlignVertical:'bottom',
        alignItems:'center',
        borderTopColor:'#011',
        borderTopWidth:0.6,
    },
    textVersion1: {
        fontWeight:'bold',
        paddingHorizontal:6,
        paddingVertical:10,
    },
    textVersion2: {
        paddingHorizontal:3,
        paddingBottom: 5,
    },
});

export default BookingsView;