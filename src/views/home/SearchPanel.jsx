import { 
	useState
} from 'react';

import { 
    TextInput, 
    StyleSheet, 
    View,
    TouchableOpacity
} from 'react-native';

import { 
	faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


const SearchPanel = ( params ) => {

    var {
        onSearch,
        width,
    } = params;

    const styles = StyleSheet.create({
        gradient: {
            width:width-120,
            height:35,
            position:'relative',
            top: 15,
            left: 0,
            right: 0,
            bottom: 0,
            marginVertical:19,
            marginHorizontal:23,
            borderWidth: 0.8,
            borderColor:'#393',
            borderRadius: 10,
            backgroundColor:'#ffffee80',
        },
        input: {
            top: 2.2,
            paddingHorizontal: 10,
        },
        icon: {
            marginTop: 5
        }
    });

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };
    
    return (
        // <LinearGradient colors={['#dfe4ff', '#ffffee']} style={styles.gradient}>
        <View style={styles.gradient}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
                <TextInput
                    style={styles.input}
                    // value={null}
                    onChangeText={setSearchQuery}
                    placeholder="Buscar empresa"
                    placeholderTextColor="#060"// Puedes ajustar el color del texto del marcador de posición
                />
                <TouchableOpacity
                    style={{ marginEnd:20 }}
                    onPress={ () => handleSearch() }
                    >
                    <FontAwesomeIcon icon={faSearch} color={'#060'} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
        // </LinearGradient>
    );
}

export default SearchPanel;