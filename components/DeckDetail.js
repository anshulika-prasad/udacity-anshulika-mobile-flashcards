import React from 'react';
import {
  View,
  Text, StyleSheet, Platform, TouchableOpacity
} from 'react-native';
import { Card, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getDeckDetails,
  deleteDeck,
} from '../actions';
import Button from './Button';
import {lightPurple, primaryColor} from '../utils/colors';



class DeckDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };

  componentDidMount() {
    this.props.getDeckDetails(this.props.navigation.state.params.entryId);
  }

  componentDidUpdate() {
    this.props.getDeckDetails(this.props.navigation.state.params.entryId);
  }

  deleteItem() {
    const title = this.props.title;
    this.props.deleteDeck(title);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Card title={this.props.title} >
          <Text  style={{marginBottom: 10, textAlign: 'center'}}>
            {this.props.questions ? this.props.questions.length : 0} cards
          </Text>

          <View>
            <Button
              icon={{
                name: 'credit-card-plus',
                type: 'material-community',
                size: 32
              }}
              title="Add Card"
              backgroundColor='#96C051'
              containerViewStyle={styles.btnContainer}
              onPress={() => {
                  this.props.navigation.navigate(
                    'AddQuestion',
                    {
                      navTitle: this.props.title,
                      title: this.props.title
                    }
                  );}}
              />
          </View>

          <View style={[styles.container]}>
            <Text style={styles.text}>
            Start Quiz
            </Text>
            <TouchableOpacity>
              <Icon
                type="ionicon"
                size={50}
                name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'}
                color='#ffffff'
                containerStyle={styles.iconContainer}
                onPress={() => {
                  this.props.navigation.navigate(
                    'QuizMain',
                    {
                      navTitle: this.props.title,
                      questions: this.props.questions }
                  );
                }}
                raised
              />
            </TouchableOpacity>
          </View>
        </Card>
        <View>
          <Button
            title="Delete Deck"
            buttonStyle={[styles.buttonStyle, { marginTop: 50 }]}
            backgroundColor="red"
            onPress={() => this.deleteItem()}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  btnContainer: {
    marginTop: 15
  },
  text: {
    color: primaryColor,
    textAlign: 'center'
  },
  iconContainer: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor:'#9932CC'
  },
  container: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
};

const mapStateToProps = state => {

  const { title, questions } = state.deckDetail ? state.deckDetail : ('', []);

  return { title, questions };
};

export default connect(mapStateToProps, {
  deleteDeck, getDeckDetails })(DeckDetail);
