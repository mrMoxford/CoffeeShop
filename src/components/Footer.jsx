import React from "react";
import styled from "styled-components";
import NewsLetter from "./NewsLetter";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";
import { tabletDevice, smallDevice } from "../Responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  color: white;
  background: hsla(104, 28%, 15%, 1);
  ${smallDevice({ padding: "1rem" })};
  ${tabletDevice({ flexDirection: "column" })};
`;
const Left = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
`;
const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 200;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
`;
const SocialLink = styled.a`
  text-decoration: none;
  color: white;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo to="/">ODESSY_JAVA</Logo>
        <SocialMedia>
          <SocialLink href="http://www.facebook.com">
            <AiFillFacebook size={"2rem"} />
          </SocialLink>
          <SocialLink href="htttp://www.instagram.com">
            <AiFillInstagram size={"2rem"} />
          </SocialLink>
          <SocialLink href="htttp://www.twitter.com">
            <AiOutlineTwitter size={"2rem"} />
          </SocialLink>
          <SocialLink href="htttp://www.youtube.com">
            <AiFillYoutube size={"2rem"} />
          </SocialLink>
        </SocialMedia>
      </Left>
      <NewsLetter />
    </Container>
  );
};

export default Footer;
