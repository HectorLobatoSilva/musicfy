import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './../pages/Home'
import Settings from './../pages/Settings'
import Artist from './../pages/Artist'
import Artists from './../pages/Artists'

const Routes = ({user, setReloadApp}) => {
    return (
        <Switch>
            <Route path = "/" exact component = {Home} />
            <Route path = "/artists" exact component = {Artists} />
            <Route path = "/artist/:id" exact component = {Artist} />
            <Route path = "/settings" exact >
                <Settings user = {user} setReloadApp = {setReloadApp} />
            </Route>
        </Switch>
    )
}

export default Routes
