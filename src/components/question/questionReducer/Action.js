import {
  UP_VOTE,
  DOWN_VOTE,
  ADD_QUESTION,
  SORT_NEWEST,
  SORT_TOPVOTE,
  SORT_ANSWERED,
  SORT_UNANSWER,
  SET_QUESTION,
  SET_MARK_ANSWER,
  SET_SELECTED_OPTION,
  SET_QUESTIONS,
} from "./Constant";

export const setQuestion = (payload) => {
  return {
    type: SET_QUESTION,
    payload,
  };
};
export const setQuestions = (payload) => {
  return {
    type: SET_QUESTIONS,
    payload,
  };
};

export const setUpVote = (payload) => {
  return {
    type: UP_VOTE,
    payload,
  };
};
export const setDownVote = (payload) => {
  return {
    type: DOWN_VOTE,
    payload,
  };
};

export const setAddQuestion = (payload) => {
  return {
    type: ADD_QUESTION,
    payload,
  };
};
export const setSelectedOption = (payload) => {
  return {
    type: SET_SELECTED_OPTION,
    payload,
  };
};

export const sortBy = (payload) => {
  switch (payload) {
    case SORT_TOPVOTE: {
      return setSortQuestionByTopVote(payload);
    }
    case SORT_UNANSWER:
      return setSortQuestionByUnAnswered(payload);

    case SORT_ANSWERED:
      return setSortQuestionByAnswered(payload);

    case SORT_NEWEST:
      return setSortQuestionByNewest(payload);

    default:
      return setSortQuestionByTopVote(payload);
  }
};

export const setMarkAnswer = (payload) => {
  return {
    type: SET_MARK_ANSWER,
    payload,
  };
};

export const setSortQuestionByNewest = (payload) => {
  return {
    type: SORT_NEWEST,
    payload,
  };
};

export const setSortQuestionByTopVote = (payload) => {
  return {
    type: SORT_TOPVOTE,
    payload,
  };
};

export const setSortQuestionByAnswered = (payload) => {
  return {
    type: SORT_ANSWERED,
    payload,
  };
};

export const setSortQuestionByUnAnswered = (payload) => {
  return {
    type: SORT_UNANSWER,
    payload,
  };
};
