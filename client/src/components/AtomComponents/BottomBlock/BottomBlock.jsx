import React from 'react';
import styles from './BottomBlock.module.scss'
import SHUStyles from '../SquadHelpUse/SquadHelpUse.module.scss'

const BottomBlock = () => {
    return (
        <section className={styles['bottom-block']}>
            <div className={`${SHUStyles.container} ${styles['bottom-conteiner']}`}>
                <div className={styles.allright}>
                    <span>Copyright © 2025 Atom.com</span>
                    <div className={styles.dot}></div>
                    <a href="#" className={styles['termly-display-preferences']}>Consent Preferences</a>
                </div>

                <a href="" className={styles.approved}>
                    <div className={styles['trust-pilot']}>
                        <strong>Excellent</strong>
                        <div className={styles['tp-stars']}>
                            <img src="https://img.atom.com/public/images/trustpilot-star.png" alt="" />
                            <img src="https://img.atom.com/public/images/trustpilot-star.png" alt="" />
                            <img src="https://img.atom.com/public/images/trustpilot-star.png" alt="" />
                            <img src="https://img.atom.com/public/images/trustpilot-star.png" alt="" />
                            <img src="https://img.atom.com/public/images/trustpilot-half-star.png" alt="" />
                        </div>
                        <div className={styles['tp-name']}>
                            <span>Trustpilot</span>
                        </div>
                    </div>

                    <div className={styles['footer-ratings']}>
                        <strong>
                            4.5/<span>5</span>
                        </strong>
                        <p>based on <span> 717 ratings</span></p>
                </div>
                </a>

                <div className={styles.social}>
                    <a href=""><img src="https://img.atom.com/public/images/footer/facebook.svg" alt="" /></a>
                    <a href=""><img src="https://img.atom.com/public/images/footer/twitter.svg" alt="" /></a>
                    <a href=""><img src="https://img.atom.com/public/images/footer/instagram.svg" alt="" /></a>
                    <a href=""><img src="https://img.atom.com/public/images/footer/linkedin.svg" alt="" /></a>
                    <a href=""><img src="https://img.atom.com/public/images/footer/youtube.svg" alt="" /></a>
                </div>
            </div>
        </section>
    );
}

export default BottomBlock;
