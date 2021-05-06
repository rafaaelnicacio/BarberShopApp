import React  from 'react';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { 
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold

} from './style';
import BarberLogo from '../../assets/images/barber.svg'
import EmailIcon from '../../assets/images/email.svg'
import LockIcon from '../../assets/images/lock.svg'
import SignInput from '../../components/SignInput'
import Person from '../../assets/images/person.svg'
import Api from '../../Api'
import { useUser } from '../../store/user';

   

const SignUpScreen = () => {
  const {avatar, setAvatar, setToken} = useUser()
  const navigation = useNavigation()
  const [nameField, SetNameField] = React.useState('')
  const [emailField, SetEmailField] = React.useState('')
  const [passwordField, SetPasswordField] = React.useState('')
  

  const handleSignClick = async () =>{
    if(nameField != '' && emailField != '' && passwordField != ''){
      let res = await Api.SignUpScreen({name:nameField, email:emailField, password:passwordField})
      if(res.token){
        await AsyncStorage.setItem('token', res.token);
        setAvatar(res.avatar)
           setToken(res.token)
      }else{
        alert("Erro :" +res.erro)
      }
    }else{
      alert("Preencha todos os campos!")
    }

  }
  const handleMassegeClick = () =>{
    navigation.reset({
      routes: [{name: 'SignInScreen'}]
    })
  }
  return (
    <Container>
      <BarberLogo width='100%' height='160'/>

      <InputArea>
      <SignInput 
          IconSvg={Person}
          placeholder="Digite seu Nome"
          value= {nameField}
          onChangeText={t=>SetNameField(t)}
        />
        <SignInput 
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value= {emailField}
          onChangeText={t=>SetEmailField(t)}
        />
        <SignInput 
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value= {passwordField}
          onChangeText={t=>SetPasswordField(t)}
          password= {true}
          />
        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMassegeClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
      
    </Container>
    )
}

export default SignUpScreen;