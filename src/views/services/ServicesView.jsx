import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../utils/Functions'; 

import ServiceItem from './ServiceItem';
import ServicesController from '../../controllers/ServicesController';

import React, { 
    useState, useEffect
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const ServicesView = ( params ) => {

    const navigation = useNavigation();

    var guid = params.route.params.guid;

    const [list, setList] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [orientation, setOrientation] = useState(getOrientation());

    const handleEditItem = (service) => {
        // Navegar a la vista de edición con los datos del servicio
        // navigation.navigate('ServiceEdit', { service });
    };

    const createItem = (guid) => {
        console.log('create', guid);
    };

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			navigation.navigate('Servicios');
		}, 2000);
	}, []);

    const handleOrientationChange = () => {
		const newOrientation = getOrientation();
		setOrientation(newOrientation);
	};

    useEffect(() => {
        ServicesController.getServicesForCompany(guid)
        .then(serviceReturn => {
            // var services = JSON.parse(serviceReturn);
            console.log('services: ', serviceReturn);
            setList(serviceReturn);
        })
        .catch(error => {
            alert('ERROR al intentar cargar los Servicios, ' + error);
        });
        Dimensions.addEventListener('change', handleOrientationChange);
    }, []);

    console.log('list: ', list);

    return (
        <View style={styles.container}>

            {list ? (
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {list.map((item, index) => (
                        <ServiceItem 
                            key={index}
                            item={item} 
                            onPress={() => handleEditItem(item)} 
                        />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.scrollContainer}>
                    <Text>No tiene ningún Servicio Creado</Text>

                    <LinearGradient
                        colors={['#135054', '#a8ffff', '#fff']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.5 }}
                        style={styles.btnCreate}
                        >
                        <TouchableOpacity onLongPress={() => createItem(guid)} >
                            <Text> Crear Servicio </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            )}

            {orientation === 'portrait' ? (				
                <View style={styles.footer}>
                    <Text style={styles.textVersion1}>En esta versión solo puede tener un servicio</Text>
                    <Text style={styles.textVersion2}>Necesita actualizar a la versión Premium</Text>
                    <View>        
                    </View>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        alignItems:'center',
        width: '100%',
    },
    btnCreate: {
		paddingVertical: 10,
		paddingHorizontal: 6,
        marginTop: 15,
		marginBottom: 15,
		borderRadius: 10,
    },
    textCreate: {
        color:'#ffffff'
    },
    footer: {   
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,     
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
        paddingBottom: 20,
    },
});

export default ServicesView;