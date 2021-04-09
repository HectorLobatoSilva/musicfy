import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {Grid} from 'semantic-ui-react'

import Routes from './../../routes/Routes'
import MenuLeft from './../../components/MenuLeft'
import TopBar from './../../components/TopBar'

import './LoggedLayout.scss'

const LoggedLayout = ({user, setReloadApp}) => {
    return (
        <BrowserRouter>
            <Grid className = "logged-layout">
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuLeft user = {user} />
                    </Grid.Column>
                    <Grid.Column width={13} className = "content">
                        <TopBar user = {user} />
                        <Routes user = {user} setReloadApp = {setReloadApp} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <h2>Player</h2>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </BrowserRouter>
    )
}

export default LoggedLayout
