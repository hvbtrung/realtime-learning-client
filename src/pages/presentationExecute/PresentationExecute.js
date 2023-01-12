import "./presentationExecute.scss";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";
import { io } from "socket.io-client";

const PresentationExecute = () => {
    const { user } = useAuthContext();
    const params = useParams();
    const [presentation, setPresentation] = useState(null);
    const [slide, setSlide] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const socket = useRef();

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
                                    <div >
                                        <ul className="options">
                                            {slide.options.map((option, index) => (
                                                <li
                                                    key={index}
                                                    className={`option ${selectedOption === index && "active"}`}
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
                        <div className="endPre">Thank you for completing our presentation!</div>
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
}

export default PresentationExecute;
