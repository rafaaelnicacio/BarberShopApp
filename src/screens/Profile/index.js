import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { Text, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { useUser } from '../../store/user';


// import { Container } from './style';

const Profile = () => {
  const {setToken} = useUser('')
  const navigation = useNavigation()
  return (
    <Text>
      <TouchableOpacity style={{height: 80, width: 80, backgroundColor: 'red'}} onPress={async() => {
     await AsyncStorage.removeItem('token')
     setToken('')
     navigation.reset()
   }}>
     <Text>Hme</Text>
   </TouchableOpacity>
    </Text>
  )
}

export default Profile;