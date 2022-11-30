import React, { createContext, useState } from 'react'

export const authContext = createContext({})   


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false)
    const [idUser, setIdUser] = useState(null)

  return (
   <authContext.Provider  value={{
    auth, 
    setAuth, 
    idUser, 
    setIdUser
  }}>
   {children}
   </authContext.Provider>
  )
}

export default AuthProvider
