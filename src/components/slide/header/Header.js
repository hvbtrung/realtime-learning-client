import "./header.scss";
import { Tooltip, IconButton, Box, Typography, Button, Modal } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate, useOutletContext } from "react-router-dom";
import SlideType from "../slideType/SlideType";
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';

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

export default function HeaderSlide({ presentation }) {
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [slideType, setSlideType] = useState("Heading");

  const { slides, setSlides, slide, setSlide, setQuestion, setOptions, setHeading,
    setParagraph, setSubHeading, setPresent, groupId, setGroupId } = useOutletContext();

  const navigate = useNavigate();

  const handleMultipleChoice = () => {
    setSlideType("Multiple Choice");
  }

  const handleParagraph = () => {
    setSlideType("Paragraph");
  }

  const handleHeading = () => {
    setSlideType("Heading");
  }

  const handleAddSlide = async () => {
    let data = {
      presentationId: presentation._id,
      type: slideType
    }

    switch (slideType) {
      case "Multiple Choice":
        const options = [
          {
            name: "Option 1",
            counter: 0
          },
          {
            name: "Option 2",
            counter: 0
          },
          {
            name: "Option 3",
            counter: 0
          },
        ];

        data = {
          ...data,
          question: "Multiple Choice",
          options,
        }
        break;
      case "Paragraph":
        const headingp = "Slide with paragraph";
        const paragraph = "Use this paragraph to explain something in detail";

        data = {
          ...data,
          headingp,
          paragraph,
        }
        break;
      case "Heading":
        const headingh = "Slide with heading";
        const subHeading = "Subheading";

        data = {
          ...data,
          headingh,
          subHeading,
        }
        break;
      default:
        break;
    }

    const res = await axiosInstance.post(`/api/slides`, data);

    const slide = res.data.data;
    setSlides([...slides, slide]);
    setSlide(slide);

    switch (slide.type) {
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

    setShowAddSlideModal(false);
  }

  const handlePublicPresent = async () => {
    setPresent(true);
    setGroupId("000000000000000000000000");

    const presentationsData = {
      isPresent: true,
      isPublic: true
    }

    await axiosInstance.patch(`/api/presentations/${presentation._id}`, presentationsData);

    const groupPresentationSlidesData = {
      presentationId: presentation._id,
      groupId: "000000000000000000000000",
      currentSlideId: slide._id,
    }

    await axiosInstance.post(`/api/groupPresentationSlides`, groupPresentationSlidesData);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box className="HeaderSlide__Right">
            <Button
              sx={{ ml: 3 }}
              variant="outlined"
              onClick={handlePublicPresent}
            >
              <PlayArrowIcon /> Public Present
            </Button>
          </Box>
          <Box className="HeaderSlide__Right">
            <Button
              sx={{ ml: 3 }}
              variant="outlined"
              onClick={() => setPresent(true)}
            >
              <PlayArrowIcon /> Group Present
            </Button>
          </Box>
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
            <div className="headerSlideForm">
              <div className="slideTypeContainer">
                <div
                  className="slideTypeWrapper"
                  onClick={() => handleMultipleChoice()}
                >
                  <SlideType
                    icon={EqualizerOutlinedIcon}
                    name={"Multipe Choice"}
                  />
                </div>

                <div
                  className="slideTypeWrapper"
                  onClick={() => handleParagraph()}
                >
                  <SlideType
                    icon={SegmentOutlinedIcon}
                    name={"Paragraph"}
                  />
                </div>

                <div
                  className="slideTypeWrapper"
                  onClick={() => handleHeading()}
                >
                  <SlideType
                    icon={DragHandleOutlinedIcon}
                    name={"Heading"}
                  />
                </div>
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

                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => handleAddSlide()}
                >
                  Add SLide
                </Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div >
  );
}
