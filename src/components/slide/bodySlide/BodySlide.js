import "./body.scss";
import { LeftBodySlide } from "../leftBody/LeftBody";
import RightBody from "../rightBody/RightBody";
import { CenterBodySlide } from "../centerBody/CenterBody";
import { useOutletContext } from "react-router-dom";

const BodySlide = () => {
  const { slide } = useOutletContext();

  return slide ? (
    <div className="bodySlideWrapper">
      <div className="leftBodyContainer">
        <LeftBodySlide />
      </div>

      <div className="centerBodyContainer">
        <CenterBodySlide slide={slide} />
      </div>

      <div className="rightBodyContainer">
        <RightBody />
      </div>
    </div>
  ) : (
    <div>Add new slide to start</div>
  );
};

export default BodySlide;
