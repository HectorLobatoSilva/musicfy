import React, {useState, useEffect} from 'react'

import firebase from 'firebase'
import 'firebase/storage'

import './BannerArtist.scss'

const BannerArtist = ({artist}) => {

    const [bannerUrl, setBannerUrl] = useState(null)

    useEffect(() => {
        firebase.storage().ref(`artists/${artist?.banner}`).getDownloadURL().then(url => {
            setBannerUrl(url)
        })
    }, [artist])

    return (
        <div
            className = "banner-artist"
            style = {{
                backgroundImage: `url(${bannerUrl})`,
            }}
        >
            <div className = "banner-artist__gradient" />
            <div className = "banner-artist__info">
                <h4>ARTISTA</h4>
                <h1>{artist?.name}</h1>
            </div>
        </div>
    )
}

export default BannerArtist
