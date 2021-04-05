import React from 'react'

import {Icon, Image} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/auth'

import UserImage from './../../assets/png/user.png'

import './TopBar.scss'

const TopBar = ({user, history}) => {

    const goBack = () => {
        history.goBack()
    }
    
    const logout = () => {
        firebase.auth().signOut()
    }

    return (
        <div className = "top-bar">
            <div className = "top-bar__left">
                <Icon name = "angle left" onClick = {goBack} />
            </div>
            <div className = "top-bar__right">
                <Link to = "/settings">
                    <Image src = {UserImage} />
                    {user.displayName}
                </Link>
                <Icon name = "power off" onClick = {logout} />
            </div>
        </div>
    )
}

export default withRouter(TopBar)
