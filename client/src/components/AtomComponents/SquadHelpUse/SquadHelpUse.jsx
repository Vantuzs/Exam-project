import React from 'react';
import styles from './SquadHelpUse.module.scss';

const SquadHelpUse = () => {
    return (
        <section className={styles['home-block']}>
            <div className={styles.container}>
                <div className={styles['hb-caption']}>
                    <div className={styles.max500}>
                        <span>Our Services</span>
                        <h2>3 Ways To Use Atom</h2>
                        <p>Atom offers 3 ways to get you a perfect name for your business.</p>
                    </div>
                </div>

                <div className={styles['sm-g-2']}>
                    <div className={styles['sm-g-wrapper']}>
                        <div className={styles['align-box']}>
                            <div className={styles['a-box-content']}>
                                <div className={styles.icon}>
                                    <img alt="" src="https://www.atom.com/html/html/static_images/contests/g1.svg"></img>
                                </div>
                                <h3>Launch a Contest</h3>
                                <p className={styles['a-box-p']}>Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.</p>
                            </div>
                            <div className={styles['a-box-but']}>
                                <a href="#" className={styles['button-brand']}>
                                <span>Launch a Contest</span>
                                {/* <img src="https://www.atom.com/html/html/html/static_images/contests/arrow-right.svg" className={styles.arrow} alt="arrow-right" /> */}
                                <div className={styles['custom-arrow']}></div>
                            </a>
                            </div>
                        </div>
                    </div>

                    <div className={styles['sm-g-wrapper']}>
                        <div className={styles['align-box']}>
                            <div className={styles['a-box-content']}>
                                <div className={styles.icon}>
                                    <img alt="" src="https://www.atom.com/html/html/static_images/contests/g2.svg"></img>
                                </div>
                                <h3>Explore Names For Sale</h3>
                                <p className={styles['a-box-p']}>Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design</p>
                            </div>
                            <div className={styles['a-box-but']}>
                                <a href="#" className={styles['button-brand']}>
                                <span>Explore Names For Sale</span>
                                {/* <img src="https://www.atom.com/html/html/html/static_images/contests/arrow-right.svg" className={styles.arrow} alt="arrow-right" /> */}
                                <div className={styles['custom-arrow']}></div>
                            </a>
                            </div>
                        </div>
                    </div>

                    <div className={styles['sm-g-wrapper']}>
                        <div className={styles['align-box']}>
                            <div className={styles['a-box-content']}>
                                <div className={styles.icon}>
                                    <img alt="" src="https://www.atom.com/html/html/static_images/contests/g3.svg"></img>
                                </div>
                                <h3>Agency-level Managed Contests</h3>
                                <p className={styles['a-box-p']}>Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs</p>
                            </div>
                            <div className={styles['a-box-but']}>
                                <a href="#" className={styles['button-brand']}>
                                <span>Learn More</span>
                                {/* <img src="https://www.atom.com/html/html/html/static_images/contests/arrow-right.svg" className={styles.arrow} alt="arrow-right" /> */}
                                <div className={styles['custom-arrow']}></div>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SquadHelpUse;
