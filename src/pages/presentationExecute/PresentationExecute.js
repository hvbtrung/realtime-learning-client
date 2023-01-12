import "./presentationExecute.scss";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import "../../components/slide/slide.scss";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";
import { io } from "socket.io-client";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Button, Tooltip, IconButton } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ChatScreen from "../../components/chat/ChatScreen";
import QuestionScreen from "../../components/question/QuestionScreen";
import CustomizedSnackbars from "../../components/notification/snackbars";

const PresentationExecute = () => {
  const { user } = useAuthContext();
  const params = useParams();
  const [presentation, setPresentation] = useState(null);
  const [slide, setSlide] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const socket = useRef();

  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [typeNotification, setTypeNotification] = useState(null);
  const [messageNotification, setMessageNotification] = useState("");
  const [isAppearNotification, setIsAppearNotification] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);

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

  useEffect(() => {
    const getPresentation = async () => {
      const res = await axiosInstance.get(`/api/presentations/${params.presentationId}`);
      setPresentation(res.data.data);

      if (res.data.data.isPresent) {
        const resSlide = await axiosInstance.get(`/api/groupPresentationSlides/${params.presentationId}/000000000000000000000000`);
        setSlide(resSlide.data.data.currentSlideId);
      }
    }

    getPresentation();
  }, [params.presentationId]);

  useEffect(() => {
    socket.current = io("ws://localhost:4100");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

  useEffect(() => {
    socket.current.on("changeSlideViewer", (nextSlide) => {
      setSlide(nextSlide);
      setIsSubmitted(false);
    })

    return () => {
      socket.current.off("changeSlideViewer");
    }
  }, []);

  const handleSubmit = async () => {
    const newSlide = structuredClone(slide);
    newSlide.options[selectedOption].counter += 1;

    socket.current.emit("choiceSubmitViewer", newSlide);

    const data = {
      options: newSlide.options
    }

    const res = await axiosInstance.patch(`/api/slides/${slide._id}`, data);

    const slideResultData = {
      presentationId: presentation._id,
      slideId: slide._id,
      user: user.email,
      choice: slide.options[selectedOption].name,
    }

    const resSlideResult = await axiosInstance.post(`/api/slideResults`, slideResultData);

    setSelectedOption(null);
    setIsSubmitted(true);
    // const index = slides.indexOf(slide);
    // let newSlides = [...slides];
    // newSlides[index] = res.data.data;
    // setSlides(newSlides);
    // index < slides.length ? setSlide(slides[index + 1]) : setSlide(null);
  }

  return (
    presentation?.isPresent ? (
      <div className="preExecuteContainer">
        <div className="preExecuteWrapper">
          <div className="title">
            <LocalLibraryIcon className="icon" fontSize="large" />
            <span>Realtime Learning</span>
          </div>
          {slide ? (
            slide.type === "Multiple Choice" ? (
              !isSubmitted ? (
                <>
                  <div className="question">{slide.question}</div>
                  <div>
                    <ul className="options">
                      {slide.options.map((option, index) => (
                        <li
                          key={index}
                          className={`option ${selectedOption === index && "active"
                            }`}
                          onClick={() => setSelectedOption(index)}
                        >
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="contained"
                    className={`submitBtn ${selectedOption === null && "disable"}`}
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <div className="endPre">Please wait for the presenter to show the next slide.</div>
              )
            ) : slide.type === "Paragraph" ? (
              <>
                <div className="heading">{slide.heading}</div>
                <div className="paragraph">{slide.paragraph}</div>
              </>
            ) : (
              <>
                <div className="heading">{slide.heading}</div>
                <div className="paragraph">{slide.subHeading}</div>
              </>
            )
          ) : (
            <div className="endPre">
              Thank you for completing our presentation!
            </div>
          )}
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
              type={typeNotification}
              status={isAppearNotification}
              message={messageNotification}
            />
          )}
        </div>
      </div>
    ) : (
      <div className="preExecuteContainer">
        <div className="preExecuteWrapper">
          <div className="title">
            <LocalLibraryIcon className="icon" fontSize="large" />
            <span>Realtime Learning</span>
          </div>
          <div className="endPre">Please wait the host to start this presentation!</div>
        </div>
      </div>
    )
  );
};

export default PresentationExecute;
