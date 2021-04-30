import React, {useEffect} from 'react';
import AssyncStorage from '@react-native-community/async-storage'
import { Container, LoadingIcon } from './style';
import Barberlogo from '../../assets/images/barber.svg'
import {useNavigation} from '@react-navigation/native'
import Api from '../../Api'
import {useUser} from '../../store/user'

const PreloadScreen = () => {
    const {setAvatar} = useUser()
    const navigation = useNavigation();
    useEffect(() => {
      navigation.navigate('SignInScreen')
    },
     [])
  return (
    
    <Container>
      <Barberlogo width="100%" height="160"/>
      <LoadingIcon size="large" color="#ffff"/>
    </Container>
  )
}

export default PreloadScreen;