import { 
    AuthContext 
} from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';

import PromoItem from './PromoItem';
import PromosController from '../../controllers/PromosController';

import React, { 
    useContext, useState, useEffect
} from 'react';

import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const PromosView = ( params ) => {

    const { currentUser } = useContext(AuthContext);
    
    const navigation = useNavigation();
    var guid = currentUser.guid; 

    const [list, setList] = useState(null);
    const [editMode, setEditMode] = useState({});
    const [isCreate, setIsCreate] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [bodyHeight, setBodyHeight] = useState(370); 

    const handleEditItem = (item) => {
        console.log('handleEditItem', item);
    };
 
    const createItem = (guid) => {
        // console.log('create', guid);
        navigation.navigate('Crear Promo', {isCreate, setIsCreate, onRefresh });
    };

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);

            getPromos();
			// navigation.navigate('Servicios');
		}, 2000);
	}, [editMode,list]);

    const getPromos = async () => {
        if (guid !== 'none') {     
            PromosController.getPromosForCompany(guid)
            .then(promosReturn => {
                // console.log('promosReturn: ', promosReturn);
                if (promosReturn !== null) {
                    setList(promosReturn);
                } else {
                    setList([]);
                }
            })
            .catch(error => {
                alert('ERROR al intentar cargar Promociones, ' + error);
            });
        }
    }

    const listPromos = () => {
		if (list) {
			return list.map((item, index) => {
				return item && (
					<PromoItem 
                        guid={guid}
                        key={index}
                        index={index}
                        item={item} 
                        editMode={editMode}
                        // setEditMode={setEditMode}
                        setEditMode={() => toggleEditMode(index)}
                        onRefresh={onRefresh}
                        onPress={() => handleEditItem(item)}
                        navigation={navigation}
                    />
				)
			});
		}
	};
    
    const toggleEditMode = (index) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [index]: !prevEditMode[index],
        }));
    };

    useEffect(() => {
        getPromos();
        
        if (list) {
            const initialEditMode = list.reduce((acc, _, index) => {
                return { ...acc, [index]: false };
            }, {});
            setEditMode(initialEditMode);
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
                    {listPromos()}
                </ScrollView>
            ) : (
                <View style={{
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text>No tiene una promoción creada aún</Text>
                </View>
            )}
        
            <View style={{ 
                width: '100%',
                // backgroundColor:'#555', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
            }}>
                <LinearGradient
                    colors={['#135054', '#a8ffff', '#fff']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1.5 }}
                    style={styles.btnCreate}
                    >
                    <TouchableOpacity 
                        styles={{ alignContent:'center' }}
                        onPress={() => createItem(guid)} >
                        <Text> Crear Promoción </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
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
        textAlign:'center',
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

export default PromosView;