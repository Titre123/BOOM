import React, { useState, useContext } from "react";
// import "./Sidebar.css"; // Optional styling
import AudioPlayer from "./audioplayer";
import ProfileTab from "./profile";
import { MyPlaying } from "../../pages/dashboard";

const Listeningbar = (props) => {
  const [isPlaying, setisPlaying] = useContext(MyPlaying);
  let element;
  if (isPlaying) {
    element = <AudioPlayer audioSrc={isPlaying.songFile.url}  ImgSrc={isPlaying.songThumbnail.url}/>
  }
  else {
    element = <AudioPlayer audioSrc='https://res.cloudinary.com/daudj5isi/raw/upload/v1679773625/songs/ygibf8gfszfriljccpyd.mp3' />
  }
  const user = props.user;
  console.log(user);
   return (
     <div className="listeningbar">
      { user && <ProfileTab
         profileImage = {user.picture}
         username= {user.nickname}
         email= {user.email}/>
    }
    {element}
     </div>
   )
};

export default Listeningbar;
