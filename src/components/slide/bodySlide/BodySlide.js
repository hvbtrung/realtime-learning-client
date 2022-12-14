import "./body.scss";
import { LeftBodySlide } from "../leftBody/LeftBody";
import RightBody from "../rightBody/RightBody";
import { CenterBodySlide } from "../centerBody/CenterBody";
import { useEffect, useState } from "react";

const BodySlide = ({ presentation, slides, setSlides }) => {
  const [slide, setSlide] = useState(slides[0]);

  useEffect(() => {
    if (slides.length === 1) {
      setSlide(slides[0]);
    }
  }, [slides]);

  return (
    slide ? (
      <div className="bodySlideWrapper" >
        <div className="leftBodyContainer">
          <LeftBodySlide slides={slides} setSlide={setSlide} />
        </div>
        <div className="centerBodyContainer">
          <CenterBodySlide slide={slide} />
        </div>
        <div className="rightBodyContainer">
          <RightBody slide={slide} setSlide={setSlide} slides={slides} setSlides={setSlides} />
        </div>
      </div >
    ) : (
      <div>Add new slide to start</div>
    )
  );
}

export default BodySlide;
