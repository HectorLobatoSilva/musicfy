import React, { useState } from 'react'

import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { validateEmail } from './../../../utils/Validations'
import firebase from 'firebase'
import 'firebase/auth'

import './LoginForm.scss'

export default function LoginForm({ setSelectedForm }) {
    const formDataInitialState = {
        email: "",
        password: ""
    }

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(formDataInitialState)
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState({})
    const [userActivate, setUserActivate] = useState(true)
    const [user, setUser] = useState(null)

    const handleChangeState = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleChangeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleOnSubmit = () => {
        setFormError({})
        let errors = {}
        let formOk = true
        if (!validateEmail(formData.email)) {
            errors.email = true
            formOk = false
        }
        if (formData.password.length < 6) {
            errors.password = true
            formOk = false
        }
        setFormError(errors)

        if (formOk) {
            setIsLoading(true)
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(response => {
                setUser(response.user)
                setUserActivate(response.user.emailVerified)
                if(!response.user.emailVerified){
                    toast.warning("Verifica tu cuenta para hacer login")
                }
            }).catch(error => {
                handleErrors(error.code)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    return (
        <div className="login-form" >
            <h1>Musica para todos</h1>
            <Form onSubmit={handleOnSubmit} onChange={handleChangeState} >
                <Form.Field>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Correo electronico"
                        icon="mail outline"
                        value={formData.email}
                        error={formError.email}
                    />
                    {formError.email && <span className="error-text">
                        Introduce un correo electronico valido
                    </span>}
                </Form.Field>
                <Form.Field>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contrasena"
                        icon={
                            <Icon name={`eye${showPassword ? " slash outline" : ""}`} link onClick={handleChangeShowPassword} />
                        }
                        value={formData.password}
                        error={formError.password}
                    />
                    {formError.password && <span className="error-text">
                        Ingresa una contrasena con mas de 6 caracteres
                    </span>}
                </Form.Field>
                <Button type="submit" loading = {isLoading}>Iniciar sesion</Button>
            </Form>

            { !userActivate && <SetResetEmailVerification
                user={user}
                setIsLoading={setIsLoading}
                setUserActivate={setUserActivate}
            />}

            <div className="login-form__options" >
                <p onClick={() => setSelectedForm(null)} >Volver</p>
                <p>
                    Mo tienes cuenta?
                    <span onClick={() => setSelectedForm("register")}>Registrate</span>
                </p>
            </div>
        </div>
    )
}


function SetResetEmailVerification({ user, setIsLoading, setUserActivate }) {
    const resendVerification = () => {
        user.sendEmailVerification().then(() => {
            toast.info("Se ah enviado el correo de verificacion")
        }).catch(error => {
            handleErrors(error.code)
        })
            .finally(() => {
                setIsLoading(false)
                setUserActivate(true)
            })
    }

    return (
        <div className="resend-verification-email">
            <p>
                Si no has recibido el email de verificacion
                puedes volver a enviarlo haciendo click
                <span onClick={resendVerification} > aqui</span>
            </p>
        </div>
    )
}

function handleErrors(code) {
    switch (code) {
        case "auth/wrong-password":
            toast.warning("El usuario o contrasena son incorrectos")
            break;
        case "auth/to-may-request":
            toast.warning("Demaciados intentos")
            break;
        case "auth/user-not-found":
            toast.warning("El usuario o contrasena son incorrectos")
            break;
    }
}