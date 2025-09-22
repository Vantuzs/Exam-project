import React from 'react';
import Header from '../../components/AtomComponents/Header/Header';
import HeroBaner from '../../components/AtomComponents/Hero Baner/HeroBaner';
import SquadHelpUse from '../../components/AtomComponents/SquadHelpUse/SquadHelpUse';
import styles from './AtomPage.module.scss'
import HowItWorks from '../../components/AtomComponents/SquadHelpUse/HowItWorks';
import FaqBlock from '../../components/AtomComponents/FaqBlock/FaqBlock';
import SearchBlock from '../../components/AtomComponents/SearchBlock/SearchBlock';
import Footer from '../../components/AtomComponents/Footer/Footer';
import BottomBlock from '../../components/AtomComponents/BottomBlock/BottomBlock';

const AtomPage = () => {
    return (
        <>
        <Header/>
        <HeroBaner/>
        <SquadHelpUse/>
        <HowItWorks/>
        <FaqBlock/>
        <SearchBlock/>
        <Footer/>
        <BottomBlock/>
        </>
    );
}

export default AtomPage;
