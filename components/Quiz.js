import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks, clearLocalNotification, setLocalNotification } from '../utils/api'
import { lastQuized, resetQuiz } from '../actions'
import Card from './Card'
import { white, black, green,darkturquoise } from '../utils/colors'


class Quiz extends Component {

  componentWillMount () {
    clearLocalNotification().then(setLocalNotification)
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { deck } = state.params
    const { dispatch, currentQuestionIdx, decks } = this.props

    if ((currentQuestionIdx === null) || (decks === null)) {
      return
    }

    const { questions, title } = decks[deck]

    if (questions.length > 0 && currentQuestionIdx == questions.length) {
      const { correct, incorrect } = this.props
      const percentCorrect = Math.round((correct / (correct + incorrect)) * 100)

      return (
        <View style={styles.container}>
          <Text style={styles.summary}>
            Done! You got {percentCorrect}%  correct ({correct} out of {correct + incorrect})
          </Text>
          <TouchableHighlight style={styles.button} onPress={() => {
            dispatch(resetQuiz())
          }}>
            <Text style={styles.buttonTxt}>Restart Quiz</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => {
            this.props.navigation.goBack()
          }}>
            <Text style={styles.buttonTxt}>Back to Deck</Text>
          </TouchableHighlight>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.count}>{currentQuestionIdx + 1} / {questions.length}</Text>
        <Card question={questions[currentQuestionIdx]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingLeft: 10,
   paddingRight: 10,
   justifyContent: 'center',
   alignItems: 'center'
  },
  count: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'flex-start'
  },
  summary: {
    fontSize: 20,
    color: green,
    textAlign: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 250,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: black,
    backgroundColor: darkturquoise,
  },
  buttonTxt: {
    width: 240,
    color: white,
    fontSize: 32,
    textAlign: 'center'
  },
})


function mapStateToProps (state, ownProps) {
  return {
    correct: state.answers.correct,
    incorrect: state.answers.incorrect,
    currentQuestionIdx: state.answers.currentQuestionIdx,
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Quiz)
