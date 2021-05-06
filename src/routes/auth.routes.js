import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { PreloadScreen, SignInScreen, SignUpScreen } from '../screens';


const Stack = createStackNavigator();
 
export default () => (
    <Stack.Navigator
    initialRouteName="PreloadScreen"
        screenOptions= {{
            headerShown: false
        }}
    >
        <Stack.Screen name="PreloadScreen" component={PreloadScreen}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>     
    </Stack.Navigator>
)