import {React} from 'react';
import MyNavbar from '../components/navbar';
import Footer from '../components/footer';
import HeroSection from '../components/herosection';
import SponsorSection from '../components/sponsor';
import Carousel from '../components/usertestimonySlider';
import UserInfoSection from '../components/stream';
import '../styles/components/homepage.css';

const HomePage = () => {

    return (
        <>
            <header style={{boxShadow: '5px 3px 15px -7px #000000'}}>
                <MyNavbar />
            </header>
            <HeroSection />
            <SponsorSection />

            <UserInfoSection />
            <Carousel />
            <Footer />
        </>
    )
}

export default HomePage;