import styled, { keyframes } from "styled-components";
import { sliderContent } from "../assets/data";
import { useState, useEffect } from "react";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;

  transition: all 300ms ease-out;
  transform: translateX(${props => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInOut 5000ms ease-out;
`;

const VideoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video`
  width: 100vw;
  height: 100%;
  object-fit: cover;
`;

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % sliderContent.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, sliderContent.length]);
  return (
    <Container>
      <Wrapper slideIndex={currentIndex}>
        {sliderContent.map((video, indx) => (
          <Slide key={video.id}>
            <VideoContainer>
              <Video onMouseOver={e => e.target.play()} muted>
                <source src={video.video} type="video/mp4" />
              </Video>
            </VideoContainer>
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
