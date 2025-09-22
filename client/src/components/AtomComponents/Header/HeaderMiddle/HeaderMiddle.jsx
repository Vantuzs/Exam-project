import React from 'react';
import styles from './HeaderMiddle.module.scss'

const HeaderMiddle = () => {
    return (
        <div className={styles['header-mid']}>
            <ul>
                <li className={styles['bigger-submenu']}><div className={styles['no-link']}>Domains for Sale</div> 
                <div className={styles['sub-menu-large']}>
                    <div className={styles['main-links-left']}>
                        <a href="" className={styles['sub-menu-link']}>
                            <div className={styles.images}>
                                <img loading='lazy' className={styles.image} src="	https://www.atom.com/public/images/common/cdm_icon.svg" alt="Curated Domain Marketplace" />
                            </div>
                            <div className={styles['link-details']}>
                                <div className={styles['m-head']}>
                                    Premium Domain Marketplace
                                    <img width='7' height='12' className={styles.arrow} src="https://img.atom.com/public/images/payments/arrow_right_black.svg" alt="arrow" />
                                </div>
                                <p>Explore 300,000+ expert-curated, brandable domains to elevate your business.</p>
                            </div>
                        </a>

                        <a href="" className={styles['sub-menu-link']}>
                            <div className={styles.images}>
                                <img loading='lazy' className={styles.image} src="https://www.atom.com/public/images/common/upm_icon.svg" alt="Ultra Premium Marketplace" />
                            </div>
                            <div className={styles['link-details']}>
                                <div className={styles['m-head']}>
                                    Ultra Premium Marketplace
                                    <img width='7' height='12' className={styles.arrow} src="https://img.atom.com/public/images/payments/arrow_right_black.svg" alt="arrow" />
                                </div>
                                <p>Discover the world’s most coveted and powerful domains for top-tier brands.</p>
                            </div>
                        </a>

                        <a href="" className={styles['sub-menu-link']}>
                            <div className={styles.images} id={styles['last-images-main-links-left']}>
                                <img loading='lazy' className={styles.image} src="https://www.atom.com/public/images/common/sapphire_icon.svg" alt="Sapphire Marketplace" />
                            </div>
                            <div className={styles['link-details']}>
                                <div className={styles['m-head']}>
                                    Sapphire Marketplace
                                    <img width='7' height='12' className={styles.arrow} src="https://img.atom.com/public/images/payments/arrow_right_black.svg" alt="arrow" />
                                </div>
                                <p>Find one-word domains with modern extensions like .ai, .io, and .xyz.</p>
                            </div>
                        </a>

                    </div>

                    <div className={styles['top-collections']}>
                        <h3>Top Domain Collections</h3>
                        <a href="#">Premium Domains</a>
                        <div>
                        <a href="#">.ai Domains</a>
                        <span>Popular</span>
                        </div>
                        <a href="#">Domain Auction </a>
                        <a href="#">Short Domains</a>
                        <a href="#">One Word Domains</a>
                        <a href="#">3 Letter Domains</a>
                        <a href="#">4 Letter Domains</a>
                        <a href="#">5 Letter Domains</a>
                        <a href="#">Country-Specific Domains</a>
                    </div>

                    <a href="" className={styles['get-started']}>
                        <div className={styles.images2}>
                            <img className={styles.image} src="https://www.atom.com/public/images/common/get_started.png" />
                        </div>
                        <h4>
                            <img loading='lazy' src="https://img.atom.com/public/images/common/search.svg" alt="Magnifier" />
                            Get Started
                            <img loading='lazy' src="https://img.atom.com/public/images/payments/arrow_right_black.svg" alt="arrow" className={styles.arrow}/>
                        </h4>
                        <p>Find your perfect domain today and buy instantly in the Atom.com marketplace.</p>
                    </a>
                    </div>

                    
                    </li>
                <li className={styles['bigger-submenu']}><div className={styles['no-link']}>Naming & Branding</div>
                    <div className={`${styles["sub-menu-large"]} ${styles["brand-naming"]}`}>
                        <div className={styles['main-links-left']}>
                            <a href="https://www.atom.com/branding-marketing-naming-contests" className={styles['sub-menu-link']}>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    Start a Naming Contest
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Launch a name and domain contest today for 1000s of unique name ideas!</p>
                                            </div>
                                        </a>
                            <div className={styles['top-collections']}>
                                            <h3>Branding Contests</h3>
                                            <a href="https://www.atom.com/logos">Logo Contests</a>
                                            <a href="https://www.atom.com/taglines">Tagline Contests</a>
                                            <a href="https://www.atom.com/brand-identity-design">Brand Identity Contests</a>
                                            <a href="https://www.atom.com/brand-naming-agency">Brand Naming Agency</a>
                                        </div>
                        </div>
                        <div className={styles['top-collections']}>
                                        <h3>Contest Details</h3>
                                        <a href="https://www.atom.com/how-it-works">How It Works</a>
                                        <a href="https://www.atom.com/pricing">Contest Pricing</a>
                                        <a href="https://www.atom.com/our-work">Our Work</a>
                                        <a href="https://www.atom.com/winners">Recent Winners</a>
                                        <a href="https://www.atom.com/branding-marketing-naming-contests">Active Contests</a>
                                        <a href="https://www.atom.com/join-as-creative">Become a Creative </a>
                                    </div>
                                    <a className={styles['get-started']} href="/managed-contests">
                                        <div className={styles.images2}>
                                            <img width="100%" height="202" loading="lazy" className={styles.image} src="	https://www.atom.com/public/images/common/agency_style.png"/>
                                        </div>
                                        <h4>
                                            Agency Style Experience
                                            <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                        </h4>
                                        <p>Work with a naming and branding expert in our better-than-an-agency managed contests.</p>
                                    </a>
                    </div>
                </li>
                <li className={styles['bigger-submenu']}><div className={styles['no-link']}>Research & Testing</div>
                    <div className={`${styles['sub-menu-large']} ${styles['research-testing']}`}>
                        <div className={styles['main-links-left']}>
                                        <a href="https://www.atom.com/research" className={styles['sub-menu-link']}>
                                            <div className={styles.images}>
                                                <img loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/audience_research.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    Audience Research
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Business decisions are easier with data. Run targeted surveys on just about anything, and get real data fast!</p>
                                            </div>
                                        </a>
                                    </div>
                        <div class={styles['top-collections']}>
                                        <a href="#" className={styles.research}>Name Testing</a>
                                        <a href="#" className={styles.research}>Design Testing</a>
                                        <a href="#" className={styles.research}>Logo Testing</a>
                                        <a href="#" className={styles.research}>Product Testing</a>
                                        <a href="#" className={styles.research}>Copy Testing</a>
                                        <a href="#" className={styles.research}>Customer Development</a>
                                    </div>
                    </div>
                </li>
                <li className={styles['bigger-submenu']}><div className={styles['no-link']}>Trademarks</div>
                    <div className={`${styles['sub-menu-large']} ${styles.trademarks}`}>
                                    <div className={styles['main-links-left']}>
                                        <a href="https://helpdesk.atom.com/squadhelp-services/trademark-filing-package" className={styles['sub-menu-link']}>
                                            <div className={styles.images}>
                                                <img loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/trademark_filling.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    Trademark Filing 
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Protect your brand with trademark services spanning search to filing.</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className={styles['top-collections']}>
                                        <a href="https://helpdesk.atom.com/en/articles/389625-trademark-research-service7" className={styles.research}>Trademark Research </a>
                                        <a href="/trademark-registration" className={styles.research}>Trademark Consultation</a>
                                        <a href="/free-trademark-search" className={styles.research}>Free Trademark Checker</a>
                                    </div>
                                </div>
                </li>
                <li className={styles['bigger-submenu']}><div className={styles['no-link']}>Resources</div>
                <div className={`${styles['sub-menu-large']} ${styles.resources}`}>

                
                    <div className={`${styles['main-links-left']} ${styles.bsg}`}>
                                        <a href="https://www.atom.com/business-name-generator" className={styles['sub-menu-link']}>
                                            <div className={styles.images}>
                                                <img loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/bsg.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    Business Name Generator
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Be inspired by our AI-powered generators! Get 1000s of name ideas in seconds.</p>
                                            </div>
                                        </a>
                                        <a href="https://www.atom.com/domain-name-generator" className={styles['name-generator']}>Domain Name Generator</a>
                                        <a href="https://www.atom.com/startup-name-generator" className={styles['name-generator']}>Startup Name Generator</a>
                                        <a href="https://www.atom.com/product-name-generator" className={styles['name-generator']}>Product Name Generator</a>
                                        <a href="https://www.atom.com/logo-maker" className={`${styles['sub-menu-link']} ${styles['ai-logo']}`}>
                                            <div className={styles.images}>
                                                <img loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/ai.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    AI Logo Maker
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Create eye-catching logos in minutes and make your brand memorable.</p>
                                            </div>
                                        </a>
                                    </div>
                    <div className={`${styles['main-links-left']} ${styles.tools}`}>
                                        <a href="https://www.atom.com/brand-alignment" className={styles['sub-menu-link']}>
                                            <div className={styles.images} style={{width:'130px'}}>
                                                <img loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/alignment_tool.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    Brand Alignment Tool
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Make the right naming choice with our AI-powered brand alignment tool.</p>
                                            </div>
                                        </a>
                                        <a href="#" className={styles['sub-menu-link']}>
                                            <div className={styles.images} style={{width:'104px'}}>
                                                <img loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/atom_radar.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    AtomRadar
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Exclusive naming and branding research from Atom.com.</p>
                                            </div>
                                        </a>
                                        <a href="#" className={styles['sub-menu-link']}>
                                            <div className={styles.images} style={{width:'120px'}}>
                                                <img  loading="lazy"  className={styles.image} src="https://www.atom.com/public/images/common/brand_book.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    Build a Brandbook
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Create a free brand bible in minutes using our AI-assisted builder.</p>
                                            </div>
                                        </a>
                                        <a href="#" className={styles['sub-menu-link']}>
                                            <div className={styles.images} style={{width:'99px'}}>
                                                <img loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/start_up.svg" alt="Curated Domain Marketplace"/>
                                            </div>
                                            <div className={styles['link-details']}>
                                                <div className={styles['m-head']}>
                                                    Startup Toolkit
                                                    <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                                </div>
                                                <p>Explore apps and services to help your startup thrive.</p>
                                            </div>
                                        </a>
                                    </div>
                    <div className={styles['top-collections']}>
                                                <h3>Atom.com</h3>
                                                <a href="#">About Us</a>
                                                <a href="#">Atom Blog</a>
                                                <a href="#">Testimonials</a>
                                                <div>
                                                <a href="#">Partner with us</a> <span>AtomConnect</span>
                                                </div>
                                                <a href="#">Affiliate</a>
                                        </div>
                    <a className={styles['get-started']} href="#">
                                        <div className={styles.images2}>
                                            <img width="100%" height="201" loading="lazy" className={styles.image} src="https://www.atom.com/public/images/common/domain_score.svg"/>
                                        </div>
                                        <h4>
                                            AI Domain Appraisal Tool
                                            <img width="7" height="12" className={styles.arrow} loading="lazy" alt="arrow" src="https://img.atom.com/public/images/payments/arrow_right_black.svg"/>
                                        </h4>
                                        <p>Discover the value of your domains, based on 50+ data points and powered by effective AI.</p>
                                    </a>
                                    </div>
                </li>
            </ul>
        </div>
    );
}

export default HeaderMiddle;
