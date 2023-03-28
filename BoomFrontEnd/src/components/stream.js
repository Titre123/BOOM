import React from 'react';
import userInfo from '../Assets/UserInfo.png';
import '../styles/components/stream.css';

const UserInfoSection = () => {
  return (
    <div className="hero-section container">
        <div className="features-section">
        <div className="features-header">
          <h2>What Our Application Offers</h2>
        </div>
        <div className="features-content">
          <div className="feature">
            <h3>Easy Navigation</h3>
            <p>Our application provides a simple and user-friendly interface, making it easy to navigate and use.</p>
          </div>
          <div className="feature">
            <h3>Personalized Recommendations</h3>
            <p>Our application uses advanced algorithms to analyze user preferences and provide personalized recommendations for music, movies, and more.</p>
          </div>
          <div className="feature">
            <h3>Multiple Platforms</h3>
            <p>Our application is available on multiple platforms, including desktop, mobile, and tablet devices, so users can access their favorite content anytime, anywhere.</p>
          </div>
        </div>
      </div>
       <div className="hero-image">
        <div className='hero-back'>
          <svg xmlns="http://www.w3.org/2000/svg" width="680.492" height="653.384" viewBox="169.65 172.4 680.492 653.384"><defs><linearGradient id="c"><stop offset="0%" stop-color="#43CBFF"/><stop offset="100%" stop-color="#9708CC"/></linearGradient><clipPath id="b"><path fill="currentColor" d="M776.5 696q-149.5 196-345 96T180 459.5q-56-232.5 191-278T772 318q154 182 4.5 378Z"/></clipPath><filter id="a" x="-50vw" y="-50vh" width="100vw" height="100vh"><feFlood flood-color="#fff" result="neutral-gray"/><feTurbulence type="fractalNoise" baseFrequency="2.5" numOctaves="100" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="destaturatedNoise"/><feComponentTransfer in="desaturatedNoise" result="theNoise"><feFuncA type="table" tableValues="0 0 0.1 0"/></feComponentTransfer><feBlend in="SourceGraphic" in2="theNoise" mode="soft-light" result="noisy-image"/></filter></defs><g filter="url(#a)" clip-path="url(#b)"><path fill="url(#c)" d="M776.5 696q-149.5 196-345 96T180 459.5q-56-232.5 191-278T772 318q154 182 4.5 378Z"/></g></svg>
          <img src={userInfo} alt='' style={{position: 'absolute', boxShadow: 'none', top: '50%'}}/>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;