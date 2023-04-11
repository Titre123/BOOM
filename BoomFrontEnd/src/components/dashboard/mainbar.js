import React, { useState, useContext } from "react";
import { HomeTab } from "./HomeTab";
import SongForm from "../../pages/postSong";
import { MyContext } from "../../pages/dashboard";
import '../../styles/dashboard/mainbar.css';


const Mainbar = (props) => {
    const [activeTab, setActiveTab] = useContext(MyContext);
    let element;
    if (activeTab === 'Home') {
        element = (
            <HomeTab musicArray={props.songs} />
        )
    }
    else if( activeTab === 'Artistes') {
        element = (
            <SongForm />
        )
    }
    return (
        <div className="mainbar">
            {element}
        </div>
    )
};

export default Mainbar