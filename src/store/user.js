import React from 'react';
import { View } from 'react-native';
const UserContext = React.createContext()
 
export const UserProvider = ({children}) => {
    const [token, setToken] = React.useState('')
    const [avatar, setAvatar] = React.useState('')
    // const [favorites, setFevorites] = React.useState([])
  return (
      <UserContext.Provider value={{avatar, setAvatar, token, setToken}}>
          {children}
      </UserContext.Provider>
  );
}

  export function useUser() {
    const {
      setAvatar,
      avatar,
      token,
      setToken
  } = React.useContext(UserContext)
  return {
    setAvatar,
    avatar,
    token,
    setToken
  }
}