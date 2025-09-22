import React from 'react';

import styles from './HeaderRight.module.scss'

const HeaderRight = () => {
    return (
        <div className={styles['header-right']}>
            <div className={styles['search-icon']}>
                <img src='https://www.atom.com/html/html/html/static_images/icon-search.svg'/>
                </div>
            <div className={`${styles['account-box']} ${styles.dropdown}`}>
                <div className={styles['dropdown-toggle']}>
                    <div className={styles.icon}>
                        <img src="https://www.atom.com/html/html/html/static_images/icon-user.svg" alt="" />
                    </div>
                </div>
                <ul className={styles['dropdown-menu']}>
                    <li>
                        <a className={styles['dropdown-item']} href="">
                            <div className={`${styles.icon} ${styles['icon-account']}`}>
                                <img src="https://www.atom.com/public/images/icon-account.svg" alt="" />
                            </div>
                            Login
                        </a>
                    </li>
                    <li>
                        <a className={styles['dropdown-item']} href="">
                            <div className={`${styles.icon} ${styles['icon-account']}`}>
                                <img src="https://www.atom.com/public/images/icon-account.svg" alt="" />
                            </div>
                            Signup
                        </a>
                    </li>
                </ul>
            </div>
            <div className={`${styles['phone-box']} ${styles.dropdown}`}>
                <div className={styles['dropdown-toggle']}>
                    <div className={styles.icon}>
                        <img src="https://www.atom.com/public/images/icon-phone.svg" alt="" />
                    </div>
                </div>
                <ul className={styles['dropdown-menu']}>
                    <li>
                        <a className={styles['dropdown-item']} href="">
                            <div className={`${styles.icon} ${styles['icon-phone']}`}>
                                <img src="https://www.atom.com/public/images/icon-phone.svg" alt="" />
                            </div>
                            (877) 355-3585
                        </a>
                    </li>
                    <li>
                        <a className={styles['dropdown-item']} href="">
                            <div className={`${styles.icon} ${styles['icon-chat']}`}>
                                <img src="https://www.atom.com/public/images/icon-chat-black.svg" alt="" />
                            </div>
                            Chat
                        </a>
                    </li>
                    <li>
                        <a className={styles['dropdown-item']} href="">
                            <div className={`${styles.icon} ${styles['icon-email']}`}>
                                <img src="https://www.atom.com/public/images/icon-email.svg" alt="" />
                            </div>
                            Email
                        </a>
                    </li>
                    <li>
                        <a className={styles['dropdown-item']} href="">
                            <div className={`${styles.icon} ${styles['icon-help']}`}>
                                <img src="https://www.atom.com/public/images/icon-help.svg" alt="" />
                            </div>
                            Help Desk
                        </a>
                    </li>
                </ul>
            </div>
            <a className={styles['favorites-box']} href="">
                <img src="https://www.atom.com/html/html/html/static_images/icon-heart.svg" alt="" />
            </a>
        </div>
    );
}

export default HeaderRight;
