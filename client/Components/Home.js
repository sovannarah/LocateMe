import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Menu from './Menu';
import Maps from './Maps';

class Home extends React.Component {


    render() {
        return(
            <View style={container.main}>
                <Maps />
                <Menu nav={this.props}/>
            </View>
        );
    }
}

const container= StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'grey'
    }
})

export default Home;