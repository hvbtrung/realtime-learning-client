import "./body.scss";
import { LeftBodySlide } from "../leftBody/LeftBody";
import RightBody from "../rightBody/RightBody";
import { CenterBodySlide } from "../centerBody/CenterBody";

const BodySlide = ({ slides, setSlides, slide, setSlide, question, setQuestion, options, setOptions }) => {

  return slide ? (
    <div className="bodySlideWrapper">
      <div className="leftBodyContainer">
        <LeftBodySlide
          selectedSlide={slide}
          setSlide={setSlide}
          slides={slides}
          setSlides={setSlides}
          setQuestion={setQuestion}
          setOptions={setOptions}
        />
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
          question={question}
          setQuestion={setQuestion}
          options={options}
          setOptions={setOptions}
        />
      </div>
    </div>
  ) : (
    <div>Add new slide to start</div>
  );
};

export default BodySlide;
