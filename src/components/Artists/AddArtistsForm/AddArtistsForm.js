import React, {useState, useCallback} from 'react'

import {Form, Input, Button, Image} from 'semantic-ui-react'
import {toast} from 'react-toastify'
import {v4 as uuidv4 } from 'uuid'

import {useDropzone} from 'react-dropzone'

import NoImage from './../../../assets/png/user.png'

import './AddArtistsForm.scss'

import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore'

const db = firebase.firestore(firebase)

const AddArtistsForm = ({setShowModal}) => {

    const initialUserData = {
        name: ""
    }

    const [banner, setBanner] = useState(null)
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState(initialUserData)
    const [isLoading, setIsLoading] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        const acceptedFile = acceptedFiles[0]
        setFile(acceptedFile)
        setBanner(URL.createObjectURL(acceptedFile))
    })

    const uploadImage = (fileName) => {
        const ref = firebase.storage().ref().child(`artists/${fileName}`)
        return ref.put(file)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    const handleOnSubmit = () => {
        // setShowModal(false)
        if(!formData.name) {
            toast.warning("Agrega un nombre al artista")
        } else if(!file) {
            toast.warning("Agrega una foto al artista")
        } else {
            setIsLoading(true)
            const fileName = uuidv4()
            uploadImage(fileName).then(()=> {
                db.collection("artists").add({name: formData.name, banner: fileName}).then(() => {
                    toast.success("Artista guardado exitosamente")
                    resetForm()
                    setIsLoading(false)
                    setShowModal(false)
                }).catch(() => {
                    toast.error("Error al guardar artista")
                    setIsLoading(false)
                })
            }).catch(() => {
                toast.error("Error al subir la imagen")
                setIsLoading(false)
            })
        }
    }

    const resetForm = () => {
        setFormData(initialUserData)
        setFile(null)
        setBanner(null)
    }

    const handleChangeState = ( event ) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <Form className = "add-artist-form" onSubmit = {handleOnSubmit} >
            <Form.Field className = "artist-banner">
                <div 
                    {...getRootProps()} 
                    className = "banner"
                    style={{backgroundImage: `url(${banner})`}}
                />
                <input {...getInputProps()} />
                {!banner && <Image src = {NoImage} /> }
            </Form.Field>
            <Form.Field className = "artist-avatar" >
                <div className = "avatar"
                    style={{backgroundImage: `url(${banner ? banner : NoImage})`}}
                />
            </Form.Field>
            <Form.Field >
                <Input
                    type = "text"
                    name = "name"
                    placeholder = "Nombre del artista"
                    defaultValue = {formData.name}
                    onChange = { handleChangeState }
                />
            </Form.Field>
            <Button loading = {isLoading} type = "submit" >Crear artista</Button>
        </Form>
    )
}

export default AddArtistsForm
