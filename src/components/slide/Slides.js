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

      setSlides(res.data.data);
      res.data.data.length && setSlide(res.data.data[0]);
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
                <div onClick={handleLeftClick}>
                  <ArrowCircleLeftOutlinedIcon
                    className={`icon ${slides.indexOf(slide) === 0 && "unactive"}`}
                  />
                </div>

                <CenterBodySlide slide={slide} />

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
                />
              </Box>
              <Box className="slides__body" sx={{ mt: 4 }}>
                <BodySlide
                  presentation={presentation}
                  slides={slides}
                  setSlides={setSlides}
                  slide={slide}
                  setSlide={setSlide}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </div>
  );
}
