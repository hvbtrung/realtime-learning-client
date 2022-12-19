import "./presentationExecute.scss";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const PresentationExecute = () => {
    const params = useParams();
    const [slides, setSlides] = useState(null);
    const [slide, setSlide] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const getSlides = async () => {
            // const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
            // const res = await axios.get(
            //     `${SERVER_DOMAIN}/api/presentations/${params.presentationId}/slides`, {
            //     withCredentials: true,
            //     validateStatus: () => true,
            // });

            const res = await axiosInstance.get(`/api/presentations/${params.presentationId}/slides`);

            setSlides(res.data.data);
            res.data.data.length && setSlide(res.data.data[0]);
        }

        getSlides();
    }, [params.presentationId]);

    const handleSubmit = async () => {
        const newSlide = structuredClone(slide);
        newSlide.options[selectedOption].counter += 1;
        const data = {
            options: newSlide.options
        }

        // const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
        // const res = await axios.patch(
        //     `${SERVER_DOMAIN}/api/slides/${slide._id}`, data, {
        //     withCredentials: true,
        //     validateStatus: () => true,
        // });

        const res = await axiosInstance.patch(`/api/slides/${slide._id}`, data);

        setSelectedOption(null);
        const index = slides.indexOf(slide);
        let newSlides = [...slides];
        newSlides[index] = res.data.data;
        setSlides(newSlides);
        index < slides.length ? setSlide(slides[index + 1]) : setSlide(null);
    }

    return (
        slides && (
            <div className="preExecuteContainer">
                <div className="preExecuteWrapper">
                    <div className="title">
                        <LocalLibraryIcon className="icon" fontSize="large" />
                        <span>Realtime Learning</span>
                    </div>
                    {slide ? (
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
                        <div className="endPre">Thank you for completing our presentation!</div>
                    )}
                </div>
            </div>
        )
    );
}

export default PresentationExecute;
