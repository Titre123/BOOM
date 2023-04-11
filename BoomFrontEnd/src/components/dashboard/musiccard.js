import React from 'react';
import '../../styles/dashboard/musiccard.css';


const MusicCard = ({ coverImage, musicName, genre }) => {
  return (
    <div className='music-card'>
        <img src={coverImage} alt={musicName} className='coverImage'/>
        <p>Love</p>
        <p>Pop</p>
    </div>
  );
};

export default MusicCard;
