import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';

export const DECK_STORAGE_KEY = 'UdaciCards:decks'
export const DECK_QUIZ_NOTIF = 'UdaciCards:quizNotif'


const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)
      //return results === null ? dummyData : JSON.parse(results)
    })
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => (decks[title]))
}

export function saveDeckTitle(deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
}

export function addCardToDeck(entry, key) {

  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      decks[key].questions.push(entry)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(DECK_QUIZ_NOTIF)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to take your test for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(DECK_QUIZ_NOTIF)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(), {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(DECK_QUIZ_NOTIF, JSON.stringify(true))
            }
          })
      }
    })
}
