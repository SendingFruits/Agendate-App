import { 
    AuthContext 
} from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';

import FavoriteItem from './FavoriteItem';
import FavoriteController from '../../controllers/FavoritesController';

import React, { 
    useContext, useState, useEffect
} from 'react';

import { 
    StyleSheet,
    Dimensions,
    RefreshControl,
    View, 
    ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const FavoriteView = ( params ) => {

    const navigation = useNavigation();
    const { currentUser, favoriteSelected, setFavoriteSelected } = useContext(AuthContext);
    var guid = currentUser.guid; 

    const [list, setList] = useState(null);
    const [editMode, setEditMode] = useState({});
    const [isCreate, setIsCreate] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [bodyHeight, setBodyHeight] = useState(370); 

 
    const createItem = (guid) => {
        // console.log('create', guid);
    };

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            setEditMode(false);
            getFavorites();
			// navigation.navigate('Favoritos');
		}, 2000);
	}, [editMode,list]);

    const getFavorites = async () => {
        if (guid !== 'none') {
            FavoriteController.getFavoritesForService(guid)
            .then(favoritesReturn => {
                // console.log('favoritesReturn: ', favoritesReturn);
                if (favoritesReturn !== null) {
                    setList(favoritesReturn);
                } else {
                    setList([]);
                }
            })
            .catch(error => {
                alert('ERROR al intentar cargar los Favoritos, ' + error);
            });
        }
    }

    const listFavorites = () => {
        // console.log(list);
		if (list) {
			return list.map((item, index) => {
				return item && (
					<FavoriteItem 
                        guid={guid}
                        key={index}
                        item={item} 
                        edit={false}
                        onRefresh={onRefresh}
                        onPress={() => handleEditItem(item)}
                        navigation={navigation}
                        favoriteSelected={favoriteSelected}
                        setFavoriteSelected={setFavoriteSelected}
                    />
				)
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
        getFavorites();
        // console.log(list);
    }, [guid]);


    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
                {(list !== null && Array.isArray(list) && list.length > 0) ? (
                    <>
                        {listFavorites()}
                    </>
                ) : null }
            </ScrollView>
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
        height: height,
		minHeight: height,
        width: '100%',
        alignItems:'center',
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

export default FavoriteView;