import React from 'react';
import styles from './Footer.module.scss'
import SHUStyles from '../SquadHelpUse/SquadHelpUse.module.scss'
import { ServicesContent,ToolsContent,SellersContent,CreativesContent,AtomContent,LegalContent } from './footerContent';

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className={`${SHUStyles.container} ${styles['footer-conteiner']}`}>
                {ServicesContent.map((item)=>(
                <div className={styles['footer-col']}>
                    <h3 className={styles['footer-heading']}>{item.head}</h3>
                    <div className={styles['footer-menu']}>
                        {item.links.map((item)=>(
                            <a href='#'>{item}</a>
                        ))}
                    </div>
                </div>
                ))}

                {ToolsContent.map((item)=>(
                <div className={styles['footer-col']}>
                    <h3 className={styles['footer-heading']}>{item.head}</h3>
                    <div className={styles['footer-menu']}>
                        {item.links.map((item)=>(
                            <a href='#'>{item}</a>
                        ))}
                    </div>
                </div>
                ))}

                <div className={styles['footer-col']}>
                    {SellersContent.map((item)=>(
                        <>
                        <h3 className={styles['footer-heading']}>{item.head}</h3>
                        <div className={styles['footer-menu']}>
                            {item.links.map((item)=>(
                                <a href='#'>{item}</a>
                            ))}
                        </div>
                        </>
                    ))}
                    {CreativesContent.map((item)=>(
                        <>
                        <h3 className={styles['footer-heading']}>{item.head}</h3>
                        <div className={styles['footer-menu']}>
                            {item.links.map((item)=>(
                                <a href='#'>{item}</a>
                            ))}
                        </div>
                        </>
                    ))}
                </div>

                <div className={styles['footer-col']}>
                {AtomContent.map((item)=>(
                    <>
                    <h3 className={styles['footer-heading']}>{item.head}</h3>
                    <div className={styles['footer-menu']}>
                        {item.links.map((item)=>(
                            <a href='#'>{item}</a>
                        ))}
                    </div>
                    </>
                ))}
                {LegalContent.map((item)=>(
                    <>
                    <h3 className={styles['footer-heading']}>{item.head}</h3>
                    <div className={styles['footer-menu']}>
                        {item.links.map((item)=>(
                            <a href='#'>{item}</a>
                        ))}
                    </div>
                    </>
                ))}
                </div>
            </div>
                <div className={styles['border-st']}></div>
        </footer>
    );
}

export default Footer;



//  <a href="#">Domains for Sale</a>
//                 <a href="#">Ultra Premium Marketplace</a>
//                 <a href="#">Premium Domains For Sale</a>
//                 <a href="#">Crowdsource Naming</a>
//                 <a href="#">Brandable Domains</a>
//                 <a href="#">.ai Domains</a>
//                 <a href="#">Short Domains</a>
//                 <a href="#">3 Letter Domains</a>
//                 <a href="#">4 Letter Domains</a>
//                 <a href="#">5 Letter Domains</a>
//                 <a href="#">6 Letter Domains</a>
//                 <a href="#">7 Letter Domains</a>
//                 <a href="#">One Word Domains</a>
//                 <a href="#">Aged Domains</a>
//                 <a href="#">Aftermarket Domains</a>
//                 <a href="#">Expired Domains</a>
//                 <a href="#">.in Domains</a>
//                 <a href="#">.ca Domains</a>
//                 <a href="#">.co.uk Domains</a>
//                 <a href="#">.de Domains</a>
//                 <a href="#">Domains for Rent</a>
//                 <a href="#">Domain Broker</a>
//                 <a href="#">Brand Identity Design</a>
//                 <a href="#">Brand Naming Agency</a>
//                 <a href="#">Logo Contests</a>
//                 <a href="#">Tagline Contests
//                 </a><a href="#">Trademark Filing Service</a>
//                 <a href="#">Audience Research</a>