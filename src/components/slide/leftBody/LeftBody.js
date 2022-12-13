import "./leftBody.scss";
import ItemLeftBody from "../itemLeftBody/ItemLeftBody";

export function LeftBodySlide({ slides, setSlide }) {
  return (
    <div className="leftBodyContainer">
      {slides.map((slide, index) => (
        <div onClick={() => setSlide(slide)} style={{ cursor: "pointer" }}>
          <ItemLeftBody
            key={index}
            slide={slide}
          />
        </div>
      ))}
    </div>
  );
}
