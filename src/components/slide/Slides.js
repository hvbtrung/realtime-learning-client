import "./slide.scss";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Box, Button, Tooltip, IconButton } from "@mui/material";
import HeaderSlide from "./header/Header";
import BodySlide from "./bodySlide/BodySlide";
import { CenterBodySlide } from "./centerBody/CenterBody";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import HelpIcon from "@mui/icons-material/Help";
import ChatScreen from "../chat/ChatScreen";
import QuestionScreen from "../question/QuestionScreen";

import CustomizedSnackbars from "../notification/snackbars";
export default function Slides() {
  const params = useParams();
  const location = useLocation();
  const [slides, setSlides] = useState(null);
  const [slide, setSlide] = useState(null);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState(null);
  const [present, setPresent] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [typeNotification, setTypeNotification] = useState(null);
  const [messageNotification, setMessageNotification] = useState("");
  const [isAppearNotification, setIsAppearNotification] = useState(false);
  const presentation = location.state;

  useEffect(() => {
    const getSlides = async () => {
      // const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
      // const res = await axios.get(
      //   `${SERVER_DOMAIN}/api/presentations/${params.presentationId}/slides`, {
      //   withCredentials: true,
      //   validateStatus: () => true,
      // });

      const res = await axiosInstance.get(
        `/api/presentations/${params.presentationId}/slides`
      );

      const slides = res.data.data;
      setSlides(slides);
      if (slides.length) {
        setSlide(slides[0]);
        setQuestion(slides[0].question);
        setOptions(slides[0].options);
      }
    };

    getSlides();
  }, [params.presentationId]);

  const handleLeftClick = () => {
    const index = slides.indexOf(slide);
    if (index !== 0) {
      setSlide(slides[slides.indexOf(slide) - 1]);
      setQuestion(slides[slides.indexOf(slide) - 1].question);
      setOptions(slides[slides.indexOf(slide) - 1].options);
    }
  };

  const handleRightClick = () => {
    const index = slides.indexOf(slide);
    if (index !== slides.length - 1) {
      setSlide(slides[slides.indexOf(slide) + 1]);
      setQuestion(slides[slides.indexOf(slide) + 1].question);
      setOptions(slides[slides.indexOf(slide) + 1].options);
    }
  };

  const closeQuestionDialog = () => {
    setIsOpenQuestion(false);
  };

  const openQuestionDialog = () => {
    setIsOpenQuestion(true);
  };

  const closeChatDialog = () => {
    setIsOpenChat(false);
  };

  const openChatDialog = () => {
    setIsOpenChat(true);
  };

  return (
    <div className="slideContainer">
      {slides && (
        <Box className="slides">
          {present ? (
            <>
              <div className="presentSlideContainer">
                <div className="presentSlideWrapper">
                  <div onClick={handleLeftClick}>
                    <ArrowCircleLeftOutlinedIcon
                      className={`icon ${
                        slides.indexOf(slide) === 0 && "unactive"
                      }`}
                    />
                  </div>

                  <div className="presentSlideContent">
                    <CenterBodySlide slide={slide} />
                  </div>

                  <div onClick={handleRightClick}>
                    <ArrowCircleRightOutlinedIcon
                      className={`icon ${
                        slides.indexOf(slide) === slides.length - 1 &&
                        "unactive"
                      }`}
                    />
                  </div>
                </div>
                <div className="slideInteraction">
                  <div className="slideInteraction__item">
                    <Tooltip
                      onClick={() => {
                        openQuestionDialog();
                      }}
                      className="slideInteraction__item--containIcon"
                    >
                      <IconButton>
                        <HelpIcon className="slideInteraction__item--icon" />
                      </IconButton>
                    </Tooltip>

                    <QuestionScreen
                      isOpenQuestion={isOpenQuestion}
                      closeQuestionDialog={closeQuestionDialog}
                    />
                  </div>
                  <div className="slideInteraction__item">
                    <Tooltip
                      onClick={() => {
                        setIsOpenChat(true);
                      }}
                      className="slideInteraction__item--containIcon"
                    >
                      <IconButton>
                        <TextsmsIcon className="slideInteraction__item--icon" />
                      </IconButton>
                    </Tooltip>

                    <ChatScreen
                      isOpenChat={isOpenChat}
                      openChatDialog={openChatDialog}
                      closeChatDialog={closeChatDialog}
                      setTypeNotification={setTypeNotification}
                      setMessageNotification={setMessageNotification}
                      setIsAppearNotification={setIsAppearNotification}
                      isAppearNotification={isAppearNotification}
                    />
                  </div>
                  {typeNotification && (
                    <CustomizedSnackbars
                      key={"chatNotify"}
                      type={typeNotification}
                      status={isAppearNotification}
                      message={messageNotification}
                    />
                  )}
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
