import ApiConfig from '../../services/ApiConfig';

import React, {
    useState, useEffect
} from 'react';

import { 
    StyleSheet, 
    RefreshControl,
    View,
    ScrollView,
    Text,
    TextInput,
    Modal,
    Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const SettingHost = () => {
   
    const navigation = useNavigation();

    const [from, setFrom] = useState(false);

    const saveNgrokCode = (code) => {
        ApiConfig.setNgrokToken(code);
        onRefresh();
    }

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
        setFrom(true);
		setTimeout(() => {
			setRefreshing(false);   
            navigation.navigate('Inicio', params={from});
		}, 2000);
	}, []);

    useEffect(() => {
	
	}, []); 

    return(
        <ScrollView
            style={{ flex: 1 }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			} >
           
        </ScrollView>
    );
}

export default SettingHost;

const styles = StyleSheet.create({
	
});