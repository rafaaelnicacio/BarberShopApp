import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AsyncStorage from  '@react-native-community/async-storage'
// import { Container } from './styles';
import {useNavigation} from '@react-navigation/native'
import { useUser } from '../../store/user';
const HomeScreen = () => {
  const {setToken} = useUser()
  const navigation = useNavigation()
  return <TouchableOpacity style={{height: 80, width: 80, backgroundColor: 'red'}} onPress={async() => {
    await AsyncStorage.removeItem('token')
    setToken(null)
  }}>
    <Text>Hme</Text>
  </TouchableOpacity>;
}

export default HomeScreen;