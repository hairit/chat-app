import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image } from 'react-native';
import Navigation from './Components/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import Home from './Pages/Home';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <Navigation />
  );
}
const styles = StyleSheet.create({
  app : {
    flex : 1 ,
    justifyContent : 'center',
    alignItems : 'center',
    height : '100%',
    width : '100%'
  }
})