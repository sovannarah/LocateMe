import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';
import Axios from 'axios';

class Menu extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id_user: null,
        }
        this.API_URL = 'https://locatemeapi.herokuapp.com';
    }


    componentDidMount() {
        this.getData();
    }

    logout = () => {
        Axios.get(this.API_URL + '/logout/' + this.state.id_user)
        .then((res) => {
            console.log(res.data)
            if(res.data) {
               this.clearData();
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    clearData = async() => {
        AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
        this.props.nav.navigation.navigate('Login');
    }
    
    getData = async() => {
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        this.setState({id_user: data});
    }

    render() {
        return(
            <View style={container.main}>
                <TouchableOpacity 
                style={input.dimension}>
                    <Image style={image.dimension} source={require('../Images/Icones/maps.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                style={input.dimension}>
                    <Image style={image.dimension} source={require('../Images/Icones/message.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                style={input.dimension}
                onPress={this.logout}>
                    <Image style={image.dimension} source={require('../Images/Icones/logout.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const container = StyleSheet.create({
    main: {
        width: '100%',
        height: Dimensions.get('screen').width / 4 + 10,
        backgroundColor: 'rgb(30, 30, 30)',
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

const input = StyleSheet.create({
    dimension: {
        height: Dimensions.get('screen').width / 4,
        width: Dimensions.get('screen').width / 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const image = StyleSheet.create({
    dimension: {
        height: '40%',
        width: '36%'
    }
})
export default Menu;