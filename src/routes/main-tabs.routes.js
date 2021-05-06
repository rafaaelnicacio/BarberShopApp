import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import Search from '../screens/Search'
import Appointments from '../screens/Appointments'
import Favorites from '../screens/Favorites'
import Profile from '../screens/Profile'
import CustomTab from '../components/CustomTab'
import Barber from '../screens/Barber'
const Tab = createBottomTabNavigator()

const MainRoutes = () => {
  return (
    <Tab.Navigator tabBar={props=><CustomTab {...props} />}>
        <Tab.Screen name= "HomeScreen" component={HomeScreen}/>
        <Tab.Screen name= "Search" component={Search}/>        
        <Tab.Screen name= "Appointments" component={Appointments}/>
        <Tab.Screen name= "Favorites" component={Favorites}/>
        <Tab.Screen name= "Profile" component={Profile}/>
        <Tab.Screen name="Barber" component={Barber}/>
    </Tab.Navigator>
  )
}

export default MainRoutes;