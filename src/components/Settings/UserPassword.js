import React, {useState} from 'react'
import { Button, Form, Input, Icon } from 'semantic-ui-react'
import {toast} from 'react-toastify'

import {reAuthenticate} from './../../utils/Api'
import AlertErrors from './../../utils/AlertErrors'

import firebase from 'firebase'
import 'firebase/auth'

const UserPassword = ({ setShowModal, setTitleModal, setContentModal }) => {
    const handleClick = () => {
        setTitleModal("Actualizar contrasena")
        setContentModal(<ChangePasswordForm setShowModal = {setShowModal} />)
        setShowModal(true)
    }
    return (
        <div className="user-password">
            <h3>Contrasena *******</h3>
            <Button circular onClick={handleClick} >Actaualizar</Button>
        </div>
    )
}

const ChangePasswordForm = ({ setShowModal }) => {

    const [isShowPassword, setIsShowPassword] = useState(
        {
            currentPassword: false,
            newPassword: false,
            repeatPassword: false
        }
    )
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({currentPassword: "", newPassword: "", repeatPassword: ""})
    
    const handleOnSubmit = () => {
        const {currentPassword, newPassword, repeatPassword} = formData
        if(!currentPassword || !newPassword || !repeatPassword){
            toast.warning("Las copntrasenas no pueden estar vacias")
        } else if (currentPassword == newPassword) {
            toast.warning("La nueva contrasena no puede ser igual a la actual")
        } else if ( newPassword != repeatPassword ) {
            toast.warning("Las nuevas contrasenas no son iguales")
        } else if (newPassword.length < 6) {
            toast.warning("La contrasena debe tener mas de 6 caracteres")
        } else {
            setIsLoading(true)
            reAuthenticate(currentPassword).then(() => {
                const currentUser = firebase.auth().currentUser
                currentUser.updatePassword(newPassword)
                firebase.auth().signOut()
            }).catch(error => {
                AlertErrors(error?.code)
            }).finally(() =>{
                setIsLoading(false)
            })
        }
    }

    const handleChangeState = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleChangeIsShowPasswordState = (type) => {
        setIsShowPassword({...isShowPassword, [type]: !isShowPassword[type] })
    }
    
    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Field>
                <Input
                    type = { isShowPassword.currentPassword ? "text" : "password" }
                    placeholder = "Contrasena actual"
                    name = "currentPassword"
                    value = {formData.currentPassword}
                    onChange = {handleChangeState}
                    icon = {
                        <Icon 
                            name={`eye${isShowPassword.currentPassword ? " slash outline" : ""}`} 
                            link 
                            onClick={ () => handleChangeIsShowPasswordState("currentPassword")} 
                        />
                    }
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type = { isShowPassword.newPassword ? "text" : "password" }
                    placeholder = "Contrasena actual"
                    name = "newPassword"
                    value = {formData.newPassword}
                    onChange = {handleChangeState}
                    icon = {
                        <Icon 
                            name={`eye${isShowPassword.newPassword ? " slash outline" : ""}`} 
                            link 
                            onClick={ () => handleChangeIsShowPasswordState("newPassword")} 
                        />
                    }
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type = { isShowPassword.repeatPassword ? "text" : "password" }
                    placeholder = "Contrasena actual"
                    name = "repeatPassword"
                    value = {formData.repeatPassword}
                    onChange = {handleChangeState}
                    icon = {
                        <Icon 
                            name={`eye${isShowPassword.repeatPassword ? " slash outline" : ""}`} 
                            link 
                            onClick={ () => handleChangeIsShowPasswordState("repeatPassword")} 
                        />
                    }
                />
            </Form.Field>
            <Button loading={isLoading} type="submit" >Actaulizar nombre</Button>
        </Form>
    )
}

export default UserPassword
