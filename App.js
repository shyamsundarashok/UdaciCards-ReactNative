import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import NewCard from './components/NewCard'
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { purple, white, teal, darkcyan,cyan, cornflowerblue, steelblue } from './utils/colors'
import { setLocalNotification } from './utils/api'


const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-variant' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus-box' size={30} color={tintColor} />
    }
  },
},  {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? teal : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : teal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      },
      title: `${navigation.state.params.title}`
    })
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      },
      title: 'Add Card'
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
