import "./rightBody.scss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RightBody = ({ slide, setSlide, slides, setSlides }) => {
  const [showEditSlideModal, setShowEditSlideModal] = useState(false);
  const [question, setQuestion] = useState(slide.question);
  const [options, setOptions] = useState(slide.options);

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

  const handleDeleteSlide = async () => {
    const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
    await axios.delete(`${SERVER_DOMAIN}/api/slides/${slide._id}`, {
      withCredentials: true,
      validateStatus: () => true,
    });

    let newSlides = [...slides];
    newSlides = newSlides.filter((newSlide) => newSlide._id !== slide._id);
    setSlides(newSlides);
    setSlide(newSlides[0]);
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

    let newSlides = [...slides];
    newSlides = newSlides.filter((newSlide) => newSlide._id !== slide._id);
    setSlides([...newSlides, res.data.data]);
    setSlide(res.data.data);
    setShowEditSlideModal(false);
  }

  return (
    <div className="rightBodyWrapper">
      <div className="slideType">
        <span>Slide type</span>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Slide</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Slide"
            value=""
          >
            <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
            <MenuItem value="Word Cloud">Word Cloud</MenuItem>
            <MenuItem value="Ranking">Ranking</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="editSlide">
        <Button
          sx={{ ml: 1 }}
          variant="contained"
          onClick={() => {
            setQuestion(slide.question);
            setOptions(slide.options);
            setShowEditSlideModal(true);
          }}>
          Edit Slide
        </Button>
      </div>
      <div className="deleteSlide">
        <Button
          sx={{ ml: 1 }}
          variant="contained"
          color="error"
          onClick={handleDeleteSlide}
        >
          Delete Slide
        </Button>
      </div>

      <Modal
        open={showEditSlideModal}
        onClose={() => setShowEditSlideModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Slide
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="headerSlideForm" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Question"
                variant="outlined"
                sx={{ width: "100%", mb: 2 }}
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
              <div>
                {options.map((option, index) => {
                  return (
                    <>
                      <TextField
                        id="outlined-basic"
                        label="Option"
                        variant="outlined"
                        sx={{ width: "70%", mb: 2 }}
                        value={option.name}
                        onChange={(e) => handleOptionChange(e, index)}
                      />
                      {index === options.length - 1 ? (
                        <Button
                          variant="outlined"
                          sx={{ m: 1 }}
                          onClick={handleAddOption}
                        >
                          Add Option
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{ m: 1 }}
                          color="error"
                          onClick={() => handleRemoveOption(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </>
                  )
                })}
              </div>
              <Button type="submit" variant="contained" centered>Save Slide</Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default RightBody;
