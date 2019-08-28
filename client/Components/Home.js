import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Axios from 'axios';
import Menu from './Menu';
import Maps from './Maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { isPointWithinRadius } from 'geolib';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            range: 3,
            users: null,
            region: null,
            surrounding: null
        }
        this.API_URL = 'https://locatemeapi.herokuapp.com';
        this._getLocationAsync();
    }

    componentDidMount() {
        
        this._getUsers();
        this._interval = setInterval(() => {
            this._getUsers();
        }, 5000);
    }

    _getLocationAsync = async() => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted') {
            this.setState({
                errorMessage : "La permission d'accéder à l'emplacement a été refusée",
            })
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1
            }
        })
    }

    _getUsers = () => {
        Axios.get(this.API_URL + '/all')
        .then((res) => {
            if(res.data) {
                this.setState({users: res.data});
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    _getProximityUsers = () => {
        let tmp= [];
        for(let i = 0; i < this.state.users.length; i++) {
            let check = isPointWithinRadius(
                            { latitude: this.state.users[i].lat, longitude: this.state.users[i].lng },
                            { latitude: this.state.region.latitude, longitude: this.state.region.longitude },
                            this.state.range*1000
                        );
            if(check === true) {
                tmp.push(this.state.users[i].phoneNumber);
            }
        }
        this.setState({surrounding: tmp});
        if(this.state.surrounding) { 
            this.props.navigation.navigate('Contact', { usersNumber: this.state.surrounding});
        }
    }

    changeRange = value => {
        this.setState({range: value})
    }

    render() {
        if(this.state.users) {
            return(
                <View style={container.main}>
                    <Maps nav={this.props.navigation} 
                    value={this.state.range} 
                    users={this.state.users}
                    region={this.state.region} />
                    <Menu nav={this.props} changeVal={this.changeRange} getProx={this._getProximityUsers}/>
                </View>
            );
        } else {
            return(<View></View>);
        }
    }
}

const container= StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'grey'
    }
})

export default Home;