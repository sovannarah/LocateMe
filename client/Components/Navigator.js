import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Login';

const MainNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions : {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(MainNavigator)