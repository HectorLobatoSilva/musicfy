import React, {useState} from 'react'
import { Button, Form, Input, Icon } from 'semantic-ui-react'
import {toast} from 'react-toastify'

import AlertErrors from './../../utils/AlertErrors'

import {reAuthenticate} from './../../utils/Api'

import firebase from 'firebase'
import 'firebase/auth'
import alertErrors from './../../utils/AlertErrors'

const UserEmail = ({ user, setContentModal, setTitleModal, setShowModal }) => {

    const handleClick = () => {
        setTitleModal("Actualizar email")
        setContentModal(<ChangeEmailForm userEmail = {user.email} setShowModal={setShowModal} />)
        setShowModal(true)
    }

    return (
        <div className="user-email">
            <h3>Email: {user.email}</h3>
            <Button circular onClick={handleClick} >Actualizar</Button>
        </div>
    )
}

const ChangeEmailForm = ({ userEmail, setShowModal }) => {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({email: "", password: ""})

    const handleSubmit = () => {
        if(!formData.email) {
            toast.warning("Email es igual")
            setShowModal(false)
        } else {
            setIsLoading(true)
            reAuthenticate(formData.password).then(() => {
                const currentUser = firebase.auth().currentUser
                currentUser.updateEmail(formData.email).then(() =>{
                    toast.success("Email actualizado")
                    currentUser.sendEmailVerification().then(() =>{
                        firebase.auth().signOut()
                    })
                }).catch(error => {
                    alertErrors(error?.code)
                })
            }).catch((error) => {
                AlertErrors(error?.code)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    const handleChangeState = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <Form onSubmit = {handleSubmit} >
            <Form.Field>
                <Input
                    type = "text"
                    name = "email"
                    defaultValue = {userEmail}
                    onChange = { handleChangeState }
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type = { isShowPassword ? "text" : "password" }
                    name = "password"
                    placeholder = "Ingresa la contrasena"
                    icon = {
                        <Icon name={`eye${isShowPassword ? " slash outline" : ""}`} link onClick={() => setIsShowPassword(!isShowPassword)} />
                    }
                    defaultValue = {formData.password}
                    onChange = {handleChangeState}
                />
            </Form.Field>
            <Button type = "submit" loading = {isLoading} >Actualizar</Button>
        </Form>
    )
}


export default UserEmail
