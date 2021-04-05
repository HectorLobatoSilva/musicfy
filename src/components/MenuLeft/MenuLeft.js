import React, { useEffect, useState } from 'react'

import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import BasicModal from './../Modal/BasicModal'

import { isUserAdmin } from './../../utils/Api'

import './MenuLeft.scss'

const MenuLeft = ({ user, location }) => {

    const [menuActive, setMenuActive] = useState(location.pathname)
    const [userAdmin, setUserAdmin] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)

    useEffect( () => {
        setMenuActive(location.pathname)
    }, [location])

    useEffect(() => {
        isUserAdmin(user.uid).then(response => {
            setUserAdmin(response)
        })
    }, [user])

    const handleChangeMenuActive = (event, menu) => {
        setMenuActive(menu.to)
    }

    const handleModalType = (type) => {
        switch (type) {
            case "artist":
                setTitleModal("Nuevo artista")
                setContentModal(<h2>Formulario de nuevo artista</h2>)
                setShowModal(true)
                break;
            case "song":
                setTitleModal("Nueva cancion")
                setContentModal(<h2>Formulario de nueva cancion</h2>)
                setShowModal(true)
                break;
            default:
                setTitleModal(null)
                setContentModal(null)
                setShowModal(false)
                break;
        }
    }

    return (
        <React.Fragment>
            <Menu className="menu-left" vertical >
                <div className="top">
                    <Menu.Item as={Link} to="/" name="home" active={menuActive === "/"} onClick={handleChangeMenuActive}>
                        <Icon name="home" /> Inicio
                    </Menu.Item>
                    <Menu.Item as={Link} to="/artists" name="artists" active={menuActive === "/artists"} onClick={handleChangeMenuActive}>
                        <Icon name="music" /> Artistas
                    </Menu.Item>
                </div>
                {
                    userAdmin &&
                        <div className="footer" >
                            <Menu.Item onClick = { () => handleModalType("artist") }>
                                <Icon name="plus square outline" /> Nuevo artista
                            </Menu.Item>
                            <Menu.Item onClick = { () => handleModalType("song") }>
                                <Icon name="plus square outline" /> Nueva cancion
                            </Menu.Item>
                        </div>
                }
            </Menu>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} >
                {contentModal}
            </BasicModal>
        </React.Fragment>
    )
}

export default withRouter(MenuLeft)
