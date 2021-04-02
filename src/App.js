import React, {useState} from 'react'

import Auth from './pages/Auth'

import firebase from './utils/Firebase'
import 'firebase/auth'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  firebase.auth().onAuthStateChanged( currentUser => {
    setUser(currentUser)
    setIsLoading(false)
  } )

  if(isLoading) {
    return null;
  }
  return (
    !user ? <Auth /> : <UserLogged />
  );
}

const UserLogged = () => {

  const logout = () => {
    firebase.auth().signOut();
  }

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh"
  }

  return (
    <div style = { styles }>
      <h1>Usuario logeado</h1>
      <button onClick = { logout } >Cerrar sesion</button>
    </div>
  )
}

export default App;
