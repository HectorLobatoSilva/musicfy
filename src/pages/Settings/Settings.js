import React, { useState } from 'react'

import BasicModal from './../../components/Modal/BasicModal'

import UploadAvatar from './../../components/Settings/UploadAvatar'
import UserName from './../../components/Settings/UserName'
import UserEmail from './../../components/Settings/UserEmail'
import UserPassword from './../../components/Settings/UserPassword'

import './Settings.scss'

const Settings = ({ user, setReloadApp }) => {
    console.log("user", user)
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [contentModal, setContentModal] = useState(null)
    return (
        <div className="settings">
            <h1>Configuracion</h1>
            <div className="avatar-name" >
                <UploadAvatar user={user} setReloadApp={setReloadApp} />
                <UserName 
                    user={user}
                    setShowModal={setShowModal} 
                    setTitleModal={setTitleModal} 
                    setContentModal={setContentModal} 
                    setReloadApp={setReloadApp} 
                 />
            </div>
            <UserEmail
                user={user}
                setShowModal={setShowModal} 
                setTitleModal={setTitleModal} 
                setContentModal={setContentModal} 
            />
            <UserPassword
                setShowModal={setShowModal} 
                setTitleModal={setTitleModal} 
                setContentModal={setContentModal} 
            />
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} >
                {contentModal}
            </BasicModal>
        </div>
    )
}

export default Settings
