import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './../pages/Home'

const Routes = () => {
    return (
        <Switch>
            <Route path = "/" exact component = {Home} />
            <Route path = "/artists" exact ><h1>Artistas</h1></Route>
            <Route path = "/settings" exact ><h1>Settings</h1></Route>
        </Switch>
    )
}

export default Routes
