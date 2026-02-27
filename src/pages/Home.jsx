import React from "react";
import styled from "styled-components";
import HeroVideo from "../assets/videos/bgVid.mp4";
import HeroPoster from "../assets/CoffeeImgs/HeroPoster.jpg";
import { tabletDevice } from "../Responsive";
const Container = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;
`;
const Content = styled.div`
  position: absolute;
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  z-index: 2;
  pointer-events: none;
  inset: 0;
  ${tabletDevice({
    background: "hsla(0, 0%, 0%, 0.3)",
  })};
`;
const HeaderTitle = styled.h1`
  font-size: 4rem;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  width: 100%;
  color: white;
  ${tabletDevice({
    fontSize: "3rem",
  })};
`;

const Span = styled.span`
  color: red;
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  z-index: 1;

  /* Mobile: use poster instead of video */
  ${tabletDevice({
    display: "none",
  })};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  z-index: 1;

  /* Desktop: hide image (video used instead) */
  display: none;

  ${tabletDevice({
    display: "block",
  })};
`;

const Home = () => {
  return (
    <Container>
      <Content>
        <HeaderTitle>
          Let us take your <Span>tastebuds</Span> on a journey of discovery...
        </HeaderTitle>
      </Content>

      {/* Desktop video */}
      <Video autoPlay loop muted playsInline poster={HeroPoster}>
        <source src={HeroVideo} type="video/mp4" />
      </Video>

      {/* Mobile fallback image */}
      <Img src={HeroPoster} alt="hero background" />
    </Container>
  );
};
export default Home;
