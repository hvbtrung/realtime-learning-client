import "./body.scss";
import { LeftBodySlide } from "../leftBody/LeftBody";
import RightBody from "../rightBody/RightBody";
import { CenterBodySlide } from "../centerBody/CenterBody";
import { useState } from "react";

const BodySlide = ({ presentation, slides, setSlides }) => {
  const [slide, setSlide] = useState(slides[0]);

  return (
    <div className="bodySlideWrapper">
      <div className="leftBodyContainer">
        <LeftBodySlide slides={slides} setSlide={setSlide} />
      </div>
      <div className="centerBodyContainer">
        <CenterBodySlide slide={slide} />
      </div>
      <div className="rightBodyContainer">
        <RightBody slide={slide} setSlide={setSlide} slides={slides} setSlides={setSlides} />
      </div>
    </div>
  );
}

export default BodySlide;
