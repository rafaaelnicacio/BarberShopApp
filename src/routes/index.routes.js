import React from 'react'
import {creatstackNavigator} from '@react-navigation/stack'

const Stack = creatstackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Preload" component={Preload}/>
        <Stack.Screen name="SingIn" component={SingIn}/>
        <Stack.Screen name="SingUp" component={SingUp}/>
    </Stack.Navigator>
)