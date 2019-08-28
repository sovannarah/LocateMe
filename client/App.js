import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './Components/Navigator'
import Login from './Components/Login';

class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
          user: null,
      }
  }


  render() {
      return (
        <Nav />
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