import React, {useState, useEffect} from 'react'

import BannerHome from './../../components/BannerHome'
import BasicSlidersItems from './../../components/Sliders/BasicSlidersItems'

import firebase from 'firebase'
import 'firebase/firestore'

import './Home.scss'

const db = firebase.firestore(firebase)

const Home = () => {

    const [artists, setArtists] = useState([])

    useEffect(() => {
        db.collection("artists").get().then((response) =>{
            let responseArtist = []
            response.docs?.map(artist => {
                if(artist.exists) {
                    const data = artist.data()
                    data.id = artist.id
                    responseArtist.push(data)
                }
            })
            setArtists(responseArtist)
        })

    }, [])

    return (
        <React.Fragment>
            <BannerHome/>
            <div className = "home">
                <BasicSlidersItems title = "Ultimos artistas" data = {artists} folderImage = "artists" urlName = "/artist" />
                <h1>Home component</h1>
            </div>
        </React.Fragment>
    )
}

export default Home
