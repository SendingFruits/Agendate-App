import ApiConfig from '../../services/ApiConfig';

import React, { 
	useLayoutEffect, useState
} from 'react';

import { 
	View, 
	Text,
	TextInput,
	TouchableOpacity 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';


const Testing = ({ route }) => {
  	const navigation = useNavigation();

	const [ngrokToken, setNgrokToken] = useState();
	
	const handleSetToken = (value) => {
		setNgrokToken(value);
	};

	const handleValueButton = () => {
		ApiConfig.setNgrokToken(ngrokToken);
	};

  	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Testing`, // ${route.params.item.title}
			headerRight: () => (
				<View style={{ flex:1, padding:10 }}>
					<TouchableOpacity
						style={{ 
							flex:1,
							flexDirection:'row', 
							alignItems:'center', 
							backgroundColor:'#fa6',
							borderRadius: 10
						}}
						onPress={() => {
							() => handleValueButton();
							console.log(ApiConfig.API_BASE_URL);
						}}
						>
						<Text style={{ padding:8 }}>Enviar</Text>
					</TouchableOpacity>
						
				</View>
			),
		});
  	}, [navigation, route]);

  	return (
		<View style={{ flex:1, flexDirection:'column', alignItems:'center' }}>
			<View style={{ flex:1, flexDirection:'row', alignItems:'center' }}>
				<Text>ID Ngrok: </Text> 
				<TextInput
					// style={styles.input}
					placeholder="ID"
					value={ngrokToken}
					// onChangeText={setFirstName}
					onChangeText={(text) => handleSetToken(text)}
					/>
			</View>
		</View>
  	);
};

export default Testing;