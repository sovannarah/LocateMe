import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Login';
import Home from './Home';

const MainNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions : {
                header: null
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(MainNavigator)