
import { Alert } from 'react-native';

class AlertModal {
    
    showAlert = (titile,text) => {

		if (typeof(text) === 'string') {
			Alert.alert(
				titile, text,
				[
					// { text: 'Cancelar', style: 'cancel' },
					{ text: 'Aceptar' }
					// { text: 'Aceptar', onPress: () => console.log('Aceptar presionado') }
				],
				// { cancelable: false }
			);
		} else {
			var newSTR = text._j;
			Alert.alert(
				'', JSON.stringify(newSTR),
				[
					// { text: 'Cancelar', style: 'cancel' },
					{ text: 'Aceptar' }
					// { text: 'Aceptar', onPress: () => console.log('Aceptar presionado') }
				],
				// { cancelable: false }
			);
		}
    };

    showConfirmationAlert = (text) => {
        return new Promise((resolve) => {
			Alert.alert(
				'Confirmación', text,
				[
					{
						text: 'Cancelar',
						onPress: () => resolve(false),
						style: 'cancel',
					},
					{
						text: 'Aceptar',
						onPress: () => resolve(true),
					},
				],
				{ cancelable: false }
			);
        });
    };

	showBoolAlert = (text) => {
        return new Promise((resolve) => {
			Alert.alert(
				'Confirmación', text,
				[
					{
						text: 'SI',
						onPress: () => resolve(true),
					},
					{
						text: 'NO',
						onPress: () => resolve(false),
						style: 'cancel',
					}
				],
				{ cancelable: false }
			);
        });
    };
}

export default new AlertModal();