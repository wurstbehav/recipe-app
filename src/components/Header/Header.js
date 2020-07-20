import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../store/actions'
import styles from './Header.module.scss'
import headerImg from '../../assets/header-img.png'

const Header = ({ history }) => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(startLogout())
    }

    const titleHandler = () => {
        history.push('/home')
    }

    return (
        <div className={styles.mainHeader}>
            <div className="content-container">
                <div className={styles.header}>
                    <img style={{ cursor: 'pointer' }} src={headerImg} alt="title" onClick={titleHandler} />
                    <Link to='/'>
                        <button className={styles.button} onClick={logoutHandler}>Logout</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
