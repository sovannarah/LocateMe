import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './Components/Navigator'
import Menu from './Components/Menu';
import * as SMS from 'expo-sms';

class App extends React.Component {

  SendSms = async() => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
            ['+33654340203', '+33605943434'],
            'Ecrire votre message La'
          );
    } else {
        console.log("Pas de sms Reve pas");
    }
  }

  render() {
    return (
      <Nav screenProps={this.SendSms}/>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;