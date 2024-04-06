import { 
    AuthContext 
} from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';

import ServiceItem from './ServiceItem';
import ServicesController from '../../controllers/ServicesController';

import React, { 
    useContext, useState, useEffect
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

    const { currentUser } = useContext(AuthContext);

    const navigation = useNavigation();
    var guid = currentUser.guid;

    const [list, setList] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [bodyHeight, setBodyHeight] = useState(370); 
    
    const handleEditItem = (item) => {
        console.log('handleEditItem', item);
    };
 
    const createItem = (guid) => {
        // console.log('create', guid);
        navigation.navigate('Crear Servicio', {isCreate, setIsCreate, onRefresh});
    };

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            setEditMode(false);
            getServices();
			// navigation.navigate('Servicios');
		}, 2000);
	}, [editMode,list]);

    const getServices = async () => {
        if (guid !== 'none') {
            ServicesController.getServicesForCompany(guid)
            .then(serviceReturn => {
                // console.log('serviceReturn: ', serviceReturn);
                if (serviceReturn !== null) {
                    setList([serviceReturn]);
                } else {
                    setList([]);
                }
            })
            .catch(error => {
                alert('ERROR al intentar cargar los Servicios, ' + error);
            });
        }
    }

    const listServices = () => {
		if (list) {
			return list.map((item, index) => {
				// return item && (
				// 	<PromoItem 
                //         guid={guid}
                //         key={index}
                //         index={index}
                //         item={item} 
                //         editMode={editMode}
                //         // setEditMode={setEditMode}
                //         setEditMode={() => toggleEditMode(index)}
                //         onRefresh={onRefresh}
                //         onPress={() => handleEditItem(item)}
                //         navigation={navigation}
                //     />
				// )
			});
		}
	};

    const toggleEditMode = (index) => {
        // setEditMode((prevEditMode) => ({
        //     ...prevEditMode,
        //     [index]: !prevEditMode[index],
        // }));
    };

    useEffect(() => {
        getServices();
        setIsCreate(false);
        if (list) {
            // const initialEditMode = list.reduce((acc, _, index) => {
            //     return { ...acc, [index]: false };
            // }, {});
            setEditMode(false);
        }

        if (editMode) {
            setBodyHeight(480);
        } else {
            setBodyHeight(370);
        }
    }, [guid]);

    return (
        <View style={styles.container}>
            {(list !== null && Array.isArray(list) && list.length > 0) ? (
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>

                    {list.map((item, index) => (
                        <View key={index}>
                            <ServiceItem 
                                guid={guid}
                                key={index}
                                item={item}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                bodyHeight={bodyHeight}
                                setBodyHeight={setBodyHeight}
                                navigation={navigation}
                                onRefresh={onRefresh}
                                onPress={() => handleEditItem(item)}
                                />
                            {/* <Text>{item.nombre}</Text> */}
                        </View>
                    ))}

                </ScrollView>
            ) : (
                <View style={{
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text>No tiene un servicio creado aún</Text>

                    <LinearGradient
                        colors={['#135054', '#a8ffff', '#fff']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.5 }}
                        style={styles.btnCreate}
                        >
                        <TouchableOpacity 
                            styles={{ alignContent:'center' }}
                            onPress={() => createItem(guid)} >
                            <Text> Crear Servicio </Text>
                        </TouchableOpacity>
                    </LinearGradient>
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
        paddingBottom: 20,
    },
});

export default ServicesView;