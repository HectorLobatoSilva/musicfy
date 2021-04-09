import React, { useState, useCallback } from 'react'

import { Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'

import NoAvatar from './../../assets/png/user.png'

const UploadAvatar = ({ user, setReloadApp }) => {

    const [avatarUrl, setAvatarUrl] = useState(user.photoURL)

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        setAvatarUrl(URL.createObjectURL(file))
        handleSaveImageFirebase(file).then(() =>{
            uploadUserAvatar()
        })
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    const handleSaveImageFirebase = (file) => {
        const ref = firebase.storage().ref().child(`avatar/${user.uid}`)
        return ref.put(file)
    }

    const uploadUserAvatar = () =>{
        firebase.storage().ref(`avatar/${user.uid}`).getDownloadURL().then( async response => {
            await   firebase.auth().currentUser.updateProfile({photoURL: response})
            setReloadApp(prevState => !prevState)
        }).catch(error => {
            toast.error("Error al actualizar el avatar")
        })
    }

    return (
        <div className="user-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ? <Image src={NoAvatar} />
                    :
                    <Image src={avatarUrl ? avatarUrl : NoAvatar} />
            }
        </div>
    )
}

export default UploadAvatar
