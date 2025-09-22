import React from 'react';
import styles from './SquadHelpUse.module.scss';

const HowItWorks = () => {
    return (
        <section className={styles['home-block']}>
            <div className={styles.container}>
                <div className={styles['hb-caption']}>
                    <img className={styles['contest-work-img']} src="https://www.atom.com/resources/assets/svg/icons/icon-27.svg" alt="SVG" />
                    <h3>How Do Naming Contests Work?</h3>
                </div>
            <div className={styles['sm-g-2']}>
                <div className={styles['sm-g-wrapper']}>
                    <div className={styles.item}>
                        <div className={styles['item-cap']}>
                            <span>Step 1</span>
                        </div>
                        <div className={styles['custom-arrow']}></div>
                        <p className={styles['text-start']}>Fill out your Naming Brief and begin receiving name ideas in minutes</p>
                    </div>
                </div>
                <div className={styles['sm-g-wrapper']}>
                    <div className={styles.item}>
                        <div className={styles['item-cap']}>
                            <span>Step 2</span>
                        </div>
                        <div className={styles['custom-arrow']}></div>
                        <p className={styles['text-start']}>Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.</p>
                    </div>
                </div>
                <div className={styles['sm-g-wrapper']}>
                    <div className={styles.item}>
                        <div className={styles['item-cap']}>
                            <span>Step 3</span>
                        </div>
                        <div className={styles['custom-arrow']}></div>
                        <p className={styles['text-start']}>Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.</p>
                    </div>
                </div>
                <div className={styles['sm-g-wrapper']}>
                    <div className={styles.item}>
                        <div className={styles['item-cap']}>
                            <span>Step 4</span>
                        </div>
                        <p className={styles['text-start']}>Pick a Winner. The winner gets paid for their submission.</p>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}

export default HowItWorks;
