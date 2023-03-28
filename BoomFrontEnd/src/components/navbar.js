import {React} from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Input } from 'reactstrap';
import { LoginButton } from './buttons/login-button';
import { LogoutButton } from './buttons/logout-button';
import { SignupButton } from './buttons/signup-button';
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/components/navbar.css';

const MyNavbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar light expand="md" className='container' style={{fontFamily: 'Karla'}}>
      <NavbarBrand href="/">My Music App</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Input type="text" name="search" placeholder="Search" />
        </NavItem>
      </Nav>
      <Nav className='nav-end'>
        <NavItem><a href='#'>Features</a></NavItem>
        <NavItem><a href='#'>About</a></NavItem>
        <NavItem>
          <SignupButton />
        </NavItem>
        <NavItem>
          <LoginButton />
        </NavItem>
        <NavItem>
          <LogoutButton />
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default MyNavbar;
