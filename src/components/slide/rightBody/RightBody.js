import "./rightBody.scss";
import { Button, TextField } from "@mui/material";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate, useOutletContext } from "react-router-dom";

const RightBody = () => {
  const navigate = useNavigate();

  const { slide, setSlide, slides, setSlides, question, setQuestion,
    options, setOptions, heading, setHeading, paragraph, setParagraph,
    subHeading, setSubHeading } = useOutletContext();

  const handleAddOption = () => {
    setOptions([...options, { name: "", counter: 0 }]);
  }

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  }

  const handleOptionChange = (e, index) => {
    options[index] = { name: e.target.value, counter: 0 };
    setOptions([...options]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {};

    switch (slide.type) {
      case "Multiple Choice":
        data = {
          question,
          options,
        }
        break;
      case "Paragraph":
        data = {
          heading,
          paragraph
        }
        break;
      case "Heading":
        data = {
          heading,
          subHeading
        }
        break;
      default:
        break;
    }

    const res = await axiosInstance.patch(`/api/slides/${slide._id}`, data);

    const index = slides.indexOf(slide);
    let newSlides = [...slides];
    newSlides[index] = res.data.data;
    setSlides(newSlides);
    setSlide(res.data.data);
  }

  const handleViewResult = () => {
    navigate(`/slides/${slide._id}/result`);
  }

  return (
    <div className="rightBodyWrapper">
      <div className="editSlide">
        {slide.type === "Multiple Choice" ? (
          <>
            <form className="headerSlideForm" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Question"
                variant="outlined"
                sx={{ width: "100%", mb: 3 }}
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
              {options.map((option, index) => {
                return (
                  <div key={index} className="slideFormOptions">
                    <TextField
                      id="outlined-basic"
                      label="Option"
                      variant="outlined"
                      sx={{ width: "75%", mb: 2 }}
                      value={option.name}
                      onChange={(e) => handleOptionChange(e, index)}
                    />
                    {
                      index === options.length - 1 ? (
                        <Button
                          variant="outlined"
                          className="slideFormBtn"
                          onClick={handleAddOption}
                        >
                          Add
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          className="slideFormBtn"
                          onClick={() => handleRemoveOption(index)}
                        >
                          Remove
                        </Button>
                      )
                    }
                  </div>
                )
              })}
              <Button type="submit" variant="outlined">Save Slide</Button>
            </form>

            <Button
              variant="outlined"
              className="resultBtn"
              onClick={handleViewResult}
            >
              View Results
            </Button>
          </>
        ) : slide.type === "Paragraph" ? (
          <form className="headerSlideForm" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Heading"
              variant="outlined"
              sx={{ width: "100%", mb: 3 }}
              value={heading}
              onChange={e => setHeading(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Paragraph"
              variant="outlined"
              sx={{ width: "100%", mb: 3 }}
              multiline
              rows={4}
              value={paragraph}
              onChange={e => setParagraph(e.target.value)}
            />
            <Button type="submit" variant="outlined">Save Slide</Button>
          </form>
        ) : (
          <form className="headerSlideForm" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Heading"
              variant="outlined"
              sx={{ width: "100%", mb: 3 }}
              value={heading}
              onChange={e => setHeading(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="SubHeading"
              variant="outlined"
              sx={{ width: "100%", mb: 3 }}
              value={subHeading}
              onChange={e => setSubHeading(e.target.value)}
            />
            <Button type="submit" variant="outlined">Save Slide</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RightBody;
