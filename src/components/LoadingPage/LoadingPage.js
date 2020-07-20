import React from 'react'
import styles from './LoadingPage.module.scss'

const LoadingPage = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.ldsRipple}
            ><div></div><div></div></div>
        </div>

    )
}

export default LoadingPage
