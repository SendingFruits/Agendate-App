import React, { 
    createContext, useState, useEffect
} from 'react';

import AlertModal from '../views/utils/AlertModal';
import MapController from '../controllers/MapController'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [navigation, setNavigation] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        'guid':'none',
        'user':'none',
        'type':'none',
        'docu':'none',
        'name':'none',
        'last':'none',
        'pass':'none',
        'mail':'none', 
        'celu':'none',
        'logo':'none',
        'noti':'none', 
    });

    const delUser = async () => {
        try {
            await AsyncStorage.removeItem('userAgentateApp');
        } catch (error) {
            console.error('Error al intentar borrar usuario del Storage:', error);
        }
    }

    const setUser = async (user) => {
        try {
            // console.log('user: ', user);
            await AsyncStorage.setItem('userAgentateApp', JSON.stringify(user));
            setCurrentUser(user);
            return true;
        } catch (error) {
            console.error('Error al intentar obtener usuario del Storage:', error);
            return false;
        }
    }

    const getUser = async () => {
        try {
            var userStorage = await AsyncStorage.getItem('userAgentateApp');
            // console.log('userStorage: ', userStorage);
            var userJSON = JSON.parse(userStorage);
            if (userStorage !== null) {
                setCurrentUser(userJSON);
            } else {
                setCurrentUser(current_User);
            }
        } catch (error) {
            console.error('Error al intentar obtener usuario del Storage:', error);
        }
    }

    const setPassword = async (newPassword) => {
        try {
            const updatedUser = { ...currentUser, pass: newPassword };
            await AsyncStorage.setItem('userAgentateApp', JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
            return true;
        } catch (error) {
            console.error('Error al intentar cambiar la contraseña:', error);
            return false;
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            // Cierra la sesión después de cierto tiempo de inactividad
            setUser({
                'guid':'55',
                'user':'lcapi',
                'type':'customer',
                'docu':'none',
                'name':'none',
                'last':'none',
                'pass':'none',
                'mail':'none', 
                'celu':'none',
                'logo':'none',
                'noti':'none', 
            });
            if (isLogin) {
                setIsLogin(false);
                AlertModal.showAlert('Sesión Caducada',  'Vuelva a iniciar sesión.');

                const ubicacion = MapController.getLocation();
                navigation.navigate('Inicio', ubicacion);
            }
        }, 600000); // milisegundos
        // Limpia el temporizador cuando el componente se desmonta o cuando se cambia el usuario
        return () => clearTimeout(timer);
    }, [currentUser]); // Se vuelve a iniciar el temporizador cada vez que currentUser cambia
    
    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setIsLogin,
                currentUser,
                setCurrentUser,
                getUser,
                setUser,
                setPassword,
                navigation, 
                setNavigation
            }}>
            {children}
        </AuthContext.Provider>
    );
};