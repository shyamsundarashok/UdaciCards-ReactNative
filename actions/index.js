export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_DECK = 'ADD_DECK'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const QUIZ_START = 'QUIZ_START'
export const RESET_QUIZ = 'RESET_QUIZ'


export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addQuestion (key, question) {
  return {
    type: ADD_QUESTION,
    question, key
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function answerQuestion (correct) {
  return {
    type: ANSWER_QUESTION,
    correct: correct,
  }
}

export function quizStart () {
  return {
    type: QUIZ_START
  }
}

export function resetQuiz () {
  return {
    type: RESET_QUIZ
  }
}
