import "./QuestionScreen.scss";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const questions = [
  {
    id: "1",
    totalVotes: 12,
    name: "Vinh",
    content:
      "Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus",

    isAnswered: true,
  },

  {
    id: "2",
    totalVotes: 2,
    name: "Nguyên",
    content:
      "How to can I install it without liscen and how to build a simple program with that IDE",

    isAnswered: false,
  },
  {
    id: "3",
    totalVotes: 10,
    name: "Thanh",
    content:
      " Cras mattis consectetur purus sit amet fermentum. Cras justo lorem odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam Morbi leo risus, porta acconsectetur ac, vestibulum at eros. risus, porta ac consecteturac, vestibulum at eros. Cras mattis consectetur purus sit amet",

    isAnswered: false,
  },
];

export default function QuestionScreen({
  isOpenQuestion,
  closeQuestionDialog,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [questionContent, setQuestionContent] = useState(null);

  const questionInput = useRef();

  useEffect(() => {}, [isLoad]);

  const handleVoteItem = (id, type) => {
    questions.map((question) => {
      if (question.id === id && type === "up") {
        question.totalVotes = question.totalVotes + 1;
      } else if (question.id === id && type === "down") {
        question.totalVotes = question.totalVotes - 1;
      }
    });

    setIsLoad(!isLoad);
  };

  const handleMarkAnswer = (id) => {
    for (let question of questions) {
      if (question.id === id) {
        question.isAnswered = !question.isAnswered;
        break;
      }
    }

    setIsLoad(!isLoad);
  };

  const selectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSendQuestion = () => {
    questions.push({
      id: "4",
      totalVotes: 0,
      name: "Killer B",
      content: questionContent,
      isAnswered: false,
    });
    setIsLoad(!isLoad);
    setQuestionContent("");
    questionInput.current.focus();
  };
  return (
    <div>
      <BootstrapDialog
        onClose={closeQuestionDialog}
        aria-labelledby="Question-Dialog-Title"
        open={isOpenQuestion}
      >
        <BootstrapDialogTitle
          id="Question-Dialog-Title"
          onClose={closeQuestionDialog}
        >
          Question
        </BootstrapDialogTitle>
        <DialogContent className="questionContent">
          <Box className="questionContent__select">
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              id="form-select"
              className="questionContent__select--form"
              size="small"
            >
              <InputLabel id="select">Sort</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={selectedOption}
                label="Sort"
                onChange={selectOption}
              >
                <MenuItem value="unanswer">Unanswer</MenuItem>
                <MenuItem value="answered">Answered</MenuItem>
                <MenuItem value="topvote">Top Vote</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {questions.map((question) => {
            return (
              <Box className="questionContent__item" key={question.id}>
                <Box className="questionContent__item--left vote">
                  <Tooltip
                    className="questionContent__item--voteItem upvote"
                    onClick={() => handleVoteItem(question.id, "up")}
                  >
                    <IconButton>
                      <ArrowUpwardRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <div>{question.totalVotes}</div>
                  <Tooltip
                    className="questionContent__item--voteItem downvote"
                    onClick={() => handleVoteItem(question.id, "down")}
                  >
                    <IconButton>
                      <ArrowDownwardRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box className="questionContent__item--center">
                  <Box className="questionContent__item--secondaryTitle">
                    <small className="questionContent__item--Name">
                      {question.name}
                    </small>
                    <small
                      className="questionContent__item--isAnswered"
                      onClick={() => {
                        handleMarkAnswer(question.id);
                      }}
                    >
                      {question.isAnswered ? "Answered" : "Unanswer"}
                    </small>
                  </Box>
                  <Typography
                    gutterBottom
                    className="questionContent__item--content"
                  >
                    {question.content}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </DialogContent>
        <DialogActions className="QuestionInput">
          <input
            className="QuestionInput--content"
            value={questionContent}
            onChange={(e) => {
              setQuestionContent(e.target.value);
            }}
            placeholder="Type your question..."
            ref={questionInput}
            text="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendQuestion();
              }
            }}
          />
          <Tooltip className="QuestionInput--icon" onClick={handleSendQuestion}>
            <IconButton>
              <SendIcon id="sendIcon" />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
