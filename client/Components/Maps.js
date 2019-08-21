import React from 'react';
import {
    View
} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Axios from 'axios';

class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            region: null,
            users: []
        }
        this.API_URL = 'https://locatemeapi.herokuapp.com';
    }


    componentDidMount() {
        this._getLocationAsync();
        this._getUsers();
    }

    _getLocationAsync = async() => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted') {
            this.setState({
                errorMessage : "La permission d'accéder à l'emplacement a été refusée",
            })
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location })
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

    render() {
        if(this.state.region) {
            return(
                <MapView 
                style={{flex: 1}}
                initialRegion={this.state.region}> 
                    <Marker
                    coordinate={this.state.region}
                    />
                    {this.state.users.map((user, i) => (
                        <Marker 
                        key={i}
                        coordinate={{latitude: user.lat, longitude: user.lng, latitudeDelta: 1, longitudeDelta: 1}}
                        title={user.phoneNumber}
                        />
                    ))}
                    {/* <Circle
                    center={this.state.region}
                    radius={200}
                    strokeWidth={150}
                    strokeColor="red"
                    fillColor="rgba(50,50,50, 0.5)"/> */}
                </MapView>
            );
        } else {
            return(
                <View></View>
            )
        }
    }
}

export default Maps;