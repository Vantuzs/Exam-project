import React,{useState} from 'react';
import HeaderLeft from './HeaderLeft/HeaderLeft';
import styles from './Header.module.scss'
import HeaderMiddle from './HeaderMiddle/HeaderMiddle';
import HeaderRight from './HeaderRight/HeaderRight';

const Header = () => {
    return (
        <div className={styles.header}>

            <div className={styles.container}>

                <div className={styles['header-inner']}>
                    <HeaderLeft/>
                    <HeaderMiddle/>
                    <HeaderRight/>
                </div>
            </div>
        </div>
    );
}

export default Header;
