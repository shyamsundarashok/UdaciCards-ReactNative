import React, { Component } from 'react'
import { KeyboardAvoidingView, View, FlatList, Text, StyleSheet, Platform, TouchableHighlight, TextInput } from 'react-native'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import { white, black, darkcyan,cyan } from '../utils/colors'

class NewDeck extends Component {
  state = { text: "" }

  constructor(props) {
    super(props)
    this.inputs = {}
  }

  render() {
    const { text } = this.state
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.heading}>What is the title of your new deck?</Text>
        <TextInput
          value={text}
          style={styles.input}
          ref={ input => { this.inputs['deck'] = input }}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this._handleTextChange}
          placeholder='Deck Title' />
        <TouchableHighlight style={styles.button} onPress={() => this._handleTextChange()}>
          <Text style={styles.buttonTxt}>Submit</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }

  _handleTextChange = () => {
    const { text } = this.state
    if ((text === '') || (text === null))
      return
    const deck = {
      [text]: {
        title: text,
        questions: []
      }
    }
    saveDeckTitle(deck)
      .then(() => {
        this.setState({text: ''})
        this.props.dispatch(addDeck(deck))
        this.props.navigation.navigate('Decks')
        this.props.navigation.navigate('Deck', {deckKey: text, title: text})
    })
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
  heading: {
    fontSize: 32,
    textAlign: 'center',
    color: darkcyan
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 32,
    marginTop: 15,
  },
  button: {
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: darkcyan,
  },
  buttonTxt: {
    color: white,
    fontSize: 32,
  }
})


export default connect()(NewDeck)
