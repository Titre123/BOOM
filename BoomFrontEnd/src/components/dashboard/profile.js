import React, { useState } from "react";
import styled from "styled-components";
import { LogoutButton } from "../buttons/logout-button";

const Tab = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 0.875rem;
  border: 1px solid #7f8aa0;
  padding: 1em;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Email = styled.div`
  font-size: 14px;
  color: #666;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 1;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const SignOutButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 14px;
  color: #f00;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileTab = ({ profileImage, username, email }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Tab onClick={handleDropdownToggle}>
      <ProfileImage src={profileImage} alt="Profile" />
      <div>
        <Username>{username}</Username>
        <Email>{email}</Email>
      </div>
      {isDropdownOpen && (
        <Dropdown>
          <ProfileSection>
            <ProfileImage src={profileImage} alt="Profile" />
            <Username>{username}</Username>
            <LogoutButton />
          </ProfileSection>
        </Dropdown>
      )}
    </Tab>
  );
};

export default ProfileTab;
