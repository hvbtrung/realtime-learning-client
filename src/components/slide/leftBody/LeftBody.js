import "./leftBody.scss";
import ItemLeftBody from "../itemLeftBody/ItemLeftBody";
import { Box, Typography, Button, Modal } from "@mui/material";
import { Dropdown, Menu } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  FacebookFilled,
  GithubFilled,
  GoogleCircleFilled,
  ReloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useOutletContext } from "react-router-dom";
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function LeftBodySlide() {
  const { slide: selectedSlide, setSlide, slides, setSlides, setQuestion, setOptions,
    setHeading, setParagraph, setSubHeading } = useOutletContext();
  const [showDeleteSlideModal, setShowDeleteSlideModal] = useState(false);

  const menu = (
    <Menu
      onClick={({ key }) => {
        switch (key) {
          case "delete":
            setShowDeleteSlideModal(true);
            break;
          default:
            break;
        }
      }}
      items={[
        {
          label: "Copy",
          key: "copy",
          icon: <CopyOutlined />,
        },
        {
          label: "Share",
          key: "share",
          icon: <ShareAltOutlined />,
          children: [
            {
              label: "Facebook",
              key: "fb",
              icon: <FacebookFilled />,
            },
            {
              label: "Github",
              key: "gh",
              icon: <GithubFilled />,
            },
            {
              label: "Google",
              key: "gg",
              icon: <GoogleCircleFilled />,
            },
          ],
        },
        {
          label: "Reload",
          key: "reload",
          icon: <ReloadOutlined />,
        },
        {
          label: "Delete",
          key: "delete",
          danger: true,
          icon: <DeleteOutlined />,
        },
      ]}
    ></Menu>
  );

  const handleDeleteSlide = async () => {

    await axiosInstance.delete(`/api/slides/${selectedSlide._id}`);

    let newSlides = [...slides];
    newSlides = newSlides.filter(
      (newSlide) => newSlide._id !== selectedSlide._id
    );
    setSlides(newSlides);
    setSlide(newSlides[0]);
    setShowDeleteSlideModal(false);
  };

  const handleClick = (slide) => {
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
  }

  return (
    <div className="leftBodyContainer">
      {slides.map((slide, index) => (
        <Dropdown overlay={menu} trigger={["contextMenu"]} key={index}>
          <div
            className={`leftBodyItem ${selectedSlide === slide && "active"}`}
            onClick={() => handleClick(slide)}
          >
            {slide.type === "Multiple Choice" ? (
              <ItemLeftBody
                icon={EqualizerOutlinedIcon}
                text={slide.question}
              />
            ) : slide.type === "Paragraph" ? (
              <ItemLeftBody
                icon={SegmentOutlinedIcon}
                text={slide.heading}
              />
            ) : (
              <ItemLeftBody
                icon={DragHandleOutlinedIcon}
                text={slide.heading}
              />
            )}
          </div>
        </Dropdown>
      ))}

      <Modal
        open={showDeleteSlideModal}
        onClose={() => setShowDeleteSlideModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Slide
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete slide?
          </Typography>
          <div className="modalButton">
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              onClick={() => setShowDeleteSlideModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="outlined"
              sx={{ m: 1 }}
              color="error"
              onClick={handleDeleteSlide}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
