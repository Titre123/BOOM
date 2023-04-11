import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Username = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
  margin-right: 10px;

  &:hover {
    background-color: #333;
  }
`;

const ProfilePage = () => {
  return (
    <ProfileContainer>
      <ProfileImage src="https://via.placeholder.com/200" alt="Profile" />
      <Username>John Doe</Username>
      <Bio>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus
        non ipsum hendrerit convallis a non magna. Vivamus semper nisi eget
        tortor blandit tempor.
      </Bio>
      <SocialLinks>
        <SocialLink href="#">
          <i className="fa fa-facebook"></i>
        </SocialLink>
        <SocialLink href="#">
          <i className="fa fa-twitter"></i>
        </SocialLink>
        <SocialLink href="#">
          <i className="fa fa-instagram"></i>
        </SocialLink>
        <SocialLink href="#">
          <i className="fa fa-linkedin"></i>
        </SocialLink>
      </SocialLinks>
    </ProfileContainer>
  );
};

export default ProfilePage;
