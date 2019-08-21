import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ImageBackground,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    AsyncStorage
} from 'react-native';
import KeyboardShift from './KeyboardShift';
import Background from '../Images/Backgrounds/1.png';
import Logo from '../Images/Logo/logo2.png';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Axios from 'axios';

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            number: '',
            fontLoad: false,
            location: null,
            errorMessage: null
        }
        this.API_URL = 'https://locatemeapi.herokuapp.com';
    }

    async componentDidMount() {
        await Font.loadAsync({
            'pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
        });
        this.setState({fontLoad: true})
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
              errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this.getData();
            this._getLocationAsync();
        }
    }

    changeNumber = e => {
        this.setState({number: e.nativeEvent.text})
    }

    login = () => {
        const regex = RegExp(/\+336\d{8}/g);
        if(regex.test(this.state.number) === true) {
            let body = {
                "phoneNumber": this.state.number, 
                "lat": this.state.location.coords.latitude,
                "lng": this.state.location.coords.longitude
            }
            let header = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            Axios.post(this.API_URL + '/login', body, header)
            .then((res) => {
                if(res.data) {
                    console.log('res', res.data)
                    this.storeData(res.data);
                }
            })
            .catch((error) => {
                if(error) {
                    this.setState({
                        errorMessage: 'Cet utilisateur existe déja'
                    });
                }
            })
        } else {
            this.setState({
                errorMessage: "Veuillez entrer un numero valide (ex: +33612345678)"
            })
        }
    }

    async storeData(user) {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(user._id));
            this.props.navigation.navigate('Home');
        } catch (error) {
            console.log('Something went wrong', error);
        }
    }

    async getData() {
        try {
            let userData = await AsyncStorage.getItem('userData');
            let data = JSON.parse(userData);
            if(data) {
                this.props.navigation.navigate('Home');
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
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
    }

    render() {
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.mainContainer}>
                    <ImageBackground source={Background} style={styles.backgroundImg}>
                        <View style={styles.overlay}>
                            <View style={styles.container}>
                                <View style={img.ctn}>
                                    <Image style={img.logo} source={Logo} />
                                    {this.state.fontLoad === true ?
                                        <Text style={{fontFamily: 'pacifico', color: 'white', fontSize: 40}}>Locate Me</Text>
                                    :
                                        <Text style={{color: 'white', fontSize: 40}}>Locate Me</Text>
                                    }
                                </View> 
                                    <View style={input.ctn}>
                                        <KeyboardShift>
                                        {() => (
                                            <View style={input.container}> 
                                                <TextInput
                                                    onChange={this.changeNumber}
                                                    placeholder={'+33'}
                                                    maxLength={12}
                                                    placeholderTextColor={'grey'}
                                                    style={input.number}
                                                    keyboardType={'phone-pad'}
                                                />
                                                <TouchableOpacity
                                                    style={input.submit}
                                                    onPress={this.login}
                                                >
                                                    <Text style={txt.number}>Connexion</Text>
                                                </TouchableOpacity>
                                                {this.state.errorMessage ? 
                                                    <Text style={styles.error}>{this.state.errorMessage}</Text>
                                                    :
                                                    null
                                                }
                                            </View>
                                        )}
                                        </KeyboardShift>
                                    </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImg: {
        flex: 1,
        width: '100%'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(5, 5, 5, 0.87)'
    },
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    error: {
        color: 'white'
    }
})

const input = StyleSheet.create({
    ctn: {
        flex: 0.4,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    number: {
        flex: 0.08,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: 'whitesmoke',
        color: 'white',
        paddingBottom: 15,
        paddingLeft: 15, 
        paddingRight: 15, 
        fontSize: 25,
    },
    submit: {
        backgroundColor: '#00aea9',
        height: 60,
        width: 200,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

const txt = StyleSheet.create({
    number: {
        color: 'white', 
        fontWeight: 'bold'
    },
})

const img = StyleSheet.create({
    ctn: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logo: {
        height: 260,
        width: 350
    }
})

export default Login;