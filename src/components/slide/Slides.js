import "./slide.scss";
import { Box, Button } from "@mui/material";
import HeaderSlide from "./header/Header";
import BodySlide from "./bodySlide/BodySlide";
import { CenterBodySlide } from "./centerBody/CenterBody";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useAuthContext } from "../../hooks/useAuthContext";
import { io } from "socket.io-client";

export default function Slides() {
  const location = useLocation();
  const presentation = location.state;
  const params = useParams();
  const { user } = useAuthContext();

  const socket = useRef();

  const { slides, setSlides, slide, setSlide, setQuestion, setOptions,
    setHeading, setParagraph, setSubHeading, present, setPresent,
    groupId, setGroupId } = useOutletContext();

  useEffect(() => {
    const getSlides = async () => {

      const res = await axiosInstance.get(`/api/presentations/${params.presentationId}/slides`);

      const slides = res.data.data;
      setSlides(slides);
      if (slides.length) {
        setSlide(slides[0]);
        switch (slides[0].type) {
          case "Multiple Choice":
            setQuestion(slides[0].question);
            setOptions(slides[0].options);
            break;
          case "Paragraph":
            setHeading(slides[0].heading);
            setParagraph(slides[0].paragraph);
            break;
          case "Heading":
            setHeading(slides[0].heading);
            setSubHeading(slides[0].subHeading);
            break;
          default:
            break;
        }
      }
    }

    getSlides();
  }, [params.presentationId, setHeading, setOptions, setParagraph, setQuestion, setSlide, setSlides, setSubHeading]);

  useEffect(() => {
    socket.current = io("ws://localhost:4100");
  }, []);

  useEffect(() => {
    socket.current.on("choiceSubmitHost", (newSlide) => {
      console.log(1, slides);
      const index = slides?.indexOf(slide);
      let newSlides = [...slides];
      newSlides[index] = newSlide;
      setSlides(newSlides);
      setSlide(newSlide);
    });

    return () => {
      socket.current.off("choiceSubmitHost");
    }
  }, [slide, setSlide, slides, setSlides]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

  const updateSlide = (nextSlide) => {
    setSlide(nextSlide);

    switch (nextSlide.type) {
      case "Multiple Choice":
        setQuestion(slide.question);
        setOptions(slide.options);
        break;
      case "Paragraph":
        setHeading(slide.heading);
        setParagraph(slide.paragraph);
        break;
      case "Heading":
        setHeading(slide.heading);
        setSubHeading(slide.subHeading);
        break;
      default:
        break;
    }
  }

  const handleLeftClick = async () => {
    const index = slides.indexOf(slide);
    if (index !== 0) {
      updateSlide(slides[index - 1]);

      socket.current.emit("changeSlideHost", {
        nextSlide: slides[index - 1]
      });

      const groupPresentationSlidesData = {
        currentSlideId: slides[index - 1]._id
      }

      await axiosInstance.patch(`/api/groupPresentationSlides/${presentation._id}/${groupId}`, groupPresentationSlidesData);
    }
  }

  const handleRightClick = async () => {
    const index = slides.indexOf(slide);
    if (index !== slides.length - 1) {
      updateSlide(slides[index + 1]);

      socket.current.emit("changeSlideHost", {
        nextSlide: slides[index + 1]
      });

      const groupPresentationSlidesData = {
        currentSlideId: slides[index + 1]._id
      }

      await axiosInstance.patch(`/api/groupPresentationSlides/${presentation._id}/${groupId}`, groupPresentationSlidesData);
    }
  }

  const handleStopPresent = async () => {
    setPresent(false);
    setGroupId(null);

    const presentationsData = {
      isPresent: false,
      isPublic: false
    }

    await axiosInstance.patch(`/api/presentations/${presentation._id}`, presentationsData);
    await axiosInstance.delete(`/api/groupPresentationSlides/${presentation._id}/${groupId}`);
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
                  onClick={handleStopPresent}
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
                />
              </Box>
              <Box className="slides__body" sx={{ mt: 3 }}>
                <BodySlide />
              </Box>
            </>
          )}
        </Box>
      )}
    </div>
  );
}
