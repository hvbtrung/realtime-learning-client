import "./centerBody.scss";
import Chart from "../chart/Chart";

export function CenterBodySlide({ slide }) {
  return (
    <div className="centerBodyWrapper">
      <div className="goTo">Go to RealtimeLearning and use the code 19120123</div>
      {slide.type === "Multiple Choice" ? (
        <>
          <span className="centerBody">{slide.question}</span>
          <div className="resultChart">
            <Chart slide={slide} />
          </div>
        </>
      ) : slide.type === "Paragraph" ? (
        <div className="centerBodyItem">
          <div className="centerBodyHeading">{slide.heading}</div>
          <div className="centerBodyParagraph">{slide.paragraph}</div>
        </div>
      ) : (
        <div className="centerBodyItem">
          <div className="centerBodyHeading">{slide.heading}</div>
          <div className="centerBodySubHeading">{slide.subHeading}</div>
        </div>
      )}

    </div>
  );
}
