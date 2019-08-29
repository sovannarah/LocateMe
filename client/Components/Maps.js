import React from 'react';
import {
    View,
    Text,
    AsyncStorage
} from 'react-native';
import MapView, {Marker, Circle, Callout, CalloutSubview} from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import Axios from 'axios';
import Card from './Card';
import * as Contacts from 'expo-contacts';

class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_user: null,
            location: this.props.location,
            region: this.props.region,
            users: this.props.users,
            name: ''
        }
        this.API_URL = 'https://locatemeapi.herokuapp.com';
    }

    componentDidMount() {
        this._getData();
    }

    _updatePosition = () => {
        let body = {
            "phoneNumber": this.state.number, 
            "lat": this.state.region.latitude,
            "lng": this.state.region.longitude
        }
        let header = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        Axios.post(this.API_URL + '/update/' + this.id_user, body, header)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    _getData = async() => {
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        this.setState({id_user: data});
    }

    addName = newName => {
        this.setState({name : newName})
    }

    addContact = async(number) => {
        this.props.nav.navigate('NewContact', {phone: number})
        // let {status} = await Permissions.getAsync(Permissions.CONTACTS);
        // console.log(number)
        // if(status !== 'granted') {
        //     this.setState({
        //         errorMessage : "La permission d'accéder à l'emplacement a été refusée",
        //     })
        // } else {
        //     // console.log(Contacts.Fields);
        //     const contact = {
        //         [Contacts.Fields.FirstName]: 'avosssss ',
        //         [Contacts.Fields.PhoneNumbers]: [{number}]
        //     };
        //     const contactId = await Contacts.addContactAsync(contact);
        // }
    }

    render() {
        if(this.state.users.length > 0 && this.props.value) {
            return(
                <MapView 
                style={{flex: 1}}
                initialRegion={this.state.region}> 
                    {this.state.users.map((user, i) => (
                        this.state.id_user === user._id ?
                            // <Marker 
                            // key={i}
                            // coordinate={{latitude: user.lat, longitude: user.lng, latitudeDelta: 1, longitudeDelta: 1}}
                            // title={'Moi'}
                            // />
                                <Circle key={i} center={{latitude: user.lat, longitude: user.lng}} 
                                radius={this.props.value*1000} strokeWidth={1} strokeColor="red" fillColor={'rgba(255,0,0,0.2)'}/>
                            // </Marker>
                        :
                            <Marker 
                            key={i}
                            coordinate={{latitude: user.lat, longitude: user.lng, latitudeDelta: 1, longitudeDelta: 1}}
                            title={user.phoneNumber}
                            onCalloutPress={() => {this.addContact(user.phoneNumber)}}>
                                <Callout>
                                    <Card usr={user} changeName={this.addName}/>
                                </Callout>
                            </Marker>
                    ))} 
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