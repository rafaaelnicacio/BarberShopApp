import React from 'react';
import {UserProvider} from './user'

const store = ({children}) => {
  return <UserProvider>
      {children}
  </UserProvider>;
}

export default store;