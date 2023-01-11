import "./QuestionScreen.scss";
import * as React from "react";
import { useState, useEffect, useRef, useReducer } from "react";
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
import socketIOClient from "socket.io-client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  initQuestionState,
  QuestionReducer,
} from "./questionReducer/QuestionReducer";
import {
  setQuestion,
  setAddQuestion,
  setUpVote,
  setMarkAnswer,
  setSelectedOption,
  sortBy,
  setDownVote,
  setQuestions,
} from "./questionReducer/Action";
import {
  SORT_NEWEST,
  SORT_TOPVOTE,
  SORT_ANSWERED,
  SORT_UNANSWER,
  UP_VOTE,
  DOWN_VOTE,
} from "./questionReducer/Constant";
import axiosInstance from "../../utils/axiosInstance";

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

export default function QuestionScreen({
  isOpenQuestion,
  closeQuestionDialog,
}) {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [userId] = useState(userInfo._id);
  const [nameUser] = useState(userInfo.name);
  const questionInput = useRef();
  const socketRef = useRef();
  const messagesEnd = useRef();
  let pathname = window.location.pathname.slice("/presentations/".length);
  let presentationId = pathname.replace("/slides", "");
  presentationId = presentationId.replace("/execute", "");
  const [state, dispatch] = useReducer(QuestionReducer, initQuestionState);
  var { questions, question, selectedOption } = state;

  useEffect(
    () => {
      getAllQuestions();

      socketRef.current = socketIOClient.connect(process.env.REACT_APP_API_URL);
      socketRef.current.emit("createRoom", `${presentationId}-questions`);
      socketRef.current.on("sendMessageToClient", (data) => {
        // console.log("question: ", data);
        dispatch(
          setAddQuestion({
            questionId: data._id,
            totalVotes: data.totalVotes,
            asker: { name: data.name },
            content: data.message,
            isAnswered: data.isAnswered,
          })
        );
      });

      socketRef.current.on(
        "sendDataVoteQuestionToClient",
        ({ questionId, votingType }) => {
          if (votingType === UP_VOTE) {
            dispatch(setUpVote(questionId));
          } else if (votingType === DOWN_VOTE) {
            dispatch(setDownVote(questionId));
          }
          dispatch(sortBy(selectedOption));
        }
      );

      socketRef.current.on("sendMarkQuestionToClient", ({ questionId }) => {
        dispatch(setMarkAnswer(questionId));
        dispatch(sortBy(selectedOption));
      });

      return () => {
        socketRef.current.disconnect();
      };
    },
    // eslint-disable-next-line
    []
  );

  const getAllQuestions = async () => {
    const res = await axiosInstance.get(
      `/api/questions?presentationId=${presentationId}`
    );

    const resQuestions = res.data.questions;
    dispatch(setQuestions(resQuestions));
    dispatch(sortBy(selectedOption));
  };

  const sendQuestion = ({ questionId, content, totalVotes, isAnswered }) => {
    socketRef.current.emit("sendMessageToServer", {
      message: content,
      questionId: questionId,
      userId: userId,
      name: nameUser,
      totalVotes: totalVotes,
      isAnswered: isAnswered,
    });
  };

  const sendVote = ({ questionId, votingType }) => {
    socketRef.current.emit("sendDataVoteQuestionToServer", {
      questionId: questionId,
      votingType: votingType,
    });
  };

  const sendMarkQuestion = ({ questionId }) => {
    socketRef.current.emit("sendMarkQuestionToServer", {
      questionId,
    });
  };

  const handleVoteQuestion = async (questionId, votingType) => {
    const isVoted = await axiosInstance.get(
      `/api/vote?questionId=${questionId}&votingType=${votingType}`
    );

    if (
      isVoted.data.status === "success" &&
      votingType === isVoted.data.vote.votingType
    ) {
      return;
    }
    const res = await axiosInstance.post(`/api/vote`, {
      data: {
        questionId: questionId,
        votingType: votingType,
      },
    });

    // console.log("handleVoteQuestion", res);

    if (res.data.status === "success") {
      sendVote({ questionId, votingType });
    }
  };

  const handleSendQuestion = async () => {
    const res = await axiosInstance.post(`/api/questions`, {
      data: {
        content: question,
        presentationId: presentationId,
      },
    });

    let resQuestion = res.data.question;

    sendQuestion({
      questionId: resQuestion._id,
      content: resQuestion.content,
      totalVotes: resQuestion.totalVotes ? 0 : 0,
      isAnswered: resQuestion.isAnswered,
    });
    dispatch(setQuestion(""));
    scrollToBottom();
    dispatch(sortBy(selectedOption));
    questionInput.current.focus();
  };

  const handleMarkQuestion = async (questionId, isAnswered, presentationId) => {
    const res = await axiosInstance.patch(`/api/questions`, {
      data: {
        questionId,
        isAnswered: isAnswered,
        presentationId,
      },
    });

    console.log("data is: ", res);

    if (res.data.status === "success") {
      sendMarkQuestion({ questionId });
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
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
                onChange={(e) => {
                  dispatch(setSelectedOption(e.target.value));
                  dispatch(sortBy(e.target.value));
                }}
              >
                <MenuItem value={SORT_UNANSWER}>Unanswer</MenuItem>
                <MenuItem value={SORT_ANSWERED}>Answered</MenuItem>
                <MenuItem value={SORT_TOPVOTE}>Top Vote</MenuItem>
                <MenuItem value={SORT_NEWEST}>Newest</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {questions.map((question) => {
            return (
              <Box
                className="questionContent__item"
                key={question._id}
                ref={messagesEnd}
              >
                <Box className="questionContent__item--left vote">
                  <Tooltip
                    className="questionContent__item--voteItem upvote"
                    onClick={() => {
                      handleVoteQuestion(question._id, UP_VOTE);
                    }}
                  >
                    <IconButton>
                      <ArrowUpwardRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <div>{question.totalVotes}</div>
                  <Tooltip
                    className="questionContent__item--voteItem downvote "
                    onClick={() => {
                      handleVoteQuestion(question._id, DOWN_VOTE);
                    }}
                  >
                    <IconButton>
                      <ArrowDownwardRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box className="questionContent__item--center">
                  <Box className="questionContent__item--secondaryTitle">
                    <small className="questionContent__item--Name">
                      {question.asker.name}
                    </small>
                    <small
                      className="questionContent__item--isAnswered"
                      onClick={() => {
                        handleMarkQuestion(
                          question._id,
                          question.isAnswered,
                          presentationId
                        );
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
            value={question}
            onChange={(e) => {
              dispatch(setQuestion(e.target.value));
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
