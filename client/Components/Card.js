import React from 'react';
import {
    View
} from 'react-native';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    render() {
        console.log(this.state.user)
        return(
            <View>

            </View>
        );
    }
}

export default Card;