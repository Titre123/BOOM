import React, { useState, useContext } from "react";
import { Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";
import '../../styles/dashboard/sidebar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompactDisc, faUser, faSearch, faClock, faHeart, faCompass } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../pages/dashboard";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useContext(MyContext);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div style={{paddingLeft: '1em'}}>
      <Nav vertical style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>
      <NavbarBrand href='/'>Boom</NavbarBrand>
      <div className="sidebar-items">
        <p>Menu</p>
        <NavItem>
          <NavLink
            className={activeTab === 'Home' ? `flex active` : "flex"}
            onClick={() => toggle('Home')}
          ><FontAwesomeIcon icon={faHome} className='link-icon'/>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'Albums' ? `flex active` : "flex"}
            onClick={() => toggle('Albums')}
          ><FontAwesomeIcon icon={faCompactDisc} />
            Albums
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'Artistes' ? `flex active` : "flex"}
            onClick={() => toggle('Artistes')}
          ><FontAwesomeIcon icon={faUser} />
            Add Song
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'Discover' ? `flex active` : "flex"}
            onClick={() => toggle('Discover')}
          ><FontAwesomeIcon icon={faCompass} />
            Discover
          </NavLink>
        </NavItem>
        <p>Playlist</p>
        <NavItem>
          <NavLink
            className={activeTab === 'Recent' ? `flex active` : "flex"}
            onClick={() => toggle('Recent')}
          ><FontAwesomeIcon icon={faClock} />
            Recent
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'Favorite' ?`flex active` : "flex"}
            onClick={() => toggle('Favorite')}
          ><FontAwesomeIcon icon={faHeart} />
            Favorite
          </NavLink>
        </NavItem>
      </div>
      <div className="update"></div>
      </Nav>
    </div>
  );
};

export default Sidebar;
