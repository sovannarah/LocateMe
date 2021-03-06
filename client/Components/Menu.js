import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    AsyncStorage,
    Slider
} from 'react-native';
import Axios from 'axios';
import * as SMS from 'expo-sms';

class Menu extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id_user: null,
            tnp: null
        }
        this.API_URL = 'https://locatemeapi.herokuapp.com';
    }


    componentDidMount() {
        this.getData();
    }

    logout = () => {
        Axios.get(this.API_URL + '/logout/' + this.state.id_user)
        .then((res) => {
            this.clearData();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    clearData = async() => {
        let data = await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
        console.log(data)
        this.getData()
    }
    
    getData = async() => {
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        if(data) {
            this.setState({id_user: data});
        } else {
            this.props.nav.navigate('Login')
        }
    }

    render() {
        return(
            <View style={container.main}>
                <View style={container.slide}>
                    <Slider
                    style={input.slide}
                    minimumValue={1}
                    maximumValue={50}
                    onValueChange={value => this.props.changeVal(value)}
                    />
                </View>
                <View style={container.red}>
                    <TouchableOpacity 
                    style={input.dimension}>
                        <Image style={image.dimension} source={require('../Images/Icones/maps.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={input.dimension}
                    onPress={this.logout}>
                        <Image style={image.dimension} source={require('../Images/Icones/logout.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={this.props.getProx}
                    style={input.dimension}>
                        <Image style={image.dimension} source={require('../Images/Icones/message.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const container = StyleSheet.create({
    main:{
        width: '100%',
        height: Dimensions.get('screen').width / 4 + 60,
        backgroundColor: 'rgb(30, 30, 30)',

    },
    slide: {
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 40,
    },
    red: {
        width: '100%',
        height: Dimensions.get('screen').width / 4 + 20,
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
    },
    slide: {
        width: '100%'
    }
})

const image = StyleSheet.create({
    dimension: {
        height: '40%',
        width: '36%'
    }
})
export default Menu;