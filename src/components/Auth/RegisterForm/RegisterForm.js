import React, { useState } from 'react'

import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import { validateEmail } from './../../../utils/Validations'
import firebase from './../../../utils/Firebase'
import 'firebase/auth'

import "./RegisterForm.scss"

export default function RegisterForm({ setSelectedForm }) {

    const formDataInitalState = {
        email: "",
        password: "",
        username: ""
    }

    const [formData, setFormData] = useState(formDataInitalState)
    const [showPassword, setShowPassword] = useState(false)
    const [formError, setFormError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

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

        if (!formData.username) {
            errors.username = true
            formOk = false
        }
        setFormError(errors)

        if (formOk) {
            setIsLoading(true)

            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    changeUserName()
                    sendVerificationEmail()
                })
                .catch(() => {
                    toast.erro("Error al crear el usuario")
                })
                .finally(() => {
                    setIsLoading(false)
                    setSelectedForm(null)
                })
        }
    }

    const sendVerificationEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            toast.success("Se ah enviado un email de verificacion")
        }).catch(() => {
            toast.error("Error al enviar correo de verificacion")
        })
    }

    const changeUserName = () => {
        firebase.auth().currentUser.updateProfile({ displayName: formData.username }).catch(() => {
            toast.error("Error al asignar el nombre de usuario")
        })
    }

    const handleChageState = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleChangeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="register-form" >
            <h1>Empieza a escuchar con una cuenta gratis</h1>
            <Form onSubmit={handleOnSubmit} onChange={handleChageState} >
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
                <Form.Field>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Como deverias llamarte?"
                        icon="user circle outline"
                        value={formData.username}
                        error={formError.username}
                    />
                    {formError.username && <span className="error-text">
                        Introduce tu nombre
                    </span>}
                </Form.Field>
                <Button type="submit" loading={isLoading} >Continuar</Button>
            </Form>
            <div className="register-form__options" >
                <p onClick={() => setSelectedForm(null)} >Volver</p>
                <p>Ya tienes musicfy? <span onClick={() => setSelectedForm("login")} >Iniciar sesion</span></p>
            </div>
        </div>
    )
}