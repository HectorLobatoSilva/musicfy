import React, { useState } from 'react'

import { ToastContainer } from 'react-toastify'

import Auth from './pages/Auth'

import firebase from './utils/Firebase'
import 'firebase/auth'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  firebase.auth().onAuthStateChanged(currentUser => {
    if(!currentUser?.emailVerified) {
      firebase.auth().signOut()
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setIsLoading(false)
  })

  if (isLoading) {
    return null;
  }
  return (
    <>
      {!user ? <Auth /> : <UserLogged />}
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

const UserLogged = () => {

  console.log(firebase.auth().currentUser)

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
    <div style={styles}>
      <h1>Usuario logeado</h1>
      <button onClick={logout} >Cerrar sesion</button>
    </div>
  )
}

export default App;
