import React, { Component, PropTypes } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { addQuestion } from '../actions'
import { black, white, darkturquoise } from '../utils/colors'

class NewCard extends Component {

  state = {
    questionText: '',
    answerText: ''
  }

  _handleTextChange = () => {
    const { questionText, answerText } = this.state
    const { dispatch, navigation } = this.props
    const { deck } = navigation.state.params

    if ((questionText !== '') && (answerText !== '')) {
      const card = {
        question: questionText,
        answer: answerText
      }

      addCardToDeck(card, deck)
        .then((results) => {
          dispatch(addQuestion(deck, card))
          navigation.goBack()
        })
    }
  }


  render() {
    const { navigate, state } = this.props.navigation
    const { deck } = state.params
    const { questionText, answerText } = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          value={questionText}
          style={styles.input}
          onChangeText={(questionText) => this.setState({questionText})}
          onSubmitEditing={this._handleTextChange}
          placeholder='Question' />
        <TextInput
          value={answerText}
          style={styles.input}
          onChangeText={(answerText) => this.setState({answerText})}
          onSubmitEditing={this._handleTextChange}
          placeholder='Answer' />
        <TouchableHighlight style={styles.button} onPress={() => this._handleTextChange()}>
          <Text style={styles.buttonTxt}>Submit</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   justifyContent: 'flex-start',
   alignItems: 'center',
   paddingLeft: 10,
   paddingRight: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 32,
    marginTop: 15,
    marginBottom: 30
  },
  button: {
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: darkturquoise,
  },
  buttonTxt: {
    color: white,
    fontSize: 32,
    marginLeft: 10,
    marginRight: 10
  }
})

export default connect()(NewCard)
