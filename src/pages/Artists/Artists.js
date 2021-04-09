import React, {useState, useEffect} from 'react'

import {Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

import './Artists.scss'

const db = firebase.firestore(firebase)

const Artists = () => {

    const [artists, setArtists] = useState([])

    useEffect(() => {
        db.collection("artists").get().then( response  => {
            let responseArtist = []
            response.docs?.map( doc => {
                let data = doc.data()
                data.id = doc.id
                responseArtist.push(data)
            } )
            setArtists(responseArtist)
        })
    }, [])

    return (
        <div className = "artists">
            <h1>Artistas</h1>
            <Grid>
                {
                    artists.map( artist => <Grid.Column key = {artist.id} mobile = {8} tablet = {4} computer = {3} >
                        <RenderArtists artist = {artist} />
                    </Grid.Column>)
                }
            </Grid>
        </div>
    )
}

const RenderArtists = ( {artist} ) => {

    const [bannerUrl, setBannerUrl] = useState("")

    useEffect(() => {
        firebase.storage().ref(`/artists/${artist?.banner}`).getDownloadURL().then(url => {
            setBannerUrl(url)
        })
    }, [])

    return (
        <Link to = {`/artist/${artist.id}`} >
            <div className = "artists__item" >
                <div className = "avatar" style = {{ backgroundImage: `url(${bannerUrl})`}} />
                <h3>{artist.name}</h3>
            </div>
        </Link>
    )
}

export default Artists
