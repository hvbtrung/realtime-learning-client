import "./slide.scss";
import { Box, Button } from "@mui/material";
import HeaderSlide from "./header/Header";
import BodySlide from "./bodySlide/BodySlide";
import { CenterBodySlide } from "./centerBody/CenterBody";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function Slides() {
  const params = useParams();
  const location = useLocation();
  const [slides, setSlides] = useState(null);
  const [slide, setSlide] = useState(null);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState(null);
  const [present, setPresent] = useState(false);

  const presentation = location.state;

  useEffect(() => {
    const getSlides = async () => {
      const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
      const res = await axios.get(
        `${SERVER_DOMAIN}/api/presentations/${params.presentationId}/slides`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      const slides = res.data.data;
      setSlides(slides);
      if (slides.length) {
        setSlide(slides[0]);
        setQuestion(slides[0].question);
        setOptions(slides[0].options);
      }
    }

    getSlides();
  }, [params.presentationId]);

  const handleLeftClick = () => {
    const index = slides.indexOf(slide);
    if (index !== 0) {
      setSlide(slides[slides.indexOf(slide) - 1]);
    }
  }

  const handleRightClick = () => {
    const index = slides.indexOf(slide);
    if (index !== slides.length - 1) {
      setSlide(slides[slides.indexOf(slide) + 1]);
    }
  }

  return (
    <div
      className="slideContainer"
    >
      {slides && (
        <Box className="slides">
          {present ? (
            <>
              <div className="presentSlideContainer">
                <div className="presentSlideWrapper">
                  <div onClick={handleLeftClick}>
                    <ArrowCircleLeftOutlinedIcon
                      className={`icon ${slides.indexOf(slide) === 0 && "unactive"}`}
                    />
                  </div>

                  <div className="presentSlideContent">
                    <CenterBodySlide slide={slide} />
                  </div>

                  <div onClick={handleRightClick}>
                    <ArrowCircleRightOutlinedIcon
                      className={`icon ${slides.indexOf(slide) === slides.length - 1 && "unactive"}`}
                    />
                  </div>
                </div>
                <Button
                  variant="outlined"
                  color="error"
                  className="stopBtn"
                  onClick={() => setPresent(false)}
                >
                  Stop Present
                </Button>
              </div>
            </>
          ) : (
            <>
              <Box className="slides__header">
                <HeaderSlide
                  presentation={presentation}
                  slides={slides}
                  setSlides={setSlides}
                  setSlide={setSlide}
                  setPresent={setPresent}
                  setQuestion={setQuestion}
                  setOptions={setOptions}
                />
              </Box>
              <Box className="slides__body" sx={{ mt: 3 }}>
                <BodySlide
                  slides={slides}
                  setSlides={setSlides}
                  slide={slide}
                  setSlide={setSlide}
                  question={question}
                  setQuestion={setQuestion}
                  options={options}
                  setOptions={setOptions}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </div>
  );
}
