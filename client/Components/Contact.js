import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import * as SMS from 'expo-sms';

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: this.props.navigation.getParam('usersNumber'),
            selected: null,
            result: null,
            numbers: [],
            tmps: true
        }
    }

    test = () => {
        let tmp = [];
        for(let i = 0; i < this.state.users.length; i++) {
            tmp.push({number: this.state.users[i], check: false})
        }
        this.setState({numbers: tmp})
    }

    componentDidMount() {
        this.test();
    }

    SendSms = async() => {
        let contacts = [];
        for(let i =0; i < this.state.numbers.length; i++ ) {
            if(this.state.numbers[i].check === true) {
                contacts.push(this.state.numbers[i].number);
            }
        }
        console.log(contacts);
        if(contacts.length > 0) {
            const isAvailable = await SMS.isAvailableAsync();
            if (isAvailable) {
                const { result } = await SMS.sendSMSAsync(contacts);
                if(result) {
                    this.props.navigation.navigate('Home');
                }
            } else {
                console.log("Pas de sms Reve pas");
            }
        }
    }

    _handleNumber = number => {
        for(let i = 0; i< this.state.numbers.length; i++) {
            if(this.state.numbers[i].number === number.number) {
                this.state.numbers[i].check = !this.state.numbers[i].check
            }
        }
        this.setState({tmps: !this.state.tmps})
    }

    render() {
        return(
            <View style={container.main}>
                <ScrollView style={container.scroll}>
                    {this.state.numbers.map((item, i) => (
                        item.check === false ?
                        <TouchableOpacity style={input.check_false} key={i} onPress={() => {this._handleNumber(item)}}>
                            <Text>{item.number}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  style={input.check_true} key={i} onPress={() => {this._handleNumber(item)}}>
                            <Text>{item.number}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity
                style={input.send}
                onPress={this.SendSms}>
                    <Text>Envoyer</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const container = StyleSheet.create({
    main: {
        flex: 1,
    },
    contact: {
        height: 55,
        justifyContent: 'center'
    },
    scroll: {
        flex: 0.9,
    }
});

const input = StyleSheet.create({
    send: {
        backgroundColor: '#00aea9',
        flex: 0.1,
        width: 200,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
        marginBottom: 40
    },
    check_false: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    check_true: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        justifyContent: 'center',
        backgroundColor: '#DCDCDC',
        marginLeft: 20,
        paddingLeft: 20,
        marginRight: 20
    }
})
export default Contact;