import "./body.scss";
import { LeftBodySlide } from "../leftBody/LeftBody";
import RightBody from "../rightBody/RightBody";
import { CenterBodySlide } from "../centerBody/CenterBody";

const BodySlide = ({ presentation, slides, setSlides, slide, setSlide }) => {
  return slide ? (
    <div className="bodySlideWrapper">
      <div className="leftBodyContainer">
        <LeftBodySlide slides={slides} setSlide={setSlide} />
      </div>
      <div className="centerBodyContainer">
        <CenterBodySlide slide={slide} />
      </div>
      <div className="rightBodyContainer">
        <RightBody
          slide={slide}
          setSlide={setSlide}
          slides={slides}
          setSlides={setSlides}
        />
      </div>
    </div>
  ) : (
    <div>Add new slide to start</div>
  );
};

export default BodySlide;
