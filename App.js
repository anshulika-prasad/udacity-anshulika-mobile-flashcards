import React from 'react';
import {
  StatusBar,
  View, Platform
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Home from './components/Home';
import DeckDetail from './components/DeckDetail';
import AddEntry from './components/AddEntry';
import AddQuestion from './components/AddQuestion';
import QuizMain from './components/QuizMain';
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers';
import { white, lightPurple, darkorchid } from './utils/colors';


function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
}


const Tabs = TabNavigator({
  Decks: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Decks',
      activeTintColor: Platform.OS === 'ios' ? lightPurple : white,
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={tintColor} />
    }
  } },
  {
    navigationOptions: {
      title: "My Flash cards",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"
      }
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? lightPurple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : darkorchid ,
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



const MainNavigator =  StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "My Flash cards",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  },
  QuizMain: {
    screen: QuizMain,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      headerTintColor: "white",
      title: "Add new deck",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar
            backgroundColor="purple"
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
