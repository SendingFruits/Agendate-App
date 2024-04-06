import { useNavigation } from '@react-navigation/native';

import FavoritesController from '../../controllers/FavoritesController';

import { 
    useState, useEffect 
} from 'react';

import { 
    TouchableOpacity
} from 'react-native';

import { 
	faStar
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


const FavoriteCreate = ( params ) => {
    
    const navigation = useNavigation();
    console.log(params);
    // var {
    //     idCliente,
    //     idServicio,
    // } = params;

    const [favoriteStar, setFavoriteStar] = useState(false);
    const [colorVisible, setColorVisible] = useState(true);

    const switchFavorite = () => {

        // const formData = {
		// 	idCliente,
		// 	idServicio,
		// };

		// FavoritesController.handleFavoriteCreate(formData)
		// .then(favoReturn => {
		// 	console.log('favoReturn: ', favoReturn);

        //     // setFavoriteStar();
		// })
		// .catch(error => {
		// 	alert(error);
		// });
    };

	useEffect(() => {
       // ,,,
	}, []);
    
    return (
        <TouchableOpacity
            style={{ flexDirection:'row', alignItems:'center', }} 
            onPress={() => switchFavorite()} >
            <FontAwesomeIcon icon={faStar} color={'#fa0'} size={30} />
        </TouchableOpacity>
        
    );
};

export default FavoriteCreate;