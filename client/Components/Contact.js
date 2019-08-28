import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
// import * as SMS from 'expo-sms';
// import console = require('console');

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: this.props.navigation.getParam('usersNumber'),
            selected: null,
            result: null
        }
    }

    // smsSend = async() => {
    //     const isAvailable = await SMS.isAvailableAsync();
    //     if (isAvailable) {
    //         const { result } = await SMS.sendSMSAsync(
    //             ['0123456789', '9876543210'], 'tete'
    //         )
    //     } else {
    //     // misfortune... there's no SMS available on this device
    //     }
        
    // }

    render() {
        return(
            <View style={container.main}>
                <TouchableOpacity
                style={input.send}
                onPress={this.smsSend}>
                    <Text>Envoyer</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const container = StyleSheet.create({
    main: {
        marginBottom: 40
    },
    contact: {
        height: 55,
        justifyContent: 'center'
    }
});

const input = StyleSheet.create({
    send: {
        backgroundColor: '#00aea9',
        height: 60,
        width: 200,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 30
    }
})
export default Contact;