import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import { Chat } from '../Pages/Chat';

const Stack = createNativeStackNavigator();

export default function Navigation() {
return (
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='Login'>
            <Stack.Screen options={{headerShown : false}} name="Login" component={Login} />
            <Stack.Screen options={{headerShown : false}} name="Home" component={Home} />
            <Stack.Screen options={{headerShown : false}} name="Register" component={Register} />
            <Stack.Screen options={{headerShown : false}} name="Chat" component={Chat} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
