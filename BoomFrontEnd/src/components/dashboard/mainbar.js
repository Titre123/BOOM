import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import Searchbar from './searchbar';
import '../../styles/dashboard/mainbar.css';
import ToggleButton from "./toggle";
import MusicCard from "./musiccard";

const Mainbar = () => {

    return (
        <div className="mainbar">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className='container'>
                <Searchbar />
                <ToggleButton />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', gap: '0.5em'}} className='container'>
                <MusicCard coverImage='https://cdn.dribbble.com/users/2321513/screenshots/17297650/media/332b82dab14e90f164c82820728e61b6.png' musicName='Love' genre='Pop'/>
                <MusicCard coverImage='https://cdn.dribbble.com/users/2321513/screenshots/17297650/media/332b82dab14e90f164c82820728e61b6.png' musicName='Love' genre='Pop'/>
                <MusicCard coverImage='https://cdn.dribbble.com/users/2321513/screenshots/17297650/media/332b82dab14e90f164c82820728e61b6.png' musicName='Love' genre='Pop'/>
                <MusicCard coverImage='https://cdn.dribbble.com/users/2321513/screenshots/17297650/media/332b82dab14e90f164c82820728e61b6.png' musicName='Love' genre='Pop'/>
                <MusicCard coverImage='https://cdn.dribbble.com/users/2321513/screenshots/17297650/media/332b82dab14e90f164c82820728e61b6.png' musicName='Love' genre='Pop'/>
            </div>
        </div>
    )
};

export default Mainbar