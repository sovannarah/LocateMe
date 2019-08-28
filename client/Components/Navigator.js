import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Login';
import Home from './Home';
import Contact from './Contact';
import NewContact from './NewContact';

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
        },
        Contact: {
            screen: Contact,
        },
        NewContact: {
            screen: NewContact,
        }
    },
)

export default createAppContainer(MainNavigator)