import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks, addDeck, quizStart, resetQuiz } from '../actions'
import { AppLoading} from 'expo'
import Card from './Card'
import { black, white, lightGrey, darkturquoise, turquoise, teal } from '../utils/colors'

class Deck extends Component {

  render() {
    const { navigate, state } = this.props.navigation
    const { deckKey } = state.params
    const { dispatch, decks } = this.props

    if (decks === null) {
      return
    }

    const { questions, title } = decks[deckKey]

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.subHead}>{questions.length} Cards</Text>
        </View>
        <TouchableOpacity style={[styles.button, styles.whiteBtn]} onPress={() => this.props.navigation.navigate('NewCard', {deck: deckKey}) }>
          <Text style={[styles.buttonTxt, styles.whiteBtnTxt]}>Add Card</Text>
        </TouchableOpacity>
        {questions.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={() => {
            this.props.dispatch(resetQuiz())
            this.props.navigation.navigate('Quiz', {deck: deckKey})
          }}>
            <Text style={styles.buttonTxt}>Start Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   justifyContent: 'center',
   alignItems: 'center',
   paddingLeft: 10,
   paddingRight: 10
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 45,
    textAlign: 'center',
    color:darkturquoise
  },
  subHead: {
    fontSize: 22,
    color: turquoise,
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
  whiteBtn: {
    backgroundColor: white
  },
  whiteBtnTxt: {
    color: darkturquoise,
    borderColor: teal
  }
})

function mapStateToProps ( { decks } ) {
  return { decks }
}

export default connect(mapStateToProps)(Deck)
