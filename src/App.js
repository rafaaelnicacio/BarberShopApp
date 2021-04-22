import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import {Text} from 'react-native'

import ApplicationNavigator from './routes/index.routes'

export default () => {
    return (
        <NavigationContainer>
            <ApplicationNavigator/>

            
        </NavigationContainer>
    )
}
