import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogin } from '../../store/actions/auth'
import styles from './LoginPage.module.scss';

const Login = () => {

    const dispatch = useDispatch()

    const fromSubmitHandler = () => {
        dispatch(startLogin())
    }

    return (
        <div>
            <div className={styles.boxlayout}>
                <div className={styles.boxlayoutbox}>
                    <h1 className={styles.boxlayouttitle}>Recipe App</h1>
                    <p>Manange Your Recipe</p>
                    <button className={styles.button} onClick={fromSubmitHandler}>Login with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login

