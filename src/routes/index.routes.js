import React, {useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AuthRoutes from './auth.routes'
import MainTabs from './main-tabs.routes'
import { useUser } from '../store/user';

const Stack = createStackNavigator();

export default () => {
    const {token, setToken} = useUser()

    useEffect(()=>{
        const checkTokenData = async () => {
          const token = await AssyncStorage.getItem('token');
          if(token !== null){
            const json = await Api.checkToken(token)
            if(json.data && json.data.avatar){
              setAvatar(json.data.avatar)
              setToken(token)
            }
          } else{
              setToken(null)
          } 
        }
        checkTokenData()
      })
    return (
    <Stack.Navigator headerMode='none'>
        {token ? (
            <Stack.Screen
                name='HomeTab'
                component={MainTabs}
            />
        ):<Stack.Screen
            name='Auth'
            component={AuthRoutes}
            />
        }
    </Stack.Navigator>
)}