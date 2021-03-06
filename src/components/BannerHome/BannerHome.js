import React, {useState, useEffect} from 'react'

import firebase from 'firebase'
import 'firebase/storage'

import './BannerHome.scss'

const BannerHome = () => {

    const [bannerUrl, setBannerUrl] = useState(null)

    useEffect(() => {
        firebase.storage().ref("other/banner-home.jpg").getDownloadURL().then(downloadUrl => {
            setBannerUrl(downloadUrl)
        }).catch()
    }, [])

    if(!bannerUrl) {
        return null
    }

    return (
        <div
            className = "banner-home"
            style = {{backgroundImage: `url(${bannerUrl})`}}
        />
    )
}

export default BannerHome
