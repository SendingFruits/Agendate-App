import React, {
    useState, useEffect
} from 'react';

import UsersController from '../../controllers/UsersController';
import AlertModal from './AlertModal';

import { 
    StyleSheet, 
    RefreshControl,
    View,
    ScrollView,
    Text,
    TextInput
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

// import { useNavigation } from '@react-navigation/native';

const BaseError = ( params, debug=null ) => {
    
    // console.log('params error: ', params);
    var params = {
        errorType,
        setIsConnected
    } = params;

    // const navigation = useNavigation();
    const [token, setToken] = useState('');
    const [tokenNgrok, setTokenNgrok] = useState('');
    const [connection, setConnection] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback((connection) => {
		setRefreshing(true);

        if (connection !== '') {
            typeConnection();
        }

		setTimeout(() => {
			setRefreshing(false);   
            setIsConnected(true);
		}, 2000);
	}, [connection]);

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
    
    const handleNgrokToken = async (value) => {
        // console.log('value ngrok token',value);
        // setTokenNgrok(value);
    }

    const handleSetConnection = async (value) => {
        console.log('connection selected value',value);
        setConnection(value);
    }

    const typeConnection = () => {
        console.log('connection',connection);
        console.log('tokenNgrok',tokenNgrok);
        UsersController.handleConnection(connection, tokenNgrok)
		.then(response => {
			console.log('response: ', response);
		})
		.catch(error => {
			AlertModal.showAlert('', error);
		});
    }

    useEffect(() => {
        // setTokenNgrok('');
        // setConnection('');
	}, []); 

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
                <View style={styles.contentContainer}>
                    {errorView(errorType)}
                    <Text>Arrastra hacia abajo para recargar</Text>
                </View>
            </ScrollView>

            <>
                <Picker
                    style={{ backgroundColor:'#ddd', flex:0.01 }}
                    placeholder="Conexión"
                    selectedValue={connection}
                    onValueChange={(itemValue) => handleSetConnection(itemValue)} >
                    <Picker.Item label="Close" value="Close" />
                    <Picker.Item label="Azure" value="Azure" />
                    <Picker.Item label="Ngrok" value="Ngrok" />
                </Picker>

                {connection === 'Ngrok' ? (
                    <TextInput
                        style={{ textAlign:'center' }}
                        placeholder="Token"
                        value={tokenNgrok}
                        // onChangeText={ (text) => handleNgrokToken(text) }
                        onChangeText={(text) => {
                            setTokenNgrok(text);
                            console.log('token guardado',tokenNgrok);
                        }}
                        // onChange={(event) => {
                        //     console.log('event: ',event.nativeEvent);
                        //     setTokenNgrok(event.nativeEvent.text);
                        // }}
                        />
                ): null }
            </>
        </View>
    );
}

export default BaseError;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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