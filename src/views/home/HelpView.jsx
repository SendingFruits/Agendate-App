import { Text, StyleSheet, View } from 'react-native';

const HelpView = () => {
    return (
        <View style={styles.container}>
            <Text>HelpView</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    }
})

export default HelpView;