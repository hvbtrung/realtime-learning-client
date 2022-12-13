import "./centerBody.scss";
import Chart from "../chart/Chart";

export function CenterBodySlide({ slide }) {
  return (
    <div className="centerBodyWrapper">
      <div className="goTo">Go to RealtimeLearning and use the code 19120123</div>
      <span className="centerBody">{slide.question}</span>
      <div className="resultChart">
        <Chart slide={slide} />
      </div>
    </div>
  );
}
