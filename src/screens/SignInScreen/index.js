import React  from 'react';
import {useNavigation, } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { 
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold

} from './style'
import Api from '../../Api'
import BarberLogo from '../../assets/images/barber.svg'
import EmailIcon from '../../assets/images/email.svg'
import LockIcon from '../../assets/images/lock.svg'
import SignInput from '../../components/SignInput'
import { useUser } from '../../store/user';

   

const SignInScreen = () => {
  const {setAvatar,setToken} = useUser()
  
  const navigation = useNavigation()
  const [emailField, SetEmailField] = React.useState('rafaelnicacio154@gmail.com')
  const [passwordField, SetPasswordField] = React.useState('123')

  
  

  const handleSignClick = async() =>{
    if(emailField != '' && passwordField != '') {
      let json = await Api.SignInScreen(emailField, passwordField)
      if(json.token){
        await AsyncStorage.setItem('token', json.token);
       setAvatar(() => json.data.avatar)
          
        setToken(json.token)
      }else{
        alert("Email e/ou Senha incorreta!")
      }

    }else{
      alert("Preencha todos os campos!")
    }

  }
  const handleMassegeClick = () =>{
    navigation.reset({
      routes: [{name: 'SignUpScreen'}]
    })
  }
  return (
    <Container>
      <BarberLogo width='100%' height='160'/>

      <InputArea>

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
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMassegeClick}>
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
      
    </Container>
    )
}

export default SignInScreen;