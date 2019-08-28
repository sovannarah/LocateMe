import React from 'react'; 
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
class NewContact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: this.props.navigation.getParam('phone'),
            name: '',
            errorMessage: ''
        }
    }

    _changeName = value => {
        this.setState({name: value});
    }

    submitContact = async(name, number) => {
        let {status} = await Permissions.getAsync(Permissions.CONTACTS);
        if(status !== 'granted') {
            this.setState({
                errorMessage : "La permission d'accéder à l'emplacement a été refusée",
            })
        } else {
            if(name !== '') {
                const contact = {
                    [Contacts.Fields.FirstName]: name,
                    [Contacts.Fields.PhoneNumbers]: [{number}]
                };
                const contactId = await Contacts.addContactAsync(contact);
                if(contactId) {
                    this.props.navigation.navigate('Home');
                }
            } else {
                this.setState({errorMessage: 'Veuillez ajouter un nom'});
            }
        }
    }

    render() {
        return(
            <View style={container.main}> 
                <Text style={input.txt}>{this.state.phoneNumber}</Text>
                <TextInput style={input.name} onChangeText={this._changeName} placeholder={'Name....'} placeholderTextColor={'grey'}/>
                {this.state.errorMessage ?
                    <Text>{this.state.errorMessage}</Text>
                    :
                    null
                }
                <TouchableOpacity 
                style={input.add}
                onPress={() => {this.submitContact(this.state.name, this.state.phoneNumber)}}>
                    <Text>Ajouter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const container = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: 'blue',
        padding: 15
    }
})

const input = StyleSheet.create({
    txt: {
        fontSize: 30,
        marginTop: 15,
        marginBottom: 15,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    name: {
        height: 50,
        backgroundColor: 'red'
    },
    add: {
        backgroundColor: '#00aea9',
        height: 60,
        width: 200,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto'
    }
})

export default NewContact;