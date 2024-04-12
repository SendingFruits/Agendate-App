import React, { 
    createContext, useState, useEffect
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const CnnContext = createContext();

export const CnnProvider = ({ children }) => {

    const [navigation, setNavigation] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
    
    const setCnn = async (user) => {
        try {
            await AsyncStorage.setItem('cnnAgentateApp', JSON.stringify(user));
            setIsConnected(user);
            return true;
        } catch (error) {
            console.error('Error al intentar obtener estado de conexión del Storage:', error);
            return false;
        }
    }

    const getCnn = async () => {
        try {
            var cnnStorage = await AsyncStorage.getItem('cnnAgentateApp');
            if (cnnStorage) {
                setIsConnected(cnnStorage);
            } else {
                setIsConnected(isConnected);
            }
        } catch (error) {
            console.error('Error al intentar obtener usuario del Storage:', error);
        }
    }

    useEffect(() => {
        console.log('isConnected context', isConnected);
    }, [isConnected]); 
    
    return (
        <CnnContext.Provider
            value={{
                setCnn,
                getCnn,
                isConnected, 
                setIsConnected,
                navigation, 
                setNavigation
            }}>
            {children}
        </CnnContext.Provider>
    );
};