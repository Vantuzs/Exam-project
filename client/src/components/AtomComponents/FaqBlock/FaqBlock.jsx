import React, {useState} from 'react';
import styles from './FaqBlock.module.scss'
import SHUStyles from '../SquadHelpUse/SquadHelpUse.module.scss'
import {Content,buyingFromMarketplaceContent,managedContestsContent,creativesContent} from './content'

const FaqBlock = () => {
    const [toggleStyleIsOpen,setToggleStyleIsOpen] = useState('')
    const [styleIsOpenArray,setStyleIsOpenArray] = useState([])

    function changeStyle(key,index){
        setStyleIsOpenArray((prevOpen)=> prevOpen.includes(key)? prevOpen.filter((i)=> i!==key):[...prevOpen,key])
    }

    return (
        <section className={styles['faqs-how-it-works']}>
            <section className={SHUStyles['home-block']}>
                <div className={SHUStyles.container}>

                <div class={SHUStyles['hb-caption']}>
                    <h3>Frequently Asked Questions</h3>
                </div>
                <div className={styles['faqs-tabs']}>
                        <a href={`#${styles['collect-top']}`}><span className={styles.active}>Launching A Contest</span></a>
                        <a href={`#${styles['collect-industry']}`}><span className={styles.marketplace}>Buying From Marketplace</span></a>
                        <a href={`#${styles['collect-ideas']}`}><span className={styles.manage}>Managed Contests</span></a>
                        <a href={`#${styles['for-ideas']}`}><span className={styles.creative}>For Creatives</span></a>
                    </div>
                    <div className={styles['collect-content1']} id={styles['collect-top']}>
                        <h4 className={styles['faq-heading']}>Launching A Contest</h4>
                        <section className={styles['faq-block']}>
                            <div className={SHUStyles.container}>
                                <div className={styles['faq-inner']}>
                                    {Content.map((item,index)=>{
                                        const key = `contest-${index}`
                                        return(
                                        <div key={key} className={`${styles['faq-item']} ${styles[`${styleIsOpenArray.includes(key)?'open-item':''}`]}`} onClick={()=>changeStyle(key,index)}>
                                            <div className={styles['faq-caption']} id={styles.test}>
                                                {item.question}
                                                <div className={`${styles['toggle-icon']} ${styles[`${styleIsOpenArray.includes(key)?'open':''}`]}`}></div>
                                            </div>
                                            <div className={`${styles['faq-content']} ${styles[`${styleIsOpenArray.includes(key)?'open-content':''}`]}`}>
                                                <p>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
)})}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className={styles['collect-content1']} id={styles['collect-industry']}>
                        <h4 className={styles['faq-heading']} >Buying From Marketplace</h4>
                        <section className={styles['faq-block']}>
                            <div className={SHUStyles.container}>
                                <div className={styles['faq-inner']}>
                                    {buyingFromMarketplaceContent.map((item,index)=>{
                                        const key = `marketplace-${index}`
                                        return (
                                        <div key={key} className={`${styles['faq-item']} ${styles[`${styleIsOpenArray.includes(key)?'open-item':''}`]}`} onClick={()=>changeStyle(key,index)}>
                                            <div className={styles['faq-caption']}>
                                                {item.question}
                                                <div className={`${styles['toggle-icon']} ${styles[`${styleIsOpenArray.includes(key)?'open':''}`]}`}></div>
                                            </div>
                                            <div className={`${styles['faq-content']} ${styles[`${styleIsOpenArray.includes(key)?'open-content':''}`]}`}>
                                                <p>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className={styles['collect-content1']} id={styles['collect-ideas']}>
                        <h4 className={styles['faq-heading']}>Managed Contests</h4>
                        <section className={styles['faq-block']}>
                            <div className={SHUStyles.container}>
                                <div className={styles['faq-inner']}>
                                    {managedContestsContent.map((item,index)=>{
                                        const key = `managet-${index}`
                                        return (
                                        <div key={key} className={`${styles['faq-item']} ${styles[`${styleIsOpenArray.includes(key)?'open-item':''}`]}`} onClick={()=>changeStyle(key,index)}>
                                            <div className={styles['faq-caption']}>
                                                {item.question}
                                                <div className={`${styles['toggle-icon']} ${styles[`${styleIsOpenArray.includes(key)?'open':''}`]}`}></div>
                                            </div>
                                            <div className={`${styles['faq-content']} ${styles[`${styleIsOpenArray.includes(key)?'open-content':''}`]}`}>
                                                <p>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className={styles['collect-content1']} id={styles['for-ideas']}>
                        <h4 className={styles['faq-heading']}>For Creatives</h4>
                        <section className={styles['faq-block']}>
                            <div className={SHUStyles.container}>
                                <div className={styles['faq-inner']}>
                                    {creativesContent.map((item,index)=>{
                                        const key = `creatives-${index}`
                                        return (
                                        <div key={key} className={`${styles['faq-item']} ${styles[`${styleIsOpenArray.includes(key)?'open-item':''}`]}`} onClick={()=>changeStyle(key,index)}>
                                            <div className={styles['faq-caption']}>
                                                {item.question}
                                                <div className={`${styles['toggle-icon']} ${styles[`${styleIsOpenArray.includes(key)?'open':''}`]}`}></div>
                                            </div>
                                            <div className={`${styles['faq-content']} ${styles[`${styleIsOpenArray.includes(key)?'open-content':''}`]}`}>
                                                <p>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default FaqBlock;
