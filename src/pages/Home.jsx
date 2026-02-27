import React from "react";
import styled from "styled-components";
import HeroVideo from "../assets/videos/bgVid.mp4";
import HeroPoster from "../assets/CoffeeImgs/HeroPoster.jpg";
import { tabletDevice } from "../Responsive";

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
