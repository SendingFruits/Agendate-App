import { 
    useState, useEffect 
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import {
    faMapMarker,
    faStar
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const FavoriteItem = (params) => {
    
    var {
        item,
        edit,
        navigation,
        favoriteSelected, 
        setFavoriteSelected
    } = params;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(280); 
    const [editMode, setEditMode] = useState(edit);


    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const goToMap = () => {
        // setFavoriteCoordinates({latitude:item.latitude, longitude:item.longitude});
        setFavoriteSelected(item);
        // console.log('favoriteSelected',favoriteSelected);
        navigation.navigate('Inicio');
    }
   
	useEffect(() => {
        setBodyHeight(130);
	}, [edit]);
    
    return (
        <View style={styles.container}>
            {!editMode ? (
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
                                <TouchableOpacity 
                                    style={{ flexDirection:'row', alignItems:'center', }} 
                                    onPress={() => goToMap()} >
                                    <FontAwesomeIcon style={{ color:'#fa0' }} icon={faStar} />
                                    <FontAwesomeIcon style={{ color:'#0af', marginLeft:6 }} icon={faMapMarker} />
                                </TouchableOpacity>
                                    <Text style={{ marginLeft:6 }}>{item.razonSocial}</Text>
                            </View>

                            <View style={{ 
                                flexDirection:'row',
                                alignItems:'center',
                                marginHorizontal: 20,
                                }}>
                                {/* <TouchableOpacity 
                                    style={{ flexDirection:'row', alignItems:'center', }} 
                                    onPress={() => switchItem()} >
                                    <FontAwesomeIcon icon={faClose} />
                                </TouchableOpacity> */}
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
                                    
                                        {/* <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Empresa:</Text>    
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.razonSocial}</Text>
                                            </View>
                                        </View> */}
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Direccion:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.direccionEmpresa}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Servicio:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.nombreServicio}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Tipo:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.tipoServicio}</Text>
                                            </View>
                                        </View>
                                        {/* <View style={styles.row}>
                                            
                                        </View> */}

        
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
        
                                </LinearGradient>
                            </View>
                        </View>
                    ) : (
                        null
                    )}
                </>
            ) : (
                <></>
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

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

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

export default FavoriteItem;