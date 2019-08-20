import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native';
import KeyboardShift from './KeyboardShift';
import Background from '../Images/Backgrounds/1.png';
import Logo from '../Images/Logo/logo2.png';
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            number: '',
            fontLoad: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
        });
        this.setState({fontLoad: true})
    }

    changeNumber = e => {
        this.setState({number: e.nativeEvent.text})
    }

    login = () => {

    }

    render() {
        return(
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
                                        </View>
                                    )}
                                    </KeyboardShift>
                                </View>
                             
                        </View>
                    </View>
                </ImageBackground>
            </View>
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
        backgroundColor: 'rgba(5, 5, 5, 0.88)'
    },
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly'
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
    }
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