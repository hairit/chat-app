import { StyleSheet, Text, View , Image , Platform , StatusBar } from 'react-native';
import Navigation from './Components/Navigation';
import Login from './Pages/Login';
import Home from './Pages/Home';
export default function App() {
  return(
      <Navigation />
  );
}
const styles = StyleSheet.create({
  app : {
    flex : 1 ,
    justifyContent : 'center',
    alignItems : 'center',
    height : '100%',
    width : '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight:0
  }
})