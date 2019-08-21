import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';


class Menu extends React.Component {
    
    constructor(props) {
        super(props);
    }

    logout = () => {

    }

    render() {
        return(
            <View style={container.main}>
                <TouchableOpacity 
                style={input.dimension}>
                    <Image style={image.dimension} source={require('../Images/Icones/message.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                style={input.dimension}
                onPress={this.logout}>
                    <Image style={image.dimension} source={require('../Images/Icones/logout.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const container = StyleSheet.create({
    main: {
        width: '100%',
        height: Dimensions.get('screen').width / 4 + 10,
        backgroundColor: 'rgb(30, 30, 30)',
        marginTop: 'auto',
        flexDirection: 'row'
    }
});

const input = StyleSheet.create({
    dimension: {
        height: Dimensions.get('screen').width / 4,
        width: Dimensions.get('screen').width / 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const image = StyleSheet.create({
    dimension: {
        height: '54%',
        width: '50%'
    }
})
export default Menu;