import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    _addContact = () => {
        console.log('trotlro')
    }

    render() {
        return(
            <View>
                <Text>{this.props.usr.phoneNumber}</Text>
                <TouchableOpacity
                style={input.add}
                onPress={this._addContact}>
                    <Text>Add Contact</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const input = StyleSheet.create({
    add: {
        height: 36,
        width: 100,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#00aea9',
    }
})

export default Card;