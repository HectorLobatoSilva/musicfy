import React, {useState, useEffect} from 'react'

import { withRouter } from 'react-router-dom'

import firebase from 'firebase'
import 'firebase/firestore'

import BannerArtists from '../../components/Artists/BannerArtist'

import './Artist.scss'

const db = firebase.firestore(firebase)

const Artist = ({match}) => {

    const [artist, setArtist] = useState(null)

    useEffect(() => {
        db.collection('artists').doc(match?.params?.id).get().then((response) => {
            setArtist(response.data())
        })
    }, [match])

    return (
        <div className = "artist">
            <BannerArtists artist = {artist} />
        </div>
    )
}

export default withRouter(Artist)
