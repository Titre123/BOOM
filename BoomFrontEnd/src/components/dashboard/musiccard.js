import React from 'react';
import {CardMedia } from '@material-ui/core';

const MusicCard = ({ coverImage, musicName, genre }) => {
  return (
    <div className=''>
        <CardMedia
        component="img"
        image={coverImage}
        alt={musicName} className='coverImage'/>
        <p>Love</p>
        <p>Pop</p>
    </div>
  );
};

export default MusicCard;
