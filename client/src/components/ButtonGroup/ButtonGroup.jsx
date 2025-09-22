import React,{useState} from 'react';
import styles from './ButtonGroup.module.scss'

const ButtonGroup = () => {
    const [selected,setSelected] = useState('yes')
    
    return (
        <div className={styles['field']}>
            <h5 className={styles.caption}>Do you want a matching domain (.com URL) with your name?</h5>
            <div className={styles['row']}>
                <div className={styles.wrapper} onClick={()=> setSelected('yes')}>
                    <input type='radio' value={'yes'} checked={selected === 'yes'}/>
                    <div className={`${styles.box} ${selected === 'yes' && styles.active}`}>
                        <h2>Yes</h2>
                        <p>But minor variations are allowed</p>
                        <div className={styles.recomended}>Рeкомендуется</div>
                        { selected === 'yes' && <img src="https://www.atom.com/html/html/static_images/contests/icon-check.svg" alt="" />}
                    </div>
                </div>
                <div className={styles.wrapper} onClick={()=> setSelected('yesBut')}>
                    <input type='radio' value={'yesBut'} checked={selected === 'yesBut'}/>
                    <div className={`${styles.box} ${selected === 'yesBut' && styles.active}`}>
                        <h2>Yes</h2>
                        <p>The Domain should exactly match the name</p>
                        {selected === 'yesBut' && <img src="https://www.atom.com/html/html/static_images/contests/icon-check.svg" alt="" />}
                    </div>
                </div>
                <div className={styles.wrapper} onClick={()=> setSelected('no')}>
                    <input type='radio' value={'no'} checked={selected === 'no'}/>
                    <div className={`${styles.box} ${selected === 'no' && styles.active}`}>
                        <h2>No</h2>
                        <p>I am only looking for a name, not a Domain</p>
                        {selected === 'no' && <img src="https://www.atom.com/html/html/static_images/contests/icon-check.svg" alt="" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ButtonGroup;
