import "./rightBody.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const RightBody = ({ slide, setSlide, slides, setSlides, question, setQuestion, options, setOptions }) => {
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

    const data = {
      question,
      options,
    }

    const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
    const res = await axios.patch(`${SERVER_DOMAIN}/api/slides/${slide._id}`, data, {
      withCredentials: true,
      validateStatus: () => true,
    });

    const index = slides.indexOf(slide);
    let newSlides = [...slides];
    newSlides[index] = res.data.data;
    setSlides(newSlides);
    setSlide(res.data.data);
  }

  return (
    <div className="rightBodyWrapper">
      <div className="editSlide">
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
      </div>
    </div>
  );
}

export default RightBody;
