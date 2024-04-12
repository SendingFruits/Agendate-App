import { 
	CnnContext
} from '../../context/CnnContext';

import React, {
    useState, useEffect, useContext
} from 'react';

import { 
    StyleSheet, 
    RefreshControl,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';

// import { useNavigation } from '@react-navigation/native';

const BaseError = ( params, debug=null ) => {
    
    var params = { errorType, navigation } = params;
    const [refreshing, setRefreshing] = useState(false);
    const { isConnected, setIsConnected } = useContext(CnnContext);

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);   
            navigation.navigate('Inicio');
		}, 2000);
	}, []);

    const errorView = (type) => {
        // console.log(type);
        switch (type) {
            case 'api':
                return (<Text style={styles.message} >Error de Conexión con la API</Text>);
                break;
            case 'debug':
                return (<Text style={styles.message} >Error: {debug}</Text>);
                break;
            case 'internet':
                return (<Text style={styles.message} >Error de Conexión a Internet</Text>);
                break;
            default:
                return null;
                break;
        }
    }

    useEffect(() => {
		setIsConnected(isConnected);
	}, [isConnected]); 

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} 
                        onRefresh={onRefresh} />
                    }
                >
                <View style={styles.contentContainer}>
                    <Image source={require('../../../assets/errorApiLogo.png')}
                        style={{ 
                            width: 50, height: 50, margin: 10
                        }} />
                    <Text style={styles.message} >Error de Conexión con la API</Text>
                    <Text>Arrastra hacia abajo para recargar</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default BaseError;

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: '#ee',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ee2',
    },
    message: {
        padding: 10,
        fontSize: 18,
        fontWeight:'bold'
    },
});