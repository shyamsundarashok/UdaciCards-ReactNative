import { combineReducers } from 'redux';
import { RECEIVE_DECKS, ADD_QUESTION, ADD_DECK, ANSWER_QUESTION, QUIZ_START, RESET_QUIZ } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_QUESTION :
      state[action.key].questions.push(action.question)
      return {
        ...state
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    default :
      return state
  }
}

const initialAnswerState = {correct: 0, incorrect: 0, currentQuestionIdx: 0, quizStarted: false}

function answers (state = initialAnswerState, action) {
  switch (action.type) {
    case ANSWER_QUESTION :
      action.correct ? state.correct += 1 : state.incorrect += 1
      state.currentQuestionIdx += 1
      return {
        ...state
      }
    case QUIZ_START :
      return {
        ...state, quizStarted: true
      }
    case RESET_QUIZ :
      return { ...initialAnswerState }
    default :
      return {
        ...state
      }
  }
}

const rootReducer = combineReducers({ decks, answers });
export default rootReducer;
