import React, { useState } from 'react'
import AuthOptions from './../../components/Auth/AuthOptions'
import LoginForm from './../../components/Auth/LoginForm'
import RegisterForm from './../../components/Auth/RegisterForm'

import BackgroundImage from './../../assets/jpg/background-auth.jpg'
import LogoNameGreenApp from './../../assets/png/logo-name-green.png'
import LogoNameWhitenApp from './../../assets/png/logo-name-white.png'

import "./Auth.scss"

export default function Auth() {
    const [selectedForm, setSelectedForm] = useState(null);

    const handleForm = () => {
        switch (selectedForm) {
            case "login": return <LoginForm setSelectedForm = {setSelectedForm} />
            case "register": return <RegisterForm setSelectedForm={setSelectedForm} />
            default: return <AuthOptions setSelectedForm={setSelectedForm} />
        }
    }
    return (
        <div className="auth" style={{ backgroundImage: `url(${BackgroundImage})` }} >
            <div className="auth__dark" />
            <div className="auth__box" >
                <div className="auth__box-logo">
                    <img src={LogoNameWhitenApp} alt="musicfy" />
                </div>
                {handleForm()}
            </div>
        </div>
    )
}
