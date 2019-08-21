import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Menu from './Menu';

class Home extends React.Component {
    render() {
        return(
            <View style={container.main}>
                <Text>home page</Text>
                <Menu />
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