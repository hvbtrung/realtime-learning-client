import {
  UP_VOTE,
  DOWN_VOTE,
  SET_QUESTION,
  ADD_QUESTION,
  SORT_NEWEST,
  SORT_TOPVOTE,
  SORT_ANSWERED,
  SORT_UNANSWER,
  SET_MARK_ANSWER,
  SET_SELECTED_OPTION,
  SET_QUESTIONS,
} from "./Constant";

export const initQuestionState = {
  selectedOption: SORT_NEWEST,
  question: "",
  questions: [],
};

export function QuestionReducer(state, action) {
  switch (action.type) {
    case SET_QUESTION: {
      return { ...state, question: action.payload };
    }
    case SET_QUESTIONS: {
      return { ...state, questions: action.payload };
    }

    case SET_MARK_ANSWER: {
      let questions = state.questions;

      for (let question of questions) {
        if (question._id === action.payload) {
          question.isAnswered = !question.isAnswered;
          break;
        }
      }
      return { ...state, questions: questions };
    }
    case ADD_QUESTION: {
      return { ...state, questions: [action.payload, ...state.questions] };
    }

    case UP_VOTE: {
      let questions = state.questions;

      for (let question of questions) {
        if (question._id === action.payload) {
          question.totalVotes++;
          break;
        }
      }

      return { ...state, questions: questions };
    }

    case DOWN_VOTE: {
      let questions = state.questions;

      for (let question of questions) {
        if (question._id === action.payload) {
          question.totalVotes--;
          break;
        }
      }

      return { ...state, questions: questions };
    }
    case SORT_NEWEST: {
      let questions = state.questions;

      return {
        ...state,
        questions: questions.sort((a, b) => {
          if (Date.parse(a.createdAt) > Date.parse(b.createdAt)) {
            return -1;
          }
          if (Date.parse(a.createdAt) < Date.parse(b.createdAt)) {
            return 1;
          }
          return 0;
        }),
      };
    }

    case SORT_TOPVOTE: {
      let questions = state.questions;

      return {
        ...state,
        questions: questions.sort((a, b) => {
          return b.totalVotes - a.totalVotes;
        }),
      };
    }

    case SORT_ANSWERED: {
      let questions = state.questions;

      return {
        ...state,
        questions: questions.sort((a, b) => {
          if (a.isAnswered === true && b.isAnswered === false) {
            return -1;
          }
          if (b.isAnswered === true && a.isAnswered === false) {
            return 1;
          }
          return 0;
        }),
      };
    }
    case SORT_UNANSWER: {
      var questions = state.questions;

      return {
        ...state,
        questions: questions.sort((a, b) => {
          if (a.isAnswered === true && b.isAnswered === false) {
            return 1;
          }
          if (b.isAnswered === true && a.isAnswered === false) {
            return -1;
          }
          return 0;
        }),
      };
    }

    case SET_SELECTED_OPTION: {
      return { ...state, selectedOption: action.payload };
    }

    default: {
      return { ...state };
    }
  }
}
