import React, {useState, useEffect} from 'react'

import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import firebase from 'firebase'
import 'firebase/storage'

import './BasicSlidersItems.scss'

const BasicSlidersItems = ({title, data, folderImage, urlName}) => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        className: "basic-slider-items__list"
    }

    return (
        <div className = "basic-slider-items">
            <h2>{title}</h2>
            <Slider {...settings} >
                {
                    data.map( item => <RenderItem key = {item.id} item = {item} folderImage = {folderImage} urlName = {urlName} /> )
                }
            </Slider>
        </div>
    )
}

const RenderItem = ({item, folderImage, urlName}) => {
    const {id, name, banner} = item

    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        firebase.storage().ref(`${folderImage}/${banner}`).getDownloadURL().then( url => {
            setImageUrl( url )
        })
    } , [item, folderImage, urlName])

    return (
        <Link to = {`${urlName}/${id}`}>
            <div className = "basic-slider-items__list-item" >
                <div 
                    className = "avatar" 
                    style = {{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}
                />
                <h3>{name}</h3>
            </div>
        </Link>
    )
}

export default BasicSlidersItems
