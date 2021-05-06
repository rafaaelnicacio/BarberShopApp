import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import UserContextProvider from './store/index'
import ApplicationNavigator from './routes/index.routes'

export default () => {
    return (
        <UserContextProvider>
          <NavigationContainer>
            <ApplicationNavigator />
          </NavigationContainer>
        </UserContextProvider>
    )
}
