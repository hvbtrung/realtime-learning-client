import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./slideLayout.scss";

const SlideLayout = () => {
    const [slides, setSlides] = useState(null);
    const [slide, setSlide] = useState(null);
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState(null);
    const [heading, setHeading] = useState(null);
    const [paragraph, setParagraph] = useState(null);
    const [subHeading, setSubHeading] = useState(null);
    const [present, setPresent] = useState(false);
    const [groupId, setGroupId] = useState(null);

    return (
        <>
            <Outlet
                context={{
                    slides, setSlides, slide, setSlide, question, setQuestion,
                    options, setOptions, heading, setHeading, paragraph, setParagraph,
                    subHeading, setSubHeading, present, setPresent, groupId, setGroupId
                }}
            />
        </>
    );
}

export default SlideLayout;
