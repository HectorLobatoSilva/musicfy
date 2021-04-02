import React from 'react'

import { Button } from 'semantic-ui-react'

import "./AuthOptions.scss"

export default function AuthOptions({ setSelectedForm }) {
    return (
        <div className="auth-options" >
            <h2>Millones de canciones en Musicfy</h2>
            <Button className="register" onClick = { () => setSelectedForm("register") } >Registrarte gratis</Button>
            <Button className="login" onClick = { () => setSelectedForm("login") } >Iniciar sesion</Button>
        </div>
    )
}
