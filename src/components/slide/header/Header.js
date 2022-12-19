import "./header.scss";
import { Tooltip, IconButton, Box, Typography, Button, Modal, TextField } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

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

export default function HeaderSlide({ presentation, slides, setSlides, setSlide, setPresent, setQuestion, setOptions }) {
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [question, setQuestionAdd] = useState(null);
  const [options, setOptionsAdd] = useState([{ name: "", counter: 0 }]);

  const navigate = useNavigate();

  const handleAddOption = () => {
    setOptionsAdd([...options, { name: "", counter: 0 }]);
  }

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptionsAdd(newOptions);
  }

  const handleOptionChange = (e, index) => {
    options[index] = { name: e.target.value, counter: 0 };
    setOptionsAdd([...options]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      question,
      options,
      presentationId: presentation._id
    }

    // const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
    // const res = await axios.post(`${SERVER_DOMAIN}/api/slides`, data, {
    //   withCredentials: true,
    //   validateStatus: () => true,
    // });

    const res = await axiosInstance.post(`/api/slides`, data);

    const slide = res.data.data;
    setSlides([...slides, slide]);
    setQuestionAdd("");
    setOptionsAdd([{ name: "", counter: 0 }]);
    setSlide(slide);
    setQuestion(slide.question);
    setOptions(slide.options);
    setShowAddSlideModal(false);
  }

  return (
    <div>
      <Box
        className="HeaderSlide"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box className="HeaderSlide__Left">
          <Tooltip title="Back" sx={{ mr: 0 }}>
            <IconButton onClick={() => navigate("/presentations")}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Button sx={{ ml: 1 }} variant="outlined" onClick={() => setShowAddSlideModal(true)}>
            + New Slide
          </Button>
        </Box>
        <Box className="HeaderSlide__Center">
          {presentation.title}
        </Box>
        <Box className="HeaderSlide__Right">
          <Button
            sx={{ ml: 3 }}
            variant="outlined"
            onClick={() => setPresent(true)}
          >
            <PlayArrowIcon /> Present
          </Button>
        </Box>
      </Box>

      <Modal
        open={showAddSlideModal}
        onClose={() => setShowAddSlideModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Slide
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="headerSlideForm" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Question"
                variant="outlined"
                sx={{ width: "100%", mb: 2 }}
                value={question}
                onChange={e => setQuestionAdd(e.target.value)}
              />
              <div>
                {options.map((option, index) => {
                  return (
                    <div key={index}>
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
                    </div>
                  )
                })}
              </div>
              <div className="newSlideBtn">
                <Button
                  type="button"
                  variant="outlined"
                  className="cancelBtn"
                  onClick={() => setShowAddSlideModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">Add SLide</Button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div >
  );
}
