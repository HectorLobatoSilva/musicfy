import React, {useState} from 'react'

import {Form, Input, Button} from 'semantic-ui-react'
import {toast} from 'react-toastify'
import firebase from 'firebase'
import 'firebase/auth'

const UserName = ({user, setShowModal, setTitleModal, setContentModal, setReloadApp}) => {

    const handleClick = () => {
        setTitleModal("Actualizar usuario")
        setContentModal(<ChangeDisplayNameForm displayName = {user.displayName} setShowModal = {setShowModal} setReloadApp = {setReloadApp} />)
        setShowModal(true)
    }

    return (
        <div className = "user-name">
            <h2>{user.displayName}</h2>
            <Button circular onClick = {handleClick} >Actualizar</Button>
        </div>
    )
}

const ChangeDisplayNameForm = ({displayName, setShowModal, setReloadApp}) => {

    const [formData, setFormData] = useState({displayName})
    const [isLoading, setIsLoading] = useState(false)

    const handleOnSubmit = () => {
        if(!formData.displayName || formData.displayName == displayName) {
            setShowModal(false)
            console.log("empty")
        } else {
            setIsLoading(true)
            firebase.auth().currentUser.updateProfile({ displayName: formData.displayName }).then(() => {
                setReloadApp(prevState => !prevState)
                toast.success("Nombre actualizado")
                setIsLoading(false)
                setShowModal(false)
            }).catch(() => {
                toast.error("Error al asignar el nombre de usuario")
            })
        }
    }

    const handleChangeUserName = (event) => {
        setFormData({displayName: event.target.value})
    }
    return (
        <Form onSubmit = {handleOnSubmit}>
            <Form.Field>
                <Input 
                    defaultValue = {formData.displayName}
                    onChange = {handleChangeUserName}
                />
            </Form.Field>
            <Button loading = {isLoading} type = "submit" >Actaulizar nombre</Button>
        </Form>
    )
}

export default UserName
