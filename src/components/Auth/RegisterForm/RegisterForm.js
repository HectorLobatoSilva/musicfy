import React from 'react'

import { Button, Icon, Form, Input } from 'semantic-ui-react'

import firebase from './../../../utils/Firebase'
import 'firebase/auth'

import "./RegisterForm.scss"

export default function RegisterForm({ setSelectedForm }) {

    const handleOnSubmit = () => {
        console.log("onsubmit")
    }
    return (
        <div className="register-form" >
            <h1>Empieza a escuchar con una cuenta gratis</h1>
            <Form onSubmit={handleOnSubmit} >
                <Form.Field>
                    <Input type="email" name="email" placeholder="Correo electronico" icon="mail outline" />
                </Form.Field>
                <Form.Field>
                    <Input type="password" name="password" placeholder="Contrasena" icon="eye" />
                </Form.Field>
                <Form.Field>
                    <Input type="text" name="username" placeholder="Como deverias llamarte?" icon="user circle outline" />
                </Form.Field>
                <Button type="submit">Continuar</Button>
            </Form>
            <div className="register-form__options" >
                <p onClick = { () => setSelectedForm(null) } >Volver</p>
                <p>Ya tienes musicfy? <span onClick = { () => setSelectedForm("login") } >Iniciar sesion</span></p>
            </div>
        </div>
    )
}
