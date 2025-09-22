import React from 'react';
import styles from './SearchBlock.module.scss'
import SHUStyles from '../SquadHelpUse/SquadHelpUse.module.scss'

const SearchBlock = () => {
    return (
        <section className={styles['search-block']}>
            <div className={SHUStyles['container']}>
                <div className={styles['search-form']}>
                    <input type='text' placeholder="Search Over 300,000+ Premium Names"/>
                    <img src="https://www.atom.com/public/images/search.svg" className={styles.icon} alt="" />
                    <button>
                        <img src="https://www.atom.com/public/images/bsg/search.svg" alt="" />
                    </button>
                 </div>

                 <div className={styles['list-tags']}>
                    <a href="https://www.atom.com/premium-domains-for-sale/for/technology">Tech</a>
                    <a href="https://www.atom.com/premium-domains-for-sale/for/fashion-clothing">Clothing</a>
                    <a href="https://www.atom.com/premium-domains-for-sale/for/finance">Finance</a>
                    <a href="https://www.atom.com/premium-domains-for-sale/for/real-estate">Real Estate</a>
                    <a href="https://www.atom.com/premium-domains-for-sale/for/cryptocurrency-blockchain">Crypto</a>
                    <a href="https://www.atom.com/premium-domains-for-sale/length/Short">Short</a>
                    <a href="https://www.atom.com/premium-domains-for-sale/type_of_name/One%20Word">One Word</a>
                </div>
                <div className={styles['border-st']}></div>
            </div>
        </section>
    );
}

export default SearchBlock;
