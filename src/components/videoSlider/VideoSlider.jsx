import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./videoSlider.css";

const VideoSlider = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const videoRefs = useRef(videos.map(() => React.createRef()));
  // console.log(videoRefs.current);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((currentIndex + 1) % videos.length);
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, [currentIndex, videos.length]);

  // const goLeft = () => {
  //   setCurrentIndex((currentIndex - 1 + videos.length) % videos.length);
  // };
  // const goRight = () => {
  //   setCurrentIndex((currentIndex + 1) % videos.length);
  // };
  const calculateTransform = () => {
    return `translateX(-${currentIndex * 10}%)`;
  };

  return (
    <div className="coffee__explore-slider">
      <div className="coffee__explore-slider_title">
        <h1>Let us take your tastebuds on an adventure across the world. </h1>
      </div>
      <div>
        <button>Learn More</button>
        <button>Sign-up/Login</button>
      </div>
      {/* <div className="video-container" style={{ transform: calculateTransform() }}>
        {videos.map((video, inx) => (
          <video key={inx} className={inx === currentIndex ? "video active" : "video"} loop muted>
            <source src={video} type="video/mp4"></source>
          </video>
          autoPlay={inx === currentIndex ? true : false}
        ))}
      </div> */}
      {/* <div onClick={goLeft} className="Arrow left">
        <FaChevronLeft size={50} />
      </div>
      <div onClick={goRight} className="Arrow right">
        <FaChevronRight size={50} />
      </div>  */}
      /* */
    </div>
  );
};

export default VideoSlider;

// const goLeft = () => {
//   const isfirstImage = currentIndex === 0;
//   const newIndex = isfirstImage ? images.length - 1 : currentIndex - 1;
//   setcurrentIndex(newIndex);
// };
// const goRight = () => {
//   const isLastImage = currentIndex === images.length - 1;
//   const newIndex = isLastImage ? 0 : currentIndex + 1;
//   setcurrentIndex(newIndex);
// };
// const calculateTransform = () => {
//   return `translateX(-${currentIndex * 100}%)`;
// };
